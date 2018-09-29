import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // 加载进度条
import 'nprogress/nprogress.css';// 加载进度条样式
import { getSessionId, getLocalStorage } from '@/utils/auth'; // 获取sessionId

NProgress.configure({ showSpinner: false }); // 进度条初始化

const whiteList = ['/login'];// 无需登录就可以访问的页面白名单
//const whiteList = ['/login', '/dashboard', '/example', '/form'];
router.beforeEach((to, from, next) => {
  NProgress.start(); // 进度条开始拉动
  //console.log(getLocalStorage('token'));
  if (getLocalStorage('token')) { // 检查是否有sessionId
    /* 有 sessionId*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // 如果当前页面是dashboard将不会触发afterEach事件  所以手动处理。
    } else {
      //next();
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        debugger
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          console.log(res.data.roles);
          const roles = res.data.roles; // note: roles参数必须是一个数组。如: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            setTimeout(function() {
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }, 20);
          });
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证已失效，请重新登录！');
            next({ path: '/' });
          });
        });
        debugger
      } else {
        // let roles = ['admin'];
        // store.dispatch('GenerateRoutes', { roles }).then(() => {
        //   router.addRoutes(store.getters.addRouters);
        //   setTimeout(() => {
        //     next({ ...to, replace: true });
        //   }, 20);
        // });
        next();
      }
    }
  } else {
    /* 没有 sessionId*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // 如果当前页面是dashboard将不会触发afterEach事件  所以手动处理。
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 完成进度条
});
