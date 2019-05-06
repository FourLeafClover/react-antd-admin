import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Icon, Button } from 'antd';
import styles from './index.less'

class Login extends Component {
  componentWillMount() {}

  login = () => {
    this.props.dispatch({
      type: 'app/login',
      params: {
        userName: 'admin',
        password: '123456',
      },
    });
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <div>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value="admin"
            disabled
          />
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value="123456"
            type="password"
            className={styles.password}
            disabled
          />
        </div>
        <Button type="primary" className={styles.loginBtn} onClick={this.login}>登录</Button>
      </div>
    );
  }
}

export default connect(({ app }) => ({ app }))(Login);
