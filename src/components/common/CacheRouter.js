import React from 'react';
import { KeepAlive } from 'react-keep-alive';
import { connect } from 'dva';
import { getFullPath } from '../../utils/location';
import { withRouter } from 'react-router';

class CacheRouter extends React.Component {
  render() {
    const {
      app: { pageTabs },
    } = this.props;
    let fullPath = getFullPath(this.props.history.location);
    const curTab = pageTabs.find(x => x.fullPath === fullPath);
    return (
      curTab && (
        <KeepAlive key={curTab.key}>
          {this.props.children}
        </KeepAlive>
      )
    )
  }
}

export default connect(({ app }) => ({ app }))(withRouter(CacheRouter));
