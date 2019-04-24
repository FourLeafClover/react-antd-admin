const _menuTree = [
  {
    menuName: '菜单1',
    path: '/menu1',
    hidden: false,
    meta: {
      title: '菜单1',
      icon: 'icon-cloud-server',
    },
    children: [
      {
        menuName: '页面1-1',
        path: '/menu1/page1',
        hidden: false,
        icon: 'icon-cloud-server',
      },
    ],
  },
  {
    menuName: '菜单2',
    path: '/menu2',
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
    ],
  },
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

export const menuTree = _menuArray
export const menuArray = _menuArray
