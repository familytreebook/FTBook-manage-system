import RndNum from "./ranNum";
var querystring = require('querystring')
var loginUtil ={
  login:function (vue) {
     window.location.href = vue.$config.apiGateWayUrl+vue.$config.loginUrl;
  },
 
  checkLogin:function(vue){
    var tokenInfo = vue.$token.loadToken();
    if (!tokenInfo || !tokenInfo.tokenValue ||tokenInfo.tokenValue==="null" ){
      //没有token时，尝试获取
      
      // this.getToken(vue,function(){
        
      // });
      
      return false;
    }

    return true;
  },
  getToken:function(vue,callback,callbackErr){

    vue.$ajax.get(vue.$config.webbaseUrl + vue.$config.getTokenUri,{
      params:{
      }      
    })
      .then(function(response){
        console.log(response);
        vue.$token.savetoken(response.data);
        callback(response.data);
      })
      .catch(function(response){
        console.error(response);
        if(callbackErr){
          vue.$token.deleteToken();
          callbackErr(response);
        }
      });
  },

  getUserInfo:function(vue){
    return vue.$ajax.get(vue.$config.baseUrl + vue.$config.getUserInfoUri,{
      params:{
      }      
    });
  },

  logout:function (vue,return_url) {
    var returnUrl = "";
    if(return_url){
      returnUrl = "?return_url="+return_url;
    }
    vue.$router.push('/login'+returnUrl)
  }
} 

export default loginUtil;
