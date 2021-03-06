import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import config from './config/config.js'
import token from './utils/token'
import login from './utils/loginUtil'
import querystring from 'querystring'
import store from './store/index'

import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

window.store = store
//Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
Vue.prototype.$config = config;
Vue.prototype.$token = token;
Vue.prototype.$login = login;
Vue.prototype.$querystring = querystring;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    config => {
        config.headers["X-Requested-With"]="XMLHttpRequest";
        //config.headers["Accept"]="application/json";

        // 判断是否存在token，如果存在的话，则每个http header都加上token
      let tokenInfo = token.loadToken()

      if (!config.headers.hasOwnProperty('Authorization') && tokenInfo && tokenInfo.tokenValue) {
        config.headers.Authorization = /*tokenInfo.tokenType+*/"Bearer "+tokenInfo.tokenValue;
        console.log(config.headers);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = sessionStorage.getItem('user_role');
    const accessToken = sessionStorage.getItem('tokenValue');
    if (!accessToken && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
