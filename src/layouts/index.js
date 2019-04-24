import React from 'react';
import { Layout } from 'antd';
import { Provider as KeepAliveProvider } from 'react-keep-alive';
import AppSider from './components/AppSider';
import AppPageTabs from './components/AppPageTabs';

const { Header, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
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
    )
  }
}

export default AppLayout;
