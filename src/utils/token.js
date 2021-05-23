var token={
  savetoken :function (token) {
    if(!token||!token.tokenValue){
        return;
    }
    debugger;
    sessionStorage.setItem("tokenValue",token.tokenValue);
    sessionStorage.setItem("tokenType",token.tokenType);
    sessionStorage.setItem("expires_in",token.expires_in);
    sessionStorage.setItem("refresh_token",token.refresh_token);
    sessionStorage.setItem("scope",token.scope);
  },
  deleteToken:function () {
    sessionStorage.setItem("tokenValue",null);
    sessionStorage.setItem("tokenType",null);
    sessionStorage.setItem("enabled",null);
    sessionStorage.setItem("expires_in",null);
    sessionStorage.setItem("refresh_token",null);
  },
  loadToken :function () {
    let tokenInfo = {};
    tokenInfo.tokenValue=sessionStorage.getItem("tokenValue");
    tokenInfo.tokenType=sessionStorage.getItem("tokenType");
    tokenInfo.enabled=sessionStorage.getItem("enabled");
    tokenInfo.expires_in=sessionStorage.getItem("expires_in");
    tokenInfo.refresh_token=sessionStorage.getItem("refresh_token");

    return tokenInfo;
  },
  getTokenFromService:function (vue,code,callback,error) {
    debugger;
    vue.$ajax.get(vue.$config.getTokenUri,{
      params:{
        client_id:vue.$config.clientId, 
        code:code,
        redirect_uri:vue.$config.redirect_uri,
        grant_type:vue.$config.grant_type,
        scope:vue.$config.scope
      }      
    })
      .then(callback)
      .catch(error);
  }
}

export default token;
