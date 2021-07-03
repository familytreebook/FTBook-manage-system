//需要转换的枚举
/**
 * 
 * @return {string}
 */
var formatters = {
  userStatusData:{
      1:"未激活",
      2:"启用",
      3:"禁用",
      4:"过期",
      5:"被锁定",
      6:"已删除"
  },
  userStatus:function(code){
      return this.userStatusData[code] ? this.userStatusData[code] : "--";
  },
  sexData:{
    1:"男",
    0:"女",
    3:"未知"
},
sex:function(code){
    return this.sexData[code] ? this.sexData[code] : "--";
}
}



export default formatters;
