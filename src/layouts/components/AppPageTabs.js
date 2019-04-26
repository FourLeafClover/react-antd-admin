import { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Icon } from 'antd';

class AppPageTabs extends Component {
  tabClick = item => {
    const {
      app: { activePageTab },
    } = this.props;
    if (item.key !== activePageTab.key) {
      router.push(item.fullPath);
    }
  };

  isActive = ({ key }) => {
    const {
      app: { activePageTab },
    } = this.props;
    if (activePageTab) {
      return key === activePageTab.key ? ' active' : '';
    } else {
      return '';
    }
  };

  getPageName = (item, pageTabs) => {
    let tabs = pageTabs.filter(x => x.menuName === item.menuName);
    if (tabs.length > 1) {
      let index = tabs.findIndex(x => x === item);
      if (index === 0) {
        return item.menuName;
      } else {
        return `${item.menuName}_${index}`;
      }
    } else {
      return item.menuName;
    }
  };

  closeTab = (item, e) => {
    e.stopPropagation();
    this.props.dispatch({
      type: 'app/removePageTabs',
      page: item,
    });
  };

  render() {
    const {
      app: { pageTabs },
    } = this.props;

    return (
      <div className="page-tabs-wrpper">
        <span className="page-tabs-btn__left">
          <Icon type="left" />
        </span>
        <ul className="page-tabs">
          {pageTabs.map(item => (
            <li className="page-tabs__item" key={item.key} onClick={this.tabClick.bind(this, item)}>
              <span className={this.isActive(item)}>
                {this.getPageName(item, pageTabs)}
                {
                  (!item.fixed) && <Icon
                    type="close"
                    className="page-close"
                    onClick={event => this.closeTab(item, event)}
                  />
                }
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
