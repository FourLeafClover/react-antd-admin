import React from 'react';
import { Layout, Icon } from 'antd';
import { Provider as KeepAliveProvider } from 'react-keep-alive';
import AppSider from './components/AppSider';
import AppPageTabs from './components/AppPageTabs';
import AppUser from './components/AppUser';
import { whiteList } from '../config';
import { connect } from 'dva';
import AppBreadcrumb from './components/AppBreadcrumb';

const { Header, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return !whiteList.includes(this.props.location.pathname) ? (
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider collapsed={this.state.collapsed} />
        <Layout>
          <Header className="app-header" style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="app-slider-open"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => this.onCollapse(!this.state.collapsed)}
            />
            <AppBreadcrumb />
            <AppUser />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <AppPageTabs />
            <KeepAliveProvider>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
              </div>
            </KeepAliveProvider>
          </Content>
        </Layout>
      </Layout>
    ) : (
      <>{this.props.children}</>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppLayout);
