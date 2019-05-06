import React from 'react';
import { Avatar, Icon, Popconfirm } from 'antd';
import { connect } from 'dva';
import { getToken } from '../../utils/token';
class AppAvatar extends React.Component {
  componentWillMount() {
    if (getToken()) {
      if (!this.props.app.user.userName) {
        this.props.dispatch({
          type: 'app/getUserInfo',
        });
      }
    }
  }

  onConfirm = () => {
    this.props.dispatch({
      type:'app/logout'
    })
  }

  render() {
    const { user } = this.props.app;
    return (
      <div className="app-user">
        <Avatar icon="user" src={user.avatar} size={32} />
        <span className="name">{user.userName}</span>
        <span className="split">|</span>
        <Popconfirm
          title="确定要退出登录吗"
          onConfirm={this.onConfirm}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="logout" onClick="" />
        </Popconfirm>
      </div>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppAvatar);
