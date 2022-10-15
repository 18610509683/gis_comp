
import LTBaseObject from './KBaseObject'
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import Common from './Common'
/**
 * @description LTMap.StaticImageLayer StaticImage图层类
*/
class StaticImageLayer extends LTBaseObject{
	/**
	 * @description 构造函数
	 * @param {String} url StaticImage图层服务地址
	 * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof StaticImageLayer
	 */
	constructor(url,options,mapInstance = null){
    super(mapInstance)
		const vm = this
		vm.initStaticImageLayer(url,options)
  	}
	
	/**
	 * @description 切片加载StaticImage图层
	 * @param {*} url
	 * @param {*} layerName
	 * @memberof StaticImageLayer
	 */
	initStaticImageLayer(url,options){
		var minZoom = Common.BaseLayerZoom[0];
		var maxZoom = Common.BaseLayerZoom[1];
		if(options && options.minZoom != undefined){
			minZoom = options.minZoom
		}
		if(options && options.maxZoom != undefined){
			maxZoom = options.maxZoom
		}
		const vm = this
		const extent = [0, 0, 2000, 2000];
		const projection = new Projection({
			code: 'xkcd-image',
			units: 'pixels',
			extent: extent,
		});
		vm.source = new Static({
			attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
			url: url,
			projection: projection,
			imageExtent: extent,
		});
		vm.layer = new ImageLayer({
			source: vm.source,
			maxZoom:maxZoom,
			minZoom:minZoom,
			opacity:0.5
		}),
		vm.map.addLayer(vm.layer)
	}

	/**
		* @description 添加StaticImage图层到地图
		* @memberof StaticImageLayer
		*/
	add(){
		const vm = this
		if(!vm.state) {
			vm.map.addLayer(vm.layer)
			vm.state = true
		}
	}

	/**
	 * @description 从当前地图中移除StaticImage图层
	 * @memberof StaticImageLayer
	 */
	remove() {
		const vm = this
		if(vm.state) {
			vm.map.removeLayer(vm.layer)
			vm.state = false
		}
	}

	/**
	 * @description 显示StaticImage图层数据
	 * @memberof StaticImageLayer
	 */
	show(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(true)
		}
	}

	/**
	 * @description 隐藏StaticImage图层数据
	 * @memberof StaticImageLayer
	 */
	hide(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(false)
		}
	}

	/**
	 * @description 缩放到过滤后的地图要素对应范围
	 * @memberof StaticImageLayer
	 */
	zoomTo() {
    	const vm = this
	}

}
export default StaticImageLayer