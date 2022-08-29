import ScaleLine from 'ol/control/ScaleLine'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.Scale 比例尺类
 */
class Scale extends KBaseObject{
  /**
   * @memberof Scale
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   */
  constructor(mapInstance = null){
    super(mapInstance)
    const vm = this
    //获取比例尺插件
    vm.scale = new ScaleLine()
  }
	
  /**
  * @description 显示比例尺
  * @memberof Scale
  */
  show() {
    const vm = this
		vm.mapInstance.addControl(vm.scale)
	}

	/**
	 * @description 隐藏比例尺
	*/
	hide() {
    const vm = this
		vm.mapInstance.removeControl(vm.scale)
	}
}

export default Scale