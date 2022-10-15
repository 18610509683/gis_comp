import Tile from 'ol/layer/Tile'
import KBaseObject from './KBaseObject'
import TileImage from 'ol/source/TileImage'
import { addProjection,addCoordinateTransforms,Projection } from 'ol/proj'
import TileGrid from 'ol/tilegrid/TileGrid'
import * as BD09 from '../config/bd09'
import proj4 from 'proj4'
import {register} from 'ol/proj/proj4'
/**
 * @description KMap.CustomLayer 自定义离线切片图层类
 */
class BaiDuLayer extends KBaseObject{
  /**
   * @description 离线切片图层类
   * @param {string} layerUrl 切片url地址
  */
  constructor(layerUrl,mapInstance = null){
    super(mapInstance)
    const vm = this
    let layer = new Tile()
    let source = BaiDuLayer.initSource(layerUrl)
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
  static initSource(layerUrl){
    proj4.defs("EPSG:4008", "+proj=longlat +ellps=clrk66 +no_defs");
    proj4.defs("BD-MC", "+proj=merc +lon_0=0 +units=m +ellps=clrk66 +no_defs");
    register(proj4);
    // var projBD09 = new Projection({
    //   code: 'BD:09',
    //   extent: [-20037726.37, -11708041.66, 20037726.37, 12474104.17],
    //   // extent: [12976127.999999990686774, 3538943.993183717597276, 13238271.999999990686774, 3932160.014580482617021],
    //   units: 'm',
    //   axisOrientation: 'neu',
    //   global: false
    // })
    // addProjection(projBD09)
    // addCoordinateTransforms("EPSG:4326", "BD:09",
      
    //   function (coordinate) {
    //       console.log(coordinate)
    //       return BD09.lngLatToMercator(coordinate)
    //   },
    //   function (coordinate) {
    //       console.log(coordinate)
    //       return BD09.mercatorToLngLat(coordinate)
    //   }
    // )
    let resolutions1 = 
    [156543.032000000,
    78271.516000000,
    39135.758000000,
    19567.879000000,
    9783.939500000,
    4891.969750000,
    2445.984875000,
    1222.992437500,
    611.496218750,
    305.748109375,
    152.874054688,
    76.437027344,
    38.218513672,
    19.109256836,
    9.554628418,
    4.777314209,
    2.388657104,
    1.194328552,
    0.597164276,
    0.298582138,
    0.149291069,
    0.074645535];
    /*定义百度地图分辨率与瓦片网格*/
    var resolutions = []
    for (var i = 0; i <= 18; i++) {
        resolutions[i] = Math.pow(2, 18 - i)
        console.log(1/resolutions[i])
    }
    var tilegrid = new TileGrid({
        origin: [0, 0],
        resolutions: resolutions
    })

    /*加载百度地图离线瓦片不能用ol.source.XYZ，ol.source.XYZ针对谷歌地图（注意：是谷歌地图）而设计，
    而百度地图与谷歌地图使用了不同的投影、分辨率和瓦片网格。因此这里使用ol.source.TileImage来自行指定
    投影、分辨率、瓦片网格。*/
    var source = new TileImage({
        projection: "BD-MC",//"BD:09",
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            // openlayer5的版本
            // var z = tileCoord[0]
            // var x = tileCoord[1]
            // var y = tileCoord[2]
            // return "http://192.168.1.13:8080/mapImg/2/V1/"+z+"/"+x+"/"+y+".png"
            // return 'tiles/' + z + '/' + x + '/' + y + '.png'
            // return "http://maponline0.bdimg.com/tile/?qt=vtile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&scaler=1&udt=20210506&from=jsapi3_0"
            // openlayers6的版本
            // let z = tileCoord[0]
            // let x = tileCoord[1]
            // let y = -tileCoord[2]-1
            // if(x<0)  x = "M"+(-x)
            // if(y<0) y = "M"+(-y)

            let z = tileCoord[0]
            let x = tileCoord[1]
            let y = tileCoord[2]
            if(x<0)  x = (-x)
            if(y<0)  y = (-y)-1

            let url = layerUrl.replace('{z}',z).replace('{x}',x).replace('{y}',y);
            return url;
           // return "http://maponline0.bdimg.com/tile/?qt=vtile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&scaler=1&udt=20210506&from=jsapi3_0"
        }//,tileLoadFunction
    })
    return source
  }
}

export default BaiDuLayer