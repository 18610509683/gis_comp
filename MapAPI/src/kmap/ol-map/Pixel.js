/**
 * @description KMap.Pixel 像素类
*/
class Pixel{
  /**
   * @description 像素类构造函数
   * @param {number} x X像素，必填
   * @param {number} y Y像素，必填
   */
  constructor(x,y){
    let mapPixel = [Number(x),Number(y)];
    this.pixel = mapPixel;
  }

  /**
   * @description 获得X方向像素坐标
   * @returns {number} 返回X方向像素坐标
   */
  getX() { 
    return this.pixel[0]; 
  }

  /**
   * @description 获得Y方向像素坐标
   * @returns {number} 返回Y方向像素坐标
   */
  getY() { 
    return this.pixel[1]; 
  }

  /**
   * @description 当前像素坐标与传入像素坐标是否相等，必填
   * @returns {boolean} 相等返回true，不相等返回false
   */
  equals(point) {
      if(point.getX() == this.pixel[0] && point.getY() == this.pixel[1])
      {
        return true;
      }
      else
      {
        return false;
      }
  }

  /**
   * @description 以字符串形式返回像素坐标对象
   * @returns {String} 像素坐标字符串，用逗号连接
   */
  toString() { 
    return this.pixel[0] + "," + this.pixel[1] ; 
  }
}

export default Pixel