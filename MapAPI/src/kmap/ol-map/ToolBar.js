import Zoom from 'ol/control/Zoom'
import ZoomSlider from 'ol/control/ZoomSlider'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.ToolBar 地图操作工具条类
 */
class ToolBar extends KBaseObject{
  /**
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof ToolBar
   */
  constructor(mapInstance = null){
		super(mapInstance)
		const vm = this

    //创建缩放控件
    let zoom = new Zoom()
    //创建缩放滑块控件
    let zoomSlider = new ZoomSlider()
    let ToolBar = {"zoom":zoom,"zoomSlider":zoomSlider}
    this.toolBar = ToolBar
    this.map = map
  }

	/**
	 * @description 显示地图操作工具条
	 */
	show(){
		this.map.addControl(zoom)
		this.map.addControl(zoomSlider)
	}

	/**
	 * @description 隐藏操作工具条
	 */
	hide(){
		this.map.removeControl(zoom)
		this.map.removeControl(zoomSlider)
	}
}

export default ToolBar