//= ==============================================//
//                 SYSTEM CONST                  //
//= ==============================================//
export default Object.freeze({
  // 登录路径
  ROUTE_LOGIN: '/user/login',
  //授权码登录
  ROUTE_LOGIN_TEMP: '/user/loginTemp',
  // 用户按钮KEY-sessionStorage
  KEY_USER_BUTTON_PERMS: '_USER_BUTTON_PERMS',
  // 用户token存储KEY-sessionStorage
  KEY_USER_TOKEN: '_USER_TOKEN',
  //系统标识
  KEY_USER_SYSTEM_TAG: '_USER_SYSTEM_TAG',
  //用户数据缓存
  KEY_USER: '_USER',
  //分类缓存
  KEY_CLASS: '_CLASS',
  //商品缓存
  KEY_ITEM: '_ITEM',
  //供应商缓存
  KEY_PROVIDER: '_PROVIDER',
  //头像名称
  SYSTEM_AVATAR_NAME: 'SNM',
  // 登录路径
  SYSTEM_ROUTE_LOGIN: '/user/login',
  // 系统标题
  SYSTEM_TITLE: '业务管理系统',
  SYSTEM_LOGIN_TITLE: 'Snapper业务演示系统',
  SYSTEM_LOGIN_DESC: '做专业的权限管理 — 演示环境3.0.7',
  // basicLayout 刷新
  SUBJECT_SYSTEM_REFRESH: '_subject_system_refresh',
  // 缓存超时时间
  TIME_OUT_FOR_CACHE: 30,
  // localstorage key前缀
  PREFIX_OF_CACHE: '_snbm_',
  //tags
  TAG_USER_SALLER: 'SALLER',
  TAG_USER_KEEPER: 'KEEPER',
  TAG_USER_SERVICE: 'SERVICE',
  // 登录
  API_LOGIN: '/authority/oauth/token',
  API_GROUP: '/authority/group',
  // 登出
  API_LOGOUT: '/authority/oauth/logout',
  //用户
  API_USER: '/authority/user',
  //根据账号获取用户
  API_USER_GET_BY_CODE: '/authority/user/getByCode',
  // 当前登录用户信息
  API_USER_CURRENT: '/authority/user/currentUser',
  // 用户权限菜单
  API_USER_MENUS: '/authority/user/listMenus',
  // 用户权限按钮
  API_USER_BUTTONS: '/authority/user/listButtons',
  // 用户更新自己的个人信息
  API_USER_UPDATE_SELF: '/authority/user/updateSelfUser',
  // 用户组织列表
  API_USER_DEPARTMENTS: '/authority/group/userDepartments',
  // 用户切换组织
  API_USER_CHANGE_DEPARTMENT: '/authority/group/change',
  // 用户模糊补全
  API_USER_LIST_BY_KEYWORD: '/authority/user/listByTagAndKeyWord',
  //验证用户并获取组织
  API_USER_VALIDATE_FOR_USER_DEPARTMENTS: '/authority/user/validateUserForDepartments',
   // 邮件验证
   API_USER_EMAIL_VALIDATE: '/authority/user/validateEmail',
  //获取所有TAG对应的组织列表和用户
  API_USER_TREE_ALL_GROUPS_AND_USERS_BY_TAG: '/authority/group/treeAllGroupsAndUsersByTag',
  //= ==============================================//
  //                   供应商管理                     //
  //= ==============================================//
  //查询
  API_PROVIDER_SEARCH: '/business/provider/search',
  //增/删/改/查
  API_PROVIDER: '/business/provider',
  //关键字查询
  API_PROVIDER_LIST_BY_KEY_WORD: '/business/provider/listByKeyWord',
  //= ==============================================//
  //                   分类管理                      //
  //= ==============================================//
  //查询
  API_CLASS_SEARCH: '/business/class/search',
  //增/删/改/查
  API_CLASS: '/business/class',
  //关键字查询
  API_CLASS_LIST_BY_KEY_WORD: '/business/class/listByKeyWord',
  //= ==============================================//
  //                   商品管理                      //
  //= ==============================================//
  API_ITEM_SEARCH: '/business/item/search',
  API_ITEM: '/business/item',
  //关键字查询
  API_ITEM_LIST_BY_KEY_WORD: '/business/item/listByKeyWord',
  //= ==============================================//
  //                   订单管理                      //
  //= ==============================================//
  API_ORDER_SEARCH: '/business/order/search',
  API_ORDER: '/business/order',
});
