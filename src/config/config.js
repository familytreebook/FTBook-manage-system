var config={
  baseOAuthUrl:"https://github.com/",
  //请求授权地址
  userAuthorizationUri:"https://github.com/login/oauth/authorize",
  //accessToken请求地址
  accessTokenUri : "/github/login/oauth/access_token",
  //用户信息请求地址
  userInfoUri:"https://api.github.com/user",
  //登出请求地址
  logoutUri:"https://github.com/logout",
  //项目地址
  localuri :"http://localhost:8080/",
  //要和github上配置的地址一样才行
  redirect_uri : "http://localhost:8080/ssologin",
  //案例资源服务器地址
  resUri:"http://localhost:8080",
  //客户端相关标识，请从认证服务器申请
  clientId: "47d81577db725509c665",
  client_secret:"a77fbaa07143db00a0f50438d05b1dd74b9449bf",
  //申请的权限范围
  scope:"read:user",
  //可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state:"w",
  //一些固定的请求参数
  response_type:"token",
  grant_type : "authorization_code",
  code:"",
}

export default config;
