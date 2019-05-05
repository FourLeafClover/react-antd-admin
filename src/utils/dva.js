import cloneDeep from 'lodash/cloneDeep';
import { connect as dvaConnect } from 'dva';

// 获取当前页面namepsace
export const getNameSpace = () => {
  return window.g_app._store.getState().app.activePageTab.key;
};

// 挂在model
export const model = store => {
  const namespace = store.namespace ? store.namespace : getNameSpace();
  const cloneStore = cloneDeep(store);
  cloneStore.namespace = namespace;
  if (window.g_app._models.findIndex(x => x.namespace === namespace) < 0) {
    window.g_app.model(cloneStore);
  }
};

// 卸载Model
export const umModel = namespace => {
  const space = namespace ? namespace : getNameSpace();
  window.g_app.umModel(space);
};

// 获取整个state
export const getState = namespace => {
  const space = namespace ? namespace : getNameSpace();
  return window.g_app._store.getState()[space];
};

export const dispatch = actions => {
  window.g_app._store.dispatch({
    ...actions,
    ...{
      type: `${getNameSpace()}/${actions.type}`,
    },
  });
};

export const connect = (stateProps = []) => {
  return dvaConnect(state => {
    let namespace = getNameSpace();
    let mapState = {};
    stateProps.forEach(item => {
      mapState[item] = state[item];
    });
    if (namespace) {
      mapState[namespace] = state[namespace];
    }
    return mapState;
  })
};
