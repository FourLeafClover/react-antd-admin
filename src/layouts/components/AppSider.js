import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { menuTree } from '../../config/menu';
import logo from '@/assets/logo.svg'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
class AppSider extends React.Component {
  getSubMenuList(menu) {
    if (menu.children && menu.children.length>0) {
      return (
        <SubMenu key={menu.path} title={<span><Icon type={menu.icon} /><span>{menu.menuName}</span></span>}>
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

  render () {
    const selectedKeys = []
    if (this.props.app.activePageTab) {
      selectedKeys.push(this.props.app.activePageTab.path)
    }
    return (
      <Sider collapsed={this.props.collapsed} trigger={null} collapsible width={250}>
        <div className="app-logo" >
          <img src={logo} alt="antd" />
          <span className="app-logo-text">Antd Admin</span>
        </div>
        <Menu
          selectedKeys={selectedKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}>
          {menuTree.map(menu => this.getSubMenuList(menu))}
        </Menu>
      </Sider>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppSider);
