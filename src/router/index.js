import Vue from 'vue'
import VueRouter from 'vue-router'
let isUA = "web";
let userAgent = navigator.userAgent.toLowerCase();
if (/micromessenger/.test(userAgent)) isUA = "wechat";
else if (/alipayclient/.test(userAgent)) isUA = "alipay";
else if (/iphone/.test(userAgent)) isUA = "h5";
else if (/android/.test(userAgent)) isUA = "h5";
Vue.prototype.isUA = isUA;
Vue.use(VueRouter)

const routes = [
  {
    path: '/pay',
    component: () => import('../views'),
    meta: { isAuth: true },
    children: [
      { path: 'cashier', title: '确认订单', component: () => import('../views/pay/cashier') },
      { path: 'payment', title: '支付收款', component: () => import('../views/pay/payment') },
    ]
  },
  {
    path: '/user',
    component: () => import('../views'),
    children: [
      { path: 'login', title: '确认订单', component: () => import('../views/user/login') },
      { path: 'register', title: '支付收款', component: () => import('../views/user/register') },
    ]
  },
  {
    path: '/m', name: 'm', component: () => import('../views'),
    children: [
      {
        path: 'pay',
        component: () => import('../views'),
        meta: { isAuth: true },
        children: [
          { path: 'cashier', title: '确认订单', component: () => import('../views/m/pay/cashier') },
          { path: 'payment', title: '支付收款', component: () => import('../views/m/pay/payment') },
        ]
      },
      {
        path: 'user',
        component: () => import('../views'),
        children: [
          { path: 'login', title: '确认订单', component: () => import('../views/m/user/login') },
          { path: 'register', title: '支付收款', component: () => import('../views/m/user/register') },
        ]
      },
    ]
  },
  {
    path: '/*',
    component: () => import('../views/404')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let path = false;
  let userinfo = window.localStorage.getItem(userinfo) || false;
  if (userinfo) userinfo = JSON.parse(userinfo);
  if (isUA == 'web') {
    if (to.matched.some(e => e.meta.isAuth) && !userinfo) {
      next('/user/login');
      return;
    }
    if (to.path.indexOf('/m/') >= 0) {
      path = to.path.replace('/m/', '/')
    }
  } else {
    if (to.matched.some(e => e.meta.isAuth) && !userinfo) {
      next('/m/user/login');
      return;
    }
    if (to.path.indexOf('/m/') == -1) {
      path = '/m' + to.path
    }
  }
  if (path) next(path)
  else next()
})
export default router
