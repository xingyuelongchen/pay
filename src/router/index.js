import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '../api/Config'
import NProgress from 'nprogress';
import api from 'xingyuelongchen';
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
    path: '/', component: () => import('../views'),
    redirect: '/user/login',
    children: [
      {
        path: 'pay',
        component: () => import('../views'),
        meta: { isAuth: true, title: '统一支付收款平台' },
        redirect: '/pay/cashier',
        children: [
          { path: 'cashier', meta: { title: '确认订单' }, component: () => import('../views/pay/cashier') },
          { path: 'payment', meta: { title: '支付收款' }, component: () => import('../views/pay/payment') },
        ]
      },
      {
        path: 'user',
        component: () => import('../views'),
        meta: { title: '统一登录授权平台' },
        redirect: '/user/login',
        children: [
          { path: 'login', meta: { title: '账户登录' }, component: () => import('../views/user/login') },
        ]
      },
      {
        path: 'wechatmobile',
        component: () => import('../views/pay/wechatMobile'),
        meta: { title: '微信支付' },
      },
      {
        path: 'sign', component: () => import('@/views'), meta: { isAuth: true, },
        redirect: 'sign/select',
        children: [
          { path: 'select', component: () => import('@/views/sign/select'), meta: { title: '套餐选择' } },
          { path: 'sign', component: () => import('@/views/sign/sign'), meta: { title: '签署合同' } },
          { path: 'see', component: () => import('@/views/sign/see'), meta: { title: '查看合同' } },
        ]
      }
    ]
  },
  {
    path: '/*',
    meta: { isAuth: true, title: '404错误！' },
    component: () => import('../views/404')
  }
]
const router = new VueRouter({
  mode: config.router.mode,
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let userinfo = api.getStore('userinfo');

  if (userinfo && userinfo.id, to.matched.some(e => e.meta.isAuth) && (!userinfo || userinfo.dateTime < Date.now())) {
    next('/user/login');
    return;
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
