const _menuTree = [
  {
    menuName: '订单管理',
    hidden: false,
    icon: 'icon-cloud-server',
    children: [
      {
        menuName: '订单列表',
        path: '/order/orderlist',
        hidden: false,
        icon: 'icon-cloud-server',
      },
      {
        menuName: '订单详情',
        path: '/order/orderdetail',
        hidden: true
      }
    ],
  },
  {
    menuName: '菜单2',
    hidden: false,
    meta: {
      title: '菜单2',
      icon: 'icon-cloud-server',
    },
    children: [
      {
        menuName: '页面2-1',
        path: '/menu2/page1',
        hidden: false,
        icon: 'icon-cloud-server',
      },
    ]
  }
];

const _menuArray = [];
const pushChildrenMenu = menu => {
  _menuArray.push(menu);
  if (menu.children) {
    menu.children.forEach(item => {
      pushChildrenMenu(item);
    });
  }
};


_menuTree.forEach(item => {
  pushChildrenMenu(item)
})

export const menuTree = _menuTree
export const menuArray = _menuArray
