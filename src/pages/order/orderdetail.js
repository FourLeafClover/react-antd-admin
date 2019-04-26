import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Timeline, Input } from 'antd';
import CacheRouter from '../../components/common/CacheRouter';
import { model, dispatch, getState } from '../../utils/dva';
import router from 'umi/router';
import orderdetail from '../../manualModels/order/orderdetail';

class OrderDetail extends Component {
  
  state = {
    inputText: '',
  };

  componentWillMount() {
    model(orderdetail);
  }

  onInputChange = e => {
    this.setState({
      inputText: e.target.value,
    });
  };

  gotoDetail = record => {
    router.push(`order/orderdetial?id=${record.id}`);
  };

  addComment() {
    dispatch({
      type: 'addComment',
      comment: {
        text: this.state.inputText,
        date: new Date().toLocaleString(),
      },
    });
  }

  render() {
    let { comments } = getState();
    return (
      <CacheRouter>
        <div>
          <Input type="text" ref="input" onChange={e => this.onInputChange(e)} />
          <Button onClick={this.addComment.bind(this)}>添加评论</Button>
        </div>
        <div>
          <Timeline>
            {comments.map((item, index) => (
              <Timeline.Item key={index}>
                {item.text}-{item.date}
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </CacheRouter>
    );
  }
}

export default connect(state => state)(OrderDetail);
