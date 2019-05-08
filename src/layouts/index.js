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
      <Layout style={{ height: '100vh' }}>
        <AppSider collapsed={this.state.collapsed} />
        <Layout>
          <Header className="app-header" style={{ background: '#fff',zIndex:1, padding: 0,boxShadow:'0 1px 4px rgba(0, 21, 41, 0.08)' }}>
            <Icon
              className="app-slider-open"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => this.onCollapse(!this.state.collapsed)}
            />
            <AppBreadcrumb />
            <AppUser />
          </Header>
          <AppPageTabs />
          <Content
            style={{
              height: 'calc(100vh-120px)',
              overflow:'auto',
              padding:12
            }}
          >
            <KeepAliveProvider>
              <div style={{ padding: 24, background: '#fff' }}>{this.props.children}</div>
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
