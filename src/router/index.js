import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages
// will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';
import whitePage from '../views/phaser/index';

/**
* fake router
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {

    },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: {

    },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: {
      keepAlive: false // 不需要缓存
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    name: 'Example',
    meta: {
      title: '用户中心',
      icon: 'example'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: {
          title: '表格',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '树结构',
          icon: 'tree',
          roles: ['even']
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    name: '个人中心',
    meta: {
      title: '个人中心',
      icon: 'example'
    },
    children: [
      {
        path: 'setAvatar',
        name: '设置头像',
        component: () => import('@/views/setAvatar/index'),
        meta: {
          title: '上传头像视频',
          icon: 'tree',
          roles: ['even']
        }
      },
      {
        path: 'cropper',
        name: '修剪',
        component: () => import('@/views/cropper/index'),
        meta: {
          title: '修剪',
          icon: 'tree',
          roles: ['even']
        }
      },
      {
        path: 'compress',
        name: '压缩图片',
        component: () => import('@/views/compress/index'),
        meta: {
          title: '压缩图片',
          icon: 'tree',
          roles: ['even']
        }
      },
      {
        path: 'fileReader',
        name: '读取视频',
        component: () => import('@/views/fileReader/index'),
        meta: {
          title: '读取视频',
          icon: 'tree',
          roles: ['even']
        }
      }
    ]
  },
  {
    path: '/white',
    name: 'White01',
    component: whitePage,
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: 'task',
        name: 'Task',
        //component:() => import('@/views/phaser/taskinfo'),
        meta: {
          title: 'phaser.js',
          icon: 'tree',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/setAvatar',
    name: '设置头像',
    component: () => import('@/views/setAvatar/index'),
    meta: {
      title: '设置头像',
      icon: 'tree',
      roles: ['even']
    }
  },
  {
    path: '*',
    redirect: '/404',
  }
];
