/** 
 * @module LT2DMapConfig
 * @descrition 配置信息
 */
const LT2DMapConfig = {
  //自定义底图地址
  "SimpleMapDataUrl":"http://127.0.0.1:8090/mapresource/",
  //高德底图地址
  "MapDataUrl":"https://172.17.2.34:8445/AMapData/",
  //交通底图地址
  "TrafficMapDataUrl":"http://172.17.2.34:8083/",
  //在线底图地址
  "OnlineMapDataUrl":"http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
  "ShowLevel":[3,18],
  //是否使用交通
  "UseSimpleMap":false,
  //是否使用
  "UseTrafficMap":false,
  //是否使用
  "UseOnlineMap":false,
  "UseOnlineMap":false,
  //是否显示工具条
  "ShowToolbarControl":true,
  "MarkerLayerName":"defaultMarkerLayer",
  "LabelLayerName":"defaultLabelLayer",
  "PolylineLayerName":"defaultPolylineLayer",
  "PolygonLayerName":"defaultPolygonLayer",
  "MarkerLayerZIndex":101,
  "LabelLayerZIndex":101,
  "PolylineLayerZIndex":100,
  "PolygonLayerZIndex":99
}
export default LT2DMapConfig