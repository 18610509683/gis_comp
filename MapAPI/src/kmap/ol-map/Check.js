import * as Info from './Info'
class Check{
  static lngLat(lng,lat){
    let msg = ''
    let result = false
    if(lat == null || lng == null || lat == undefined || lng == undefined){
      msg = Check.addHeader("经纬度不能为null")
      return Check.message(msg,result)
    }
    if(Check.isNumber(lat) || Check.isNumber(lng)){
      msg = Check.addHeader("经纬度应为数字")
      return Check.message(msg,result)
    }
    if(lat<-90 || lat>90){
      msg = Check.addHeader("纬度lat应该大于-90小于90")
      return Check.message(msg,result)
    }
    if(lng<-180 || lng>180){
      msg = Check.addHeader("经度lng应该大于-180小于180")
      return  Check.message(msg,result)
    }
    if(msg == ''){
      result = true
    }
    return Check.message(msg,result)
  }

  static isNumber(str){
    
    if(str == null || undefined){
      return false
    }
    
    if((typeof str=='string')&&str.constructor==String){
      return false
    }
    
    if(!isNaN(str)){
      return false
    }
    return true
  }
  static notEmpty(name,str){
    let result = false;
    if(str == null || undefined){
      result =  false
    }
    
    if((typeof str=='string') && str.constructor==String && str !=''){
      result =  true
    }else{
      result =  false
    }
    return Check.message(Check.addHeader(name+"必须为字符串且不能为空"),result);
  }
  static addHeader(str){
    return Info.version+":"+str
  }
  static message(msg,isPass){
    return {msg:msg,isPass:isPass}
  }
}
export default Check