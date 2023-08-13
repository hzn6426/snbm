export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './login',
          },
          // {
          //   path: '/user',
          //   redirect: '/user/login',
          // },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/new',
        routes: [
          {
            path: '/new',
            component: '../layouts/WindowLayout',
            routes: [
              {
                name: '编辑分类',
                path: '/new/clazz/:id',
                component: './clazz/save',
              },
              {
                name: '编辑供应商',
                path: '/new/provider/:id',
                component: './provider/save',
              },
              {
                name: '编辑商品',
                path: '/new/item/:id',
                component: './item/save',
              },
              {
                name: '编辑提单',
                path: '/new/order/:id',
                component: './order/save',
              },
            ]
          }
        ]
      },
      {
        path: '/',
        component: '../layouts/TabsLayout',
        routes: [
          {
            path: '/',
            name: '首页',
            redirect: '/dashboard/blog',
          },
          {
            path: '/dashboard',
            name: '工作台',
            icon: 'dashboard',
            routes: [
              {
                name: '更新日志',
                icon: 'smile',
                path: '/dashboard/blog',
                component: './dashboard/blog',
              },
            ],
          },
          // 系统管理
          {
            path: '/wms',
            icon: 'dashboard',
            name: '业务管理',
            routes: [
              {
                path: '/',
                redirect: '/wms/item',
              },
              {
                name: '供应商管理',
                icon: 'smile',
                path: '/wms/provider',
                component: './provider',
              },
              {
                name: '分类管理',
                icon: 'smile',
                path: '/wms/class',
                component: './clazz',
              },
              {
                name: '商品管理',
                icon: 'smile',
                path: '/wms/item',
                component: './item',
              },
              {
                name: '订单管理',
                icon: 'smile',
                path: '/wms/order',
                component: './order',
              },
            ],
          },
        ],
      },
    ],
  },
];
