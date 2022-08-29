import Common from './Common'
import * as proj from 'ol/proj'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.InfoWindow 弹窗类
 */
class InfoWindow extends KBaseObject{
	/**
	 * Creates an instance of InfoWindow.
	 * @param {*} param
	 * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof InfoWindow
	 */
	constructor(param,mapInstance = null){
    let {content,position,offsetX,offsetY,type} = param
		super(mapInstance)
		const vm = this
		if(!offsetX){
			offsetX = 0
		}
		if(!offsetY){
			offsetY = 0
		}
    this.initInfoWindow(content,position,offsetX,offsetY,type)
  }

  initInfoWindow(content,position,offsetX,offsetY,type){
    const vm = this
    if(type == "click") {
      vm.infoWindow = vm.mapInstance.infoWindow_click
      vm.infoWindowBox = document.getElementById("infowindow-click")
    }
    else if(type == "mousemove") {
      vm.infoWindow = vm.mapInstance.infoWindow_move
      vm.infoWindowBox = document.getElementById("infowindow-move")
      vm.infoWindowBox.style.zIndex = 1
    }
    vm.infoWindowBox.style.position = "absolute"
    //获取弹窗
    vm.InfoWindow = vm.infoWindowBox
    vm.content = content.outerHTML
    vm.position = position
    vm.offsetX = offsetX
    vm.offsetY = offsetY
  }

  /**
	 * 在地图指定位置打开弹窗
	 * @param clearState 打开新弹窗是否关闭其他弹窗(默认true)，选填
	*/
	open(clearState) {
    const vm = this
		var clearState = (clearState!=undefined)? clearState : true
		if(clearState) {
			vm.mapInstance.infoWindow_click.setPosition(undefined)
			vm.mapInstance.infoWindow_move.setPosition(undefined)
		} //清空地图弹窗

		if(vm.content == undefined || vm.content == ""){return}
		vm.infoWindowBox.innerHTML = vm.content
    let vmPosition = proj.fromLonLat(Common.KMapLngLat2MapLngLat(vm.position))

		vm.infoWindow.setPosition(vmPosition)
		var left = -(vm.infoWindowBox.offsetWidth)/2 + vm.offsetX
		var top = -(vm.infoWindowBox.offsetHeight) + vm.offsetY
		vm.infoWindowBox.style.left = left + "px"
		vm.infoWindowBox.style.top = top + "px"

		//设置全局弹窗范围
		var pixel = vm.mapInstance.lngLatToContainer(vm.position)
		vm.mapInstance.infoWindowPixel = new Array()
		vm.mapInstance.infoWindowPixel[0] = pixel.getX() + left
		vm.mapInstance.infoWindowPixel[1] = pixel.getY() + top
		vm.mapInstance.infoWindowPixel[2] = pixel.getX() + left + vm.infoWindowBox.offsetWidth
		vm.mapInstance.infoWindowPixel[3] = pixel.getY() + top + vm.infoWindowBox.offsetHeight
		
    //弹窗超出屏幕位置矫正
		var mapCenter = vm.mapInstance.getCenter()
    
    //地图中心
		mapCenter = vm.mapInstance.lngLatToContainer(mapCenter)
    
    //将利通地图像素转换成OL地图像素
		mapCenter = Common.KMapPixel2MapPixel(mapCenter)
		
    //弹窗坐标初始坐标
    var pixel = vm.mapInstance.lngLatToContainer(vm.position)
		
    //将利通地图像素转换成OL地图像素
    pixel = Common.KMapPixel2MapPixel(pixel)
		var left = -(vm.infoWindowBox.offsetWidth)/2 + vm.offsetX
		var top = -(vm.infoWindowBox.offsetHeight) + vm.offsetY
    
    //弹窗左上角坐标
		let infoWindow_left = [pixel[0]+left, pixel[1]+top]
    
    //弹窗右上角坐标
		let infoWindow_right = [infoWindow_left[0]+vm.infoWindowBox.offsetWidth, pixel[1]+top]
		if(infoWindow_left[1] < 0) {
			mapCenter[1] -= -(infoWindow_left[1])
			vm.mapInstance.infoWindowPixel[1] -= infoWindow_left[1]
			vm.mapInstance.infoWindowPixel[3] -= infoWindow_left[1]
		}

		if(infoWindow_left[0] < 0) {
			mapCenter[0] -= -(infoWindow_left[0]);
			vm.mapInstance.infoWindowPixel[0] -= infoWindow_left[0]
			vm.mapInstance.infoWindowPixel[2] -= infoWindow_left[0]
		}
    
    //容器宽度
		var containerWidth = vm.mapInstance.getTarget().offsetWidth
		if(infoWindow_left[0] > 0 && infoWindow_right[0] > containerWidth) {
			mapCenter[0] += (infoWindow_right[0]-containerWidth)
		}
    
    //将OL地图像素转换成利通地图像素
		mapCenter = Common.MapPixel2KMapPixel(mapCenter)
		mapCenter = vm.mapInstance.containerToLngLat(mapCenter)
		vm.mapInstance.panTo(mapCenter)
	}

	/**
	 *关闭弹窗
	*/
	close() {
    const vm = this
		vm.infoWindow.setPosition(undefined)
		vm.mapInstance.infoWindowPixel = null
	}

	/**
	 *获取弹窗是否打开--暂无该方法
	*/
	getIsOpen() {}

	/**
	 * 获取弹窗内容
	 * @returns 弹窗内容
	*/
	getContent() {
    const vm = this
		let content = vm.infoWindowBox.innerHTML
		return content
	}

	/**
	 * 设置弹窗内容--暂无该方法
	*/
	setContent(content) {
    const vm = this
		vm.infoWindowBox.innerHTML = content.outerHTML
	}

	/**
	 * 获取弹窗坐标
	 * @returns KMap.LngLat格式的弹窗坐标
	*/
	getPosition() {
    const vm = this
		let position = vm.infoWindow.getPosition()
		position = proj.toLonLat(position)
		return Common.MapLngLat2KMapLngLat(position)
	}

	/**
	* 设置弹窗坐标--暂无该方法
	*/
	setPosition(position) {
    const vm = this
		vm.infoWindow.setPosition(proj.fromLonLat(Common.KMapLngLat2MapLngLat(position)))
	}

	/**
	* 获取弹窗大小
	* @returns 弹窗大小数组,[width,height]
	*/
	getSize() {
    const vm = this
		let size = {}
		size.width = (vm.infoWindowBox.style.width)? vm.infoWindowBox.style.width : "auto"
		size.height = (vm.infoWindowBox.style.height)? vm.infoWindowBox.style.height : "auto"
		return size
	}

	/**
	* 设置弹窗大小--暂无该方法
	*/
	setSize(width,height) {}
}
export default InfoWindow