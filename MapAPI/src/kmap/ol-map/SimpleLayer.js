import Tile from 'ol/layer/WebGLTile'
import XYZ from 'ol/source/XYZ'
import * as Enum from './Enum'
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
    let layer = new Tile()
    let source = undefined
    if(Enum.LayerTypeEnum.ARCGISTile == tileType){
      source = this.arcGISTile(simpleMapUrl)
      layer.setSource(source)
    }else if(Enum.LayerTypeEnum.GaoDeTile == tileType){
      source = this.gaoDeTile(simpleMapUrl)
      layer.setSource(source)
    }else if(Enum.LayerTypeEnum.OnLineTile == tileType){
      source = this.onlineTile(simpleMapUrl)
      layer.setSource(source)
    }
    this.source = source
	  this.layer = layer
  }

  /**
   * @description ArcGIS离线切片方法
   * @param {String} mapUrl 离线切片地址
   * @memberof SimpleLayer
  */
  arcGISTile(mapUrl){
    let source = new XYZ({
      crossOrigin: "anonymous",
      tileUrlFunction: function(coordinate){
        let z = coordinate[0]
        z = "L" + (Array(2).join('0') + z).slice(-2)
        let x = Math.abs(coordinate[2])
        let y = Math.abs(coordinate[1])
        x = "00000000" + x.toString(16)
        y = "00000000" + y.toString(16)
        x = "R" + x.substring(x.length - 8, x.length)
        y = "C" + y.substring(y.length - 8, y.length)
        return mapUrl + z + "/" + x + "/" + y + ".png"
      }
    })
    return source
  }

  /**
   * @description  高德离线切片方法
   * @param {String} mapUrl 离线切片地址
   * @return { ol.source} source ol.source
   * @memberof SimpleLayer
  */
  gaoDeTile(mapUrl) {
    let source = new XYZ({
      crossOrigin: "anonymous",
      tileUrlFunction: function(coordinate){
          let z = coordinate[0]
          let x = Math.abs(coordinate[2])
          let y = Math.abs(coordinate[1])
          x = "000000" + x
          y = "000000" + y
          x = "R" + x.substring(x.length - 6, x.length)
          y = "C" + y.substring(y.length - 6, y.length)
          return mapUrl + z + "/" + x + "/" + y + ".png"
      }
    })
    return source
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
}

export default SimpleLayer