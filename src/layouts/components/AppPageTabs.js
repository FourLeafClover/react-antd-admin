import { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Icon } from 'antd';

class AppPageTabs extends Component {
  tabClick = (item) => {
    const { app:{ activePageTab } } = this.props;
    if (item.key !== activePageTab.key) {
      router.push(item.path);
    }
  };

  isActive = ({ key }) => {
    const { app: { activePageTab } } = this.props
    if (activePageTab) {
      return key === activePageTab.key ? ' active' : '';
    } else {
      return ''
    }
  };

  render () {
    const {
      app: { pageTabs },
    } = this.props

    return (
      <div className="page-tabs-wrpper">
        <span className="page-tabs-btn__left">
          <Icon type="left" />
        </span>
        <ul className="page-tabs">
          {pageTabs.map(item => (
            <li className="page-tabs__item" key={item.key} onClick={this.tabClick.bind(this, item)}>
              <span className={this.isActive(item)}>
                {item.menuName}
                <Icon type="close" />
              </span>
            </li>
          ))}
        </ul>
        <span className="page-tabs-btn__right">
          <Icon type="right" />
        </span>
        <span className="page-tabs-btn__close">
          <Icon type="close" />
        </span>
      </div>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppPageTabs);
