import React, { Component } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import CacheRouter from '../../components/common/CacheRouter';

class Page1 extends Component {
  render() {
    return (
      <CacheRouter>
        <div>
          <Input />
        </div>
      </CacheRouter>
    )
  }
}

export default connect(({ app }) => ({ app }))(Page1);
