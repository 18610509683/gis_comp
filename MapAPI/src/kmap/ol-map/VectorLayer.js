import Layer from 'ol/layer/Vector'
import Source from 'ol/source/Vector'
import Common from './Common'
/**
 * @description KMap.VectorLayer 矢量图层
 */
class VectorLayer {
  /**
   * @param {string} name 图层名称
   * @param {string} zIndex 图层层级
  */
  constructor(name,zIndex,options){
    let source = new Source({
      zIndex:zIndex
    })
    let ShowLevel = Common.ShowLevel
    let minZoom = ShowLevel[0]
    let maxZoom = ShowLevel[1]
    if(options && options.minZoom){
      minZoom = options.minZoom
    }
    if(options && options.maxZoom){
      maxZoom = options.maxZoom
    }
    let layer = new Layer({
      source:source,
      name:name,
      minZoom:minZoom,
      maxZoom:maxZoom
    })
    this.layer = layer
    this.source = source
    return layer
  }
  setMaxZoom(maxZoom){
    this.layer.setMaxZoom(maxZoom);
  }
  setMinZoom(){
    this.layer.setMinZoom(minZoom);
  }
}

export default VectorLayer