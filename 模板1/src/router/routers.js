import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '',
      notCache: true,
      icon: 'md-home'
    },
    component: () => import('@/view/home-page')
  }]
},
// {
//   path: '/goods',
//   name: 'goods',
//   meta: {
//     icon: 'md-cart',
//     title: '商品'
//   },
//   component: Main,
//   children: [{
//     path: 'goods_class',
//     name: 'goods_class',
//     meta: {
//       icon: 'ios-keypad',
//       title: '商品分类'
//     },
//     component: () => import('@/view/manage/manage_class.vue')
//   }, {
//     path: 'manage_goods',
//     name: 'manage_goods',
//     meta: {
//       icon: 'md-list-box',
//       title: '商品管理'
//     },
//     component: () => import('@/view/manage/manage_goods.vue')
//   }]
// },
{
  path: '/banner',
  name: 'banner',
  component: Main,
  children: [{
    path: 'manage_banner',
    name: 'manage_banner',
    meta: {
      icon: 'ios-images',
      title: 'Banner管理'
    },
    component: () => import('@/view/manage/manage_banner.vue')
  }]
},
{
  path: '/message',
  name: 'message',
  component: Main,
  children: [{
    path: 'manage_message',
    name: 'manage_message',
    meta: {
      icon: 'ios-pricetag',
      title: '国家语言管理'
    },
    component: () => import('@/view/manage/manage_message.vue')
  }]
},
// {
//   path: '/user',
//   name: 'user',
//   component: Main,
//   children: [{
//     path: 'manage_user',
//     name: 'manage_user',
//     meta: {
//       icon: 'ios-people',
//       title: '用户管理'
//     },
//     component: () => import('@/view/manage/manage_user.vue')
//   }]
// },
{
  path: '/admin',
  name: 'admin',
  component: Main,
  children: [{
    path: 'manage_admin',
    name: 'manage_admin',
    meta: {
      icon: 'ios-person',
      title: '管理员管理'
    },
    component: () => import('@/view/manage/manage_admin.vue')
  }]
},
{
  path: '/argu',
  name: 'argu',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'params/:id',
    name: 'params',
    meta: {
      icon: 'md-flower',
      title: route => `{{ params }}-${route.params.id}`,
      notCache: true,
      beforeCloseName: 'before_close_normal'
    },
    component: () => import('@/view/argu-page/params.vue')
  },
  {
    path: 'query',
    name: 'query',
    meta: {
      icon: 'md-flower',
      title: route => `{{ query }}-${route.query.id}`,
      notCache: true
    },
    component: () => import('@/view/argu-page/query.vue')
  }
  ]
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
}
]
