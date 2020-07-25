var config={
  baseOAuthUrl:"http://localhost:8104/auth/",
  //请求授权地址
  userAuthorizationUri:"http://localhost:8104/auth/oauth/authorize",
  //accessToken请求地址
  accessTokenUri : "/platform/user/getToken",

  getTokenUri:"http://localhost:8199/platform/user/getToken",
  //用户信息请求地址
  userInfoUri:"http://localhost:8104/auth/user/current",
  //登出请求地址
  logoutUri:"https://github.com/logout",
  //项目地址
  localuri :"http://localhost:8080/",
  //要和github上配置的地址一样才行
  redirect_uri : "http://localhost:8080/ssologin",
  //案例资源服务器地址
  resUri:"http://localhost:8080",
  //客户端相关标识，请从认证服务器申请
  clientId: "ftbook",
  client_secret:"123456",
  //申请的权限范围
  scope:"all",
  //可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state:"w",
  //一些固定的请求参数
  response_type:"code",
  grant_type : "authorization_code",
  code:"",
}

export default config;
