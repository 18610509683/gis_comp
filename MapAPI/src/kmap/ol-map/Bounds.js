import * as extent  from "ol/extent"
/**
 * @description KMap.Bounds 经纬度矩形范围类
 */
class Bounds{
  /**
   * @param {KMap.LngLat} southWest 矩形范围西南角坐标，必填，格式new KMap.LngLat()
   * @param {KMap.LngLat} northEast 矩形范围东北角坐标，必填，格式new KMap.LngLat()
   */
  constructor(southWest,northEast){
		const vm = this
		vm.southWest = southWest
		vm.northEast = northEast
    let mapSouthWest = [southWest.getLng(),southWest.getLat()]
    let mapNorthEast = [northEast.getLng(),northEast.getLat()]
    let bounds = new extent.boundingExtent([mapSouthWest,mapNorthEast])
    this.bounds = bounds
  }

	/**
	 * @description 判断指定点坐标是否在矩形范围内
	 * @param {KMap.LngLat} point 经纬度点，KMap.LngLat格式，必填
	 * @returns {boolean}在矩形范围内返回true，否则返回false
	 */
  contains(point) {
		const vm = this
		if( (point.getLng() >= vm.southWest.getLng() && point.getLng() <= vm.northEast.getLng())
			&& (point.getLat() >= vm.southWest.getLat() && point.getLat() <= vm.northEast.getLat()) )
		{
			return true
		}else{
			return false
		}
  }

  /**
   * @description 获取中心点坐标
   * @returns {KMap.LngLat}中心点坐标，KMap.LngLat格式
   */
	getCenter() {
		const vm = this
		let lng = (vm.southWest.getLng() + vm.northEast.getLng()) / 2
		let lat = (vm.southWest.getLat() + vm.northEast.getLat()) / 2
		var center = new KMap.LngLat(lng,lat)
		return center
	}

	/**
	 * @description 获取西南角坐标
	 * @returns {KMap.LngLat}西南角坐标，KMap.LngLat格式
	 */
	getSouthWest() {
		const vm = this
		return vm.southWest
	}

	/**
	 * @description 获取东北角坐标
	 * @returns {KMap.LngLat}东北角坐标，KMap.LngLat格式
	 */
	getNorthEast() {
		const vm = this
		return vm.northEast
	}

	/**
	 * @description 以字符串形式返回地物对象的矩形范围
	 * @returns {String}西南角经度、西南角纬度:东北角经度、东北角纬度
	 */
  toString() {
		const vm = this
        return vm.southWest.getLng() + "," + vm.southWest.getLat() + ":"
               + vm.northEast.getLng() + "," + vm.northEast.getLat()
  }
}

export default Bounds