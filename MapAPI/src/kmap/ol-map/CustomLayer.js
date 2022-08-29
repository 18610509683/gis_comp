import Tile from 'ol/layer/WebGLTile'
import XYZ from 'ol/source/XYZ'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.CustomLayer 自定义离线切片图层类
 */
class CustomLayer extends KBaseObject{
  /**
   * @description 离线切片图层类
   * @param {string} layerUrl 切片url地址
  */
  constructor(layerUrl,mapInstance = null){
    super(mapInstance)
    const vm = this
    let layer = new Tile()
    let source = new XYZ({
      url : layerUrl
    })
    layer.setSource(source)
    vm.layer = layer
    vm.map.addLayer(vm.layer)
  }
  hide(){
    const vm = this
    vm.layer.setVisible(false)
  }
  show(){
    const vm = this
    vm.layer.setVisible(true)
  }
  remove(){
    const vm = this
    vm.map.removeLayer(vm.layer)
  }
}

export default CustomLayer