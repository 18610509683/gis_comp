import Vector from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import OLDraw from 'ol/interaction/Draw'
import * as format from 'ol/format'
import DrawFeatureLayer from './DrawFeatureLayer'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.Draw 画图工具类
 */
class Draw extends KBaseObject{
  /**
   * @param {String} geoType 画图类型 Point,LineString,Polygon,Circle
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof Draw
   */
  constructor(geoType,mapInstance = null){
		super(mapInstance)
    const vm = this
    vm.featureCanDel = false
    vm.draw = null
    vm.initLayer()
    //添加画图组件
    vm.addInteraction(geoType)
    vm.clickEvent()
  }
  initLayer(){
    const vm = this
    //点，线，面，圆
    //GeoType Point,LineString,Polygon,Circle
    vm.source = new Vector({crossOrigin: "anonymous",wrapX:false})
    //ol.layer.Vector用于显示在客户端渲染的矢量数据。
    vm.layer = new VectorLayer({
      source:vm.source,
      name:"drawLayer"
    })
    vm.map.addLayer(vm.layer)
    //画图样式
    vm.drawFeatureLayer = new DrawFeatureLayer(vm.layer,vm.mapInstance)
  }

  /**
  *@description 添加交互组件
  *@memberof Draw
  */
  addInteraction(geoType) {
    const vm = this
    var value = geoType
    vm.geoType = geoType
    if(value !== 'None'){
      vm.draw = new OLDraw({
        source:vm.source,
        type: value
      });
      vm.map.addInteraction(vm.draw)
    }
    vm.draw.on('drawend',function(e){
      var oljson = new format.GeoJSON()
      var feature = e.feature
      // var json = oljson.writeFeaturesObject([feature])
      // var wkt = new format.WKT().writeFeature(feature,{
      //   featureProjection:"EPSG:3857",
      //   dataProjection:"EPSG:4326"
      // })
    })
  }

	/**
	 *转移至其他图层
	*/
	toOtherLayer(){
    const vm = this
		let features = vm.source.getFeatures()
		// let json = oljson.writeFeaturesObject(features)
		let wktList = []
		features.forEach(function(feature){
			let wkt = new format.WKT().writeFeature(feature,{
				featureProjection:"EPSG:3857",
				dataProjection:"EPSG:4326"
			})
			wktList.push(wkt)
		})
		vm.source.clear()
		return wktList
	}

  /**
  * @description 更改画图类型
  * @param {*} geoType
  * @memberof Draw
  */
  changeGeoType(geoType){
    const vm = this
		if(geoType == vm.geoType){
			vm.active()
		}
		if(vm.draw){
			vm.map.removeInteraction(vm.draw)
			vm.geoType = null
			vm.draw = null
			vm.addInteraction(geoType)
		}
  }

  /**
  * @description 失效
  * @memberof Draw
  */
  deactive(){
    const vm = this
		if(vm.draw){
			vm.draw.setActive(false)
		}
	}

	/**
   * @description 激活
   * @memberof Draw
  */
  active(){
    const vm = this
		if(vm.draw){
			vm.draw.setActive(true)
			vm.featureCanDel = false
		}
	}

	/**
   * @description 销毁
   * @memberof Draw
  */
  destory(){
    const vm = this
		if(vm.draw) {
			vm.map.removeInteraction(vm.draw)
			vm.geoType = null
			vm.draw = null
		}
		vm.clear()
	}

  /**
  * @description 清空图层
  * @memberof Draw
  */
  clear(){
    const vm = this
		vm.map.removeLayer(vm.layer)
		vm.source.clear()
	}

  /**
  * @description 设置删除是否可用
  * @param {*} isDel
  * @memberof Draw
  */
  enableDel(isDel){
    const vm = this
		if(isDel){
			vm.deactive()
		}
		vm.featureCanDel = isDel
		if(!isDel){
			vm.active()
		}
	}

  /**
   * @description 点击事件
   * @memberof Draw
  */
  clickEvent(){
    const vm = this
    vm.map.on('click',function(e){
      let feature = vm.map.forEachFeatureAtPixel(e.pixel,function(feature) { return feature },{
        layerFilter:function(e){
          if(e.values_.name == "drawLayer"){
            return true
          }else{
            return false
          }
        }
      })
      if(vm.featureCanDel && feature){
        vm.source.removeFeature(feature)
      }
    })
  }
}
export default Draw