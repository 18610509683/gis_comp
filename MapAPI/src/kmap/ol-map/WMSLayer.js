import Image from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import {GeoJSON,WFS} from 'ol/format'
import * as filter from 'ol/format/filter'
import * as extent from 'ol/extent'
import LTBaseObject from './LTBaseObject'
import Projection from 'ol/proj/Projection'
import TileWMS from 'ol/source/TileWMS'
import Tile from 'ol/layer/Tile'
/**
 * @description LTMap.WMSLayer WMS图层类
*/
class WMSLayer extends LTBaseObject{
	/**
	 * @description 构造函数
	 * @param {String} url wms图层服务地址
	 * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof WMSLayer
	 */
	constructor(url,layerName,mapInstance = null){
    super(mapInstance)
		const vm = this
		vm.format = "image/png"
		vm.initImageLayer(url,layerName)
		// vm.initTileLayer(url,layerName)
  }
	
	/**
		* @description 初始化ImageLayer
		* @memberof WMSLayer
		*/
	initImageLayer(url,layerName){
		const vm = this

		var projection = new Projection({
			code: 'EPSG:4326',
			units: 'degrees',
			axisOrientation: 'neu',
			global: true
		})
		
    vm.source = new ImageWMS({
      url: url,
			ratio: 1,
      params: {
				'FORMAT':vm.format,
        "LAYERS": layerName,
				"STYLES": '',
				'VERSION': '1.1.1',
				"exceptions": 'application/vnd.ogc.se_inimage'
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
			projection:projection
    })

		vm.layer = new Image({
			source:vm.source
		})

    vm.state = true

    //地图加载WMS图层
    vm.map.addLayer(vm.layer)
	}

	/**
	 * @description 切片加载wms图层
	 * @param {*} url
	 * @param {*} layerName
	 * @memberof WMSLayer
	 */
	initTileLayer(url,layerName){
		const vm = this

		var projection = new Projection({
			code: 'EPSG:4326',
			units: 'degrees',
			axisOrientation: 'neu',
			global: true
		})

		vm.source = new TileWMS({
			url: url,
			params: {
				'FORMAT': vm.format, 
				'VERSION': '1.1.1',
				tiled: true,
				"STYLES": '',
				"LAYERS": layerName,
				"exceptions": 'application/vnd.ogc.se_inimage',
				// tilesOrigin: -124.73142200000001 + "," + 24.955967
			},
			projection:projection
		})

		vm.layer = new Tile({
			source:vm.source
		})

		vm.map.addLayer(vm.layer)
	}

  /**
	* @description 添加WMS图层到地图
	* @memberof WMSLayer
	*/
  add(){
		const vm = this
		if(!vm.state) {
			vm.map.addLayer(vm.layer)
			vm.state = true
		}
	}

	/**
	 * @description 从当前地图中移除WMS图层
	 * @memberof WMSLayer
	 */
	remove() {
		const vm = this
		if(vm.state) {
			vm.map.removeLayer(vm.layer)
			vm.state = false
		}
	}

	/**
	 * @description 显示WMS图层数据
	 * @memberof WMSLayer
	 */
	show(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(true)
		}
	}

	/**
	 * @description 隐藏WMS图层数据
	 * @memberof WMSLayer
	 */
	hide(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(false)
		}
	}

	/**
	 * @description 更新WMS图层内容
	 * @param {String} data 属性过滤参数（例如：RoadNo=11），选填，不传值默认加载全部数据
	 * @memberof WMSLayer
	 */
	update(data) {
		const vm = this
		if(data!=null && data!="" && data!=undefined && state) {
			vm.source.updateParams({
				"CQL_FILTER": data
			})
		}
		else{
			vm.source.updateParams({
				"CQL_FILTER": null
			})
		}
	}

	/**
	 * @description 缩放到过滤后的地图要素对应范围
	 * @memberof WMSLayer
	 */
	zoomTo() {
    const vm = this
		//组装查询过滤条件
		let cqlfilter = vm.source.getParams().CQL_FILTER
		if(cqlfilter == null){
			//缩放到图层范围
		}
		else{
			let cqlfilters = cqlfilter.split("=")
			//实现思路为通过WFS进行属性查询，查找到要素后再缩放到该要素
			let wfsurl = url.substr(0, url.lastIndexOf("/") + 1 ) + "wfs"
			let featureRequest = new WFS().writeGetFeature({
        //srsName: 'EPSG:3857',
        //featureNS: 'http://openstreemap.org',
        //featurePrefix: 'skyline',
        featureTypes: [layer],
        outputFormat: 'application/json',
        filter: filter.equalTo(cqlfilters[0],cqlfilters[1])
			})
			let myfilter = WFS.writeFilter(filter.equalTo(cqlfilters[0],cqlfilters[1]))
			$.ajax({
				type: 'get',
				url: wfsurl,
				data: {
					service: 'WFS',
          request: 'GetFeature',
          typeNames: layer,//查询图层
          filter:new XMLSerializer().serializeToString(myfilter),//查询条件
          outputFormat: 'application/json'
				},
				async : false,
				success: function(res) {
					let features = new GeoJSON().readFeatures(res)
					  //let coordinateArray = new Array();
					  let extentBound = new extent.createEmpty()
						for(let i=0; i<features.length; i++) {
							/*let coordinates =  features[i].getGeometry().getCoordinates();//由多个分部构成，与Polyline函数生成的结构不一致
							for(j=0; j<coordinates.length; j++) {
								let pathcoordinates = coordinates[j];
								for(k = 0 ; k < pathcoordinates.length ; k ++)
								coordinateArray.push(pathcoordinates[k]);
							}*/
							extentBound = new extent.extend(extentBound,features[i].getGeometry().getExtent());
						}
						//let extentBound = new extent.boundingExtent(coordinateArray);
						if(features.length > 0){
							vm.map.getView().fit(extentBound,{
								duration: 1
							})
						}
				},
				error: function(e) {
					console.log("failed")
				}
			})
			/*fetch(wfsurl, {
				method: 'POST',
				body: new XMLSerializer().serializeToString(featureRequest)
			}).then(function(response) {
				return response.json();
			}).then(function(json) {
				let features = new GeoJSON().readFeatures(json);
				let extentBound = new extent.createEmpty();
				for(let i=0; i<features.length; i++) {
					extentBound = new extent.extend(extentBound,features[i].getGeometry().getExtent());
				}
				if(features.length > 0)
				{
					map.getView().fit(extentBound,{
						duration: 1
					});
				}
			});*/
		}
	}
	
	/**
	 *@description 根据经纬度坐标查询坐标点所在位置的要素
	 *@param coordinate LTMap.LngLat格式的经纬度 必填
	 *@returns 查询到要素的结果集合，json数组格式，json中包含对应要素的所有字段名和字段值
	*/
	getFeaturesByCoor(coordinate){
    const vm = this
		//将经纬度坐标转平面坐标
		coordinate = vm.mapInstance.lnglatToPixel(coordinate)
    //将LT平面坐标转换为OL的平面坐标
		coordinate = Common.LTMapPixel2MapPixel(coordinate)
		let resolution = vm.mapInstance.getResolution()
		let projection = vm.mapInstance.getProjection()
    let url = vm.source.getGetFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 10})
      let geojsonFormat = new GeoJSON({
    	defaultDataProjection: "EPSG:3857"
		})
    let result = []
		if(url) {
			$.ajax({
				type: 'get',
				url: url,
				async : false,
				success: function(res) {
          //获取所有的要素
					let features = geojsonFormat.readFeatures(res)
					let jsonDatas = []
					for(let i = 0 ; i < features.length ; i ++){
						let jsonData = {}
					    for(let key in features[i].getProperties()){
						    if (key == 'geometry'){
	                continue
	              }
	              jsonData[key] = features[i].get(key)
					    }
					    jsonDatas.push(jsonData)
					}
					result = jsonDatas
				},
				error:function(e) {
					console.log("faile")
				}
			})
		}
		return result
	}

	/**
	 *@description 设置鼠标悬停在元素上时的样式
	 *@param {String} cursorStyle 鼠标样式("default"默认指针,"pointer"小手,
   *"move"移动指针,"text"文本指针,
   *"wait"等待状态,"help"帮助)
   *必填，由于跨域问题，该方法存在问题
	*/
	setFeatureCursor(cursorStyle){
    const vm = this
		cursorStyle = (cursorStyle == undefined)?"default":cursorStyle
		let mapContainer = vm.map.getTargetElement()
		let defaultCursor = mapContainer.style.cursor
		vm.map.on("pointermove",function(e){
			//let features = map.forEachFeatureAtPixel(e.pixel,function(feature) { return feature; })
			if (e.dragging){
		    return
		  }
			let pixel = vm.map.getEventPixel(e.originalEvent)
	    let hit = vm.map.forEachLayerAtPixel(pixel,function(){
	      return true
	    })
			if(hit){
				mapContainer.style.cursor = cursorStyle
			}
			else{
				mapContainer.style.cursor = defaultCursor
			}
		})
	}
}
export default WMSLayer