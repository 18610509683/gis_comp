/**
 * @description LTMap.Size 大小类
 */
class Size{
  /**
   * @param {number} width 宽度
   * @param {number} height 高度
   * @constructor
   */
  constructor(width,height){
    let mapSize = [Number(width),Number(height)]
    this.size = mapSize
  }

  /**
  * @description 获得宽度
  * @returns {number} 宽度
  */
  getWidth() { 
    return this.size[0]
  };

  /**
  * @description 获取高度
  * @returns {number} 高度
  */
  getHeight() { 
    return this.size[1]
  }

  /**
  * @description 以字符串形式返回尺寸大小对象
  * @returns {number} 像素尺寸字符串，用逗号连接
  */
  toString() { 
    return this.size[0] + "," + this.size[1]
  }
}
export default Size