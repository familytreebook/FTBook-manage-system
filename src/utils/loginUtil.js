import RndNum from "./ranNum";
var querystring = require('querystring')
var loginUtil ={
  login:function (vue) {
    vue.$config.code = RndNum(4);
    var authorUrl = vue.$config.userAuthorizationUri;
    authorUrl = authorUrl + ('?' + vue.$querystring.stringify({
      client_id:vue.$config.clientId,
      response_type:vue.$config.response_type,
      scope:vue.$config.scope,
      //state:vue.$config.state,
      redirect_uri:vue.$config.redirect_uri, 
    }))
    window.location.href = authorUrl;
  },
  logout:function (vue,return_url) {
    var returnUrl = "";
    if(return_url){
      returnUrl = "?return_url="+return_url;
    }
    vue.$router.push('/login'+returnUrl)
  },
  checkLogin:function(vue){
    var tokenInfo = vue.$token.loadToken();
    if (tokenInfo.access_token===null ||tokenInfo.access_token==="null" ){
      return false;
    }
    return true;
  }
} 

export default loginUtil;
