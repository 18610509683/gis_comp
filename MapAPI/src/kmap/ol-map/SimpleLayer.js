import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as Enum from './Enum'
import BaiDuLayer from './BaiDuLayer'
import Common from './Common'
/**
 * @description KMap.SimpleLayer 离线切片图层类
 */
class SimpleLayer {
  /**
   * @description 离线切片图层类
   * @param {string} simpleMapUrl 切片url地址
   * @param {string} tileType 切片类型(高德,ArcGIS)
  */
  constructor(simpleMapUrl,tileType){
    let layer = new Tile({
      minZoom:Common.BaseLayerZoom[0],
      maxZoom:Common.BaseLayerZoom[1],
    })

    let source = undefined
    if(Enum.LayerTypeEnum.GaoDeTile == tileType){
      source = this.onlineTile(simpleMapUrl)
      layer.setSource(source)
    }else if(Enum.LayerTypeEnum.WGS84Tile == tileType){
      source = this.onlineTile(simpleMapUrl)
      layer.setSource(source)
    }else if(Enum.LayerTypeEnum.BaiDuTile == tileType){
      source = this.BaiDuTile(simpleMapUrl)
      layer.setSource(source)
    }
    this.source = source
    this.layer = layer
  }
  
  /**
   * @description 在线底图切片方法
   * @param {String}  mapUrl 离线切片地址
   * @return { ol.source} source ol.source 
   * @memberof SimpleLayer
  */
  onlineTile(onlineUrl){
    let source = new XYZ({
      url : onlineUrl
    })
    return source
  }

  /**
   * @description 百度底图切片
   * @param {String}  mapUrl 离线切片地址
   * @return { ol.source} source ol.source 
   * @memberof SimpleLayer
  */
  BaiDuTile(onlineUrl){
    let source = BaiDuLayer.initSource(onlineUrl)
    return source
  }
}

export default SimpleLayer