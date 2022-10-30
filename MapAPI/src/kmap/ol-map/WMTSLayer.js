import LTBaseObject from './KBaseObject'
import Projection from 'ol/proj/Projection'
import WMTSSource from 'ol/source/WMTS'
import Tile from 'ol/layer/Tile'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import Common from './Common'
/**
 * @description KMap.WMSLayer WMS图层类
*/
class WMTSLayer extends LTBaseObject{
	/**
	 * @description 构造函数
	 * @param {String} url wms图层服务地址
	 * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof WMSLayer
	 */
	constructor(url,options,mapInstance = null){
    super(mapInstance)
		const vm = this
		
		vm.format = "image/png"
		vm.initLayer(url,options,vm.format)
  }
	
	/**
		* @description 初始化ImageLayer
		* @memberof WMSLayer
		*/
	initLayer(baseUrl,options,format){
		
		var layerName = options.layerName;
		var minZoom = Common.BaseLayerZoom[0]
		var maxZoom = Common.BaseLayerZoom[1]
		
		if(options && options.minZoom != undefined){
			minZoom = options.minZoom
		}
		if(options && options.maxZoom != undefined){
			maxZoom = options.maxZoom
		}
		const vm = this
		var gridsetName = 'EPSG:900913';
		var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
		var style = '';
		
		var projection = new Projection({
			code: 'EPSG:900913',
			units: 'm',
			axisOrientation: 'neu'
		})
		var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
		let baseParams = ['VERSION','LAYER','STYLE','TILEMATRIX','TILEMATRIXSET','SERVICE','FORMAT'];
    let params = {
			'VERSION': '1.0.0',
			'LAYER': layerName,
			'STYLE': style,
			'TILEMATRIX': gridNames,
			'TILEMATRIXSET': gridsetName,
			'SERVICE': 'WMTS',
			'FORMAT': format
		};
    
		vm.source = vm.initSource(baseUrl,params,baseParams,projection,resolutions);
		vm.state = true
		vm.layer = new Tile({
			source:vm.source,
			maxZoom:maxZoom,
			minZoom:minZoom
		})
    //地图加载WMS图层
    vm.map.addLayer(vm.layer)
	}
	initSource(baseUrl,params,baseParams,projection,resolutions) {
		var url = baseUrl+'?'
		for (var param in params) {
			if (baseParams.indexOf(param.toUpperCase()) < 0) {
				url = url + param + '=' + params[param] + '&';
			}
		}
		url = url.slice(0, -1);
	
		var source = new WMTSSource({
			url: url,
			layer: params['LAYER'],
			matrixSet: params['TILEMATRIXSET'],
			format: params['FORMAT'],
			projection: projection,
			tileGrid: new WMTSTileGrid({
				tileSize: [256,256],
				extent: [-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7],
				origin: [-2.003750834E7, 2.003750834E7],
				resolutions: resolutions,
				matrixIds: params['TILEMATRIX']
			}),
			style: params['STYLE'],
			wrapX: true
		});
		return source;
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
}
export default WMTSLayer