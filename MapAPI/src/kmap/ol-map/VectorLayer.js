import Layer from 'ol/layer/Vector'
import Source from 'ol/source/Vector'
/**
 * @description KMap.VectorLayer 矢量图层
 */
class VectorLayer {
  /**
   * @param {string} name 图层名称
   * @param {string} zIndex 图层层级
  */
  constructor(name,zIndex){
    let source = new Source({
      zIndex:zIndex
    })
    let layer = new Layer({
      source:source,
      name:name
    })
    this.layer = layer
    this.source = source
    return layer
  }
}

export default VectorLayer