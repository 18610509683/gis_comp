import Common  from './Common'
import KBaseObject from './KBaseObject'
class Rotation extends KBaseObject{
    constructor(mapInstance = null){
        super(mapInstance)
        const vm = this
        debugger
        vm.init()
    }
    init(){
        const id = Common.createUUID()
        const vm = this
        var mapInstance = this.mapInstance //地图map对象
        var map = mapInstance.Map
        var dom = mapInstance.getTarget()
        var div = document.createElement('div')
        div.classList.add('brightmap2d-rotate-control-custom')
        div.innerHTML = '<button class="right2d-button-custom" id="rotate-right'+id+'"></button><button class="center2d-button-custom" id="rotate-center'+id+'"></button><button class="left2d-button-custom" id="rotate-left'+id+'"></button>'
        dom.append(div)
        this.rotate = 0
        var  that = this
        document.getElementById('rotate-right'+id).onclick = function(){
            that.rotate+=(90/180)*Math.PI
            map.getView().setRotation(that.rotate)
            vm.rotateCss(that.rotate)
        }
        document.getElementById('rotate-center'+id).onclick = function(){
            that.rotate = 0
            map.getView().setRotation(that.rotate)
            vm.rotateCss(that.rotate)
        }
        document.getElementById('rotate-left'+id).onclick = function(){
            that.rotate+=-(90/180)*Math.PI
            map.getView().setRotation(that.rotate)
            vm.rotateCss(that.rotate)
        }
    }

	rotateCss(){
		var css = "rotate("+that.rotate+"rad)"
		document.getElementById('rotate-center'+id).style.transform = css
	}
}
export default Rotation