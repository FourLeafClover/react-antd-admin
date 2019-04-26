import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import CacheRouter from '../../components/common/CacheRouter';
import { model, getState } from '../../utils/dva';
import page1 from '../../manualModels/order/orderlist';
import router from 'umi/router';
class OrderList extends Component {
  componentWillMount() {
    model(page1);
  }

  columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Button onClick={() => this.gotoDetail(record)}>查看订单详情</Button>
      ),
    },
  ];

  gotoDetail = record => {
    router.push(`/order/orderdetail?id=${record.id}`)
  };

  render () {
    let { orderList } = getState();
    return (
      <CacheRouter>
        <div>
          <Table dataSource={orderList} columns={this.columns} />
        </div>
      </CacheRouter>
    );
  }
}

export default connect(state=>state)(OrderList);
