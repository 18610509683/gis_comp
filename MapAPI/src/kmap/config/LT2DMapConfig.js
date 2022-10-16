/** 
 * @module LT2DMapConfig
 * @descrition 配置信息
 */
const LT2DMapConfig = {
  //默认WGS84在线底图
  "WGS84OnlineUrl":"http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
  //默认百度在线
  "BaiDuOnlineUrl":"http://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20210506&from=jsapi3_0",
  //默认高德在线
  "GaoDeOnlineUrl":"http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
  "ShowLevel":[1,25],
  "BaseLayerZoom":[1,16],
  //是否使用WGS84在线底图
  "UseWGS84OnlineLayer":false,
  //是否使用百度在线
  "UseBaiDuOnlineLayer":false,
  //是否使用高德在线
  "UseGaoDeOnlineLayer":false,
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