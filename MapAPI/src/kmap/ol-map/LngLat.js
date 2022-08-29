import Common from "./Common"
/**
 * @description KMap.LngLat 经纬度
*/
class LngLat{
  /**
   * @param {number} lng 纬度
   * @param {number} lat 经度
   * @constructor
   */
  constructor(lng,lat){
    Common.checkLngLat(lng,lat)
    let maplnglat = [Number(lng),Number(lat)]
    this.lngLat = maplnglat
  }


	/**
	 * @description 当前经纬度坐标值经度移动w，纬度移动s，得到新的坐标。 经度向右移为正值，纬度向上移为正值，单位为°
	 * @param {number} w 经度移动量
	 * @param {number} s 纬度移动量
	 */
  offset(w, s) {
    let lng = this.lngLat[0]+w
    let lat = this.lngLat[1]+s
    return new LngLat(lng,lat)
  }

  /**
   * @description 当前经纬度和传入经纬度之间的地面距离，单位为米----暂无该方法
   * @param {number} lnglat 经纬度
   */
  distance(lnglat) {
    return null
  }

  /**
   * @description 获取经度
   * @returns {number} 返回经度
   */
	getLng() {
		let lng = this.lngLat[0]
		return lng
	}

	/**
	 * @description 获取纬度
	 * @returns {number} 返回纬度
	 */
	getLat() {
		let lat = this.lngLat[1]
		return lat
	}

	/**
	 * @description 判断当前坐标对象与传入坐标对象是否相等
	 * @param {KMap.LngLat} lnglat 格式的经纬度，必填
	 * @returns {boolean} 坐标相等返回true，坐标不相等返回false
	 */
  equals(lnglat) {
    if(lnglat.getLng() == this.lngLat[0] && lnglat.getLat() == this.lngLat[1]){
      return true
    }
    else{
      return false
    }
  }

  /**
   * @description LngLat对象以字符串的形式返回。
   * @returns {String} 返回经纬度格式的字符串，用逗号连接
   */
  toString() { 
    return this.lngLat[0] + "," + this.lngLat[1]
  }
}

export default LngLat