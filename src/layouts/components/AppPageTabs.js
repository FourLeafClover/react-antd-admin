import { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Icon } from 'antd';

const moveCount = 3
class AppPageTabs extends Component {

  leftTab = 0  // 左移动下标

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

  moveRight = () => {
    let pageTabWidth = this.refs.pageItems.parentElement.clientWidth // pageTab宽度
    let pageItemsWidth = this.refs.pageItems.clientWidth // pageItems的宽度
    let childItems = this.refs.pageItems.children // 子项目
    let transform = this.refs.pageItems.style.transform
    let transformX = transform ? Number(transform.replace(/[a-z]|[A-Z]\(|\)*/g, '')) : 0
    if (pageItemsWidth + transformX > pageTabWidth) {
      for (let index = this.leftTab;index < childItems.length && index < this.leftTab + moveCount;index++) {
        transformX -= childItems[index].clientWidth+5
      }
      /*if (willTranformX + pageItemsWidth <= pageTabWidth) {
        // 防止右边空白.
        willTranformX = pageTabWidth-pageItemsWidth
      }*/
      this.refs.pageItems.style.transform = `translateX(${transformX}px)`
      this.leftTab += moveCount
    }
  }

  moveLeft = () => {
    let childItems = this.refs.pageItems.children
    let transform = this.refs.pageItems.style.transform
    let transformX = transform ? Number(transform.replace(/[a-z]|[A-Z]|\(|\)*/g, '')) : 0
    if (transformX<0) {
      for (let index = this.leftTab-1;index >=0 && index >= this.leftTab - moveCount;index--) {
        transformX += childItems[index].clientWidth+5
      }
      /*if (willTranformX > 0) {
        willTranformX = 0
      }*/
      this.refs.pageItems.style.transform = `translateX(${transformX}px)`
      this.leftTab -= moveCount
    }
  }


  closeTab = (item, e) => {
    e.stopPropagation();
    this.props.dispatch({
      type: 'app/removePageTabs',
      page: item,
    });
  };

  closeAllTabs = () => {
    this.props.dispatch({
      type: 'app/removeAllPageTabs',
    });
  };

  render() {
    const {
      app: { pageTabs },
    } = this.props;

    return (
      <div className="page-tabs-wrpper">
        <span className="page-tabs-btn__left">
          <Icon type="left" onClick={this.moveLeft} />
        </span>
        <div className="page-tabs">
          <div className="items" ref="pageItems">
            {pageTabs.map(item => (
              <div className="item"
                key={item.key}
                onClick={this.tabClick.bind(this, item)}
              >
                <span className={this.isActive(item)}>
                  {this.getPageName(item, pageTabs)}
                  {!item.fixed && (
                    <Icon
                      type="close"
                      className="page-close"
                      onClick={event => this.closeTab(item, event)}
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="page-tabs-btn__right">
          <Icon type="right" onClick={this.moveRight} />
        </span>
        <span className="page-tabs-btn__close">
          <Icon type="close" onClick={this.closeAllTabs} />
        </span>
      </div>
    );
  }
}

export default connect(({ app }) => ({ app }))(AppPageTabs);
