
import { createRouter,createWebHashHistory } from 'vue-router'

const Login = () => import('../views/login.vue')
const Layout = () => import('../views/layout.vue')
const Home = () => import('../views/home.vue')


const routes = [
  {
    path: '/',
    redirect: '/login',
    component: Layout
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/shuru',
    children: [
      {
        path: '/shuru',
        component: () => import('../views/components/shuru.vue')
      },
      {
        path: '/xiangnong',
        component: () => import('../views/components/xiangnong.vue')
      },
      {
        path: '/feinuo',
        component: () => import('../views/components/feinuo.vue')
      },
      {
        path: '/hafuman',
        component: () => import('../views/components/hafuman.vue')
      },
      {
        path: '/jisuan',
        component: () => import('../views/components/jisuan.vue')
      },
      {
        path: '/dianming',
        component: () => import('../views/components/dianming.vue')
      },
      {
        path: '/taolun',
        component: () => import('../views/components/taolun.vue')
      },
    ]
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

// // 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')
export default router