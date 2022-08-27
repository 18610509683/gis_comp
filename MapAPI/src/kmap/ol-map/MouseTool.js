import MousePosition from 'ol/control/MousePosition'
import * as coordinate from 'ol/coordinate'
import LTBaseObject from "./LTBaseObject"
/**
 * @description LTMap.MouseTool 鼠标工具类
*/
class MouseTool extends LTBaseObject{
  /**
   * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof MouseTool
   */
  constructor(mapInstance = null){
    super(mapInstance)
		const vm = this
    vm.mouseTool = new MousePosition({
      className:'ol-mouse-position-ltmap',
      projection: "EPSG:4326", //指定投影格式4326经纬度
      coordinateFormat: coordinate.createStringXY(4) //设置小数点后位数
      //target: '容器id'  //修改显示的容器
    })
    vm.mapInstance.addControl(vm.mouseTool)
  }

  /**
   * 显示鼠标工具
   */
  show() {
    const vm = this
    vm.mapInstance.addControl(vm.mouseTool)
  }

  /**
   * 隐藏鼠标工具
   */
  hide() {
    const vm = this
    vm.mapInstance.removeControl(vm.mouseTool)
  }

  /**
   * 删除鼠标工具
   */
   remove() {
    const vm = this
    vm.mapInstance.removeControl(vm.mouseTool)
  }
}
export default MouseTool