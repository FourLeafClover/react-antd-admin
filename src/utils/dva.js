
// 获取当前页面namepsace
export const getNameSpace = () => {
  return window.g_app._store.getState().app.activePageTab.key;
};

// 挂在model
export const model = store => {
  const namespace = store.namespace
    ? store.namespace
    : window.g_app._store.getState().app.activePageTab.key;
  window.g_app.model({
    ...store,
    ...{
      namespace,
    },
  });
};

// 卸载Model
export const umModel = namespace => {
  const space = namespace ? namespace : window.g_app._store.getState().app.activePageTab.key;
  window.g_app.umModel(space);
};

// 获取整个state
export const getState = namespace => {
  const space = namespace ? namespace : window.g_app._store.getState().app.activePageTab.key;
  return window.g_app._store.getState()[space];
};
