import './index.css'
import './css/index.less'
// 1、导入vue构造函数
import { createApp } from 'vue'

// 导入pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// 2、导入App根组件
import App from './App.vue'
// 导入路由
import router from './router/index'
// 导入vuex
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'
const bootstrap = require('bootstrap')

import './styles/icon.less'
import './styles/font_3628870_xa6o2irbzzl/iconfont.css'
const app = createApp(App)
app.use(jQuery)
app.use(pinia)
app.use(bootstrap)
app.use(router)
app.mount('#app')

