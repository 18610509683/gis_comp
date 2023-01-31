import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    },
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/info/info.vue'),
      meta: { title: '综合例子-基础信息', icon: 'table' }
    },
    {
      path: 'zonghe',
      name: 'zonghe',
      component: () => import('@/views/zonghe/zonghe.vue'),
      meta: { title: '综合例子-多数据源', icon: 'table' }
    },{
      path: 'draw',
      name: 'draw',
      component: () => import('@/views/draw/draw.vue'),
      meta: { title: '综合例子-画图', icon: 'table' }
    },{
      path: 'marker',
      name: 'marker',
      component: () => import('@/views/marker/marker.vue'),
      meta: { title: '综合例子-点交互', icon: 'table' }
    },
    {
      path: 'text',
      name: 'text',
      component: () => import('@/views/text/text.vue'),
      meta: { title: '综合例子-文本标记', icon: 'table' }
    }
    // ,{
    //   path: 'customLayer',
    //   name: 'customLayer',
    //   component: () => import('@/views/customLayer/customLayer.vue'),
    //   meta: { title: 'customLayer', icon: 'table' }
    // }
    ,{
      path: 'polyline',
      name: 'polyline',
      component: () => import('@/views/polyline/polyline.vue'),
      meta: { title: '综合例子-线交互', icon: 'table' }
    },{
      path: 'polygon',
      name: 'polygon',
      component: () => import('@/views/polygon/polygon.vue'),
      meta: { title: '综合例子-面交互', icon: 'table' }
    },
    {
      path: 'control',
      name: 'control',
      component: () => import('@/views/control/control.vue'),
      meta: { title: '地图控件', icon: 'table' }
    },
    {
      path: 'multiMap',
      name: 'multiMap',
      component: () => import('@/views/multiMap/multiMap.vue'),
      meta: { title: '多地图', icon: 'table' }
    },
    {
      path: 'jsonLayer',
      name: 'jsonLayer',
      component: () => import('@/views/jsonLayer/jsonLayer.vue'),
      meta: { title: 'GeoJson', icon: 'table' }
    },
    {
      path: 'staticImage',
      name: 'staticImage',
      component: () => import('@/views/staticImage/staticImage.vue'),
      meta: { title: '静态图片', icon: 'table' }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
