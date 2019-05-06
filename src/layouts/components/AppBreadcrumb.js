import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';

class AppBreadcrumb extends Component {
  getBreadList = (breads, pageNode) => {
    if (pageNode.menuName === '首页') {
      return;
    }
    if (pageNode) {
      breads.unshift(pageNode);
    }
    if (pageNode.parentNode) {
      this.getBreadList(breads, pageNode.parentNode);
    }
  };

  getBreadItem = breads => {
    return breads.map((menu, index) => {
      if (menu.path) {
        return <Breadcrumb.Item key={index}>{menu.menuName}</Breadcrumb.Item>;
      } else {
        return <Breadcrumb.item key={index}>{menu.menuName}</Breadcrumb.item>;
      }
    });
  };

  render() {
    let breads = [];
    if (this.props.app.activePageTab) {
      this.getBreadList(breads, this.props.app.activePageTab);
    }
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        {breads.map(item => {
          if (!item.fullPath) {
            return <Breadcrumb.Item>{item.menuName}</Breadcrumb.Item>;
          } else {
            return (
              <Breadcrumb.Item>
                <Link to={item.fullPath}>{item.menuName}</Link>
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppBreadcrumb);
