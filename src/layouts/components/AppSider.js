import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { menuTree } from '../../config/menu';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
class AppSider extends React.Component {
  getSubMenuList(menu) {
    if (menu.children && menu.children.length>0) {
      return (
        <SubMenu key={menu.menuName} title={<span>{menu.menuName}</span>}>
          {menu.children.map(subMenu => this.getSubMenuList(subMenu))}
        </SubMenu>
      );
    } else {
      return (
        (!menu.hidden) && (<Menu.Item key={menu.path}>
          {menu.path ? <Link to={menu.path}>{menu.menuName}</Link> : <span>{menu.menuName}</span>}
        </Menu.Item>)
      );
    }
  }

  render() {
    return (
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {menuTree.map(menu => this.getSubMenuList(menu))}
        </Menu>
      </Sider>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppSider);
