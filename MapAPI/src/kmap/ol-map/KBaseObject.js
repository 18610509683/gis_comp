import Map from  './Map'
class KBaseObject{
  constructor(mapInstance){
    const vm = this
		//利通map实例
		vm.mapInstance = mapInstance || Map.Instance
		//获取ol map对象
		vm.map = vm.mapInstance.map
  }
}
export default KBaseObject