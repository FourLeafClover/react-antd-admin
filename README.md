# react-antd-admin

基于UMI + Antd开启多Tab页功能

<img src="https://github.com/FourLeafClover/react-antd-admin/raw/master/src/assets/images/readme1.png" />

完成进度

1. 支持开启多tab页
2. 支持页面缓存
3. utils/dva.js 提供dva注册和卸载,之所以提供dva.js，主要是为了隔离作用域，统一路由开启多tab页，不能使用umi自动注入model功能
<pre>

import cloneDeep from 'lodash/cloneDeep'

// 获取当前页面namepsace
export const getNameSpace = () => {
  return window.g_app._store.getState().app.activePageTab.key;
};

// 挂在model,命名空的是使用当前开启tab页的key,每个key值是是代码生成的唯一值。保存store的作用于隔离。
export const model = store => {
  const namespace = store.namespace
    ? store.namespace
    : getNameSpace()
  const cloneStore = cloneDeep(store)
  cloneStore.namespace = namespace
  if (window.g_app._models.findIndex(x => x.namespace === namespace) < 0) {
    window.g_app.model(cloneStore);
  }
};

// 卸载Model
export const umModel = namespace => {
  const space = namespace ? namespace : getNameSpace()
  window.g_app.umModel(space);
};

// 获取State.不传递命名空间就取当前开启tab页的key
export const getState = namespace => {
  const space = namespace ? namespace : getNameSpace()
  return window.g_app._store.getState()[space];
};

export const dispatch = (actions) => {
  window.g_app._store.dispatch({
    ...actions,
    ...{
      type:`${getNameSpace()}/${actions.type}`
    }
  })
}

</pre>

4. 实现模拟登陆
5. 实现面包屑
