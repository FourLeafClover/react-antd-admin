const _menuTree = [
  {
    menuName: '订单管理',
    hidden: false,
    icon: 'appstore',
    children: [
      {
        menuName: '订单列表',
        path: '/order/orderlist',
        hidden: false
      },
      {
        menuName: '订单详情',
        path: '/order/orderdetail',
        hidden: true,
      },
    ],
  },
  {
    menuName: '菜单2',
    hidden: false,
    icon: 'appstore',
    children: [
      {
        menuName: '页面2-1',
        path: '/menu2/page1',
        hidden: false
      },
    ],
  },
];

const _menuArray = [];
const pushChildrenMenu = (menu, parentNode) => {
  if (parentNode) {
    menu.parentNode = parentNode
  }
  _menuArray.push(menu);
  if (menu.children) {
    menu.children.forEach(item => {
      pushChildrenMenu(item,menu);
    });
  }
};

_menuTree.forEach(item => {
  pushChildrenMenu(item, null);
});

export const menuTree = _menuTree;
export const menuArray = _menuArray;
