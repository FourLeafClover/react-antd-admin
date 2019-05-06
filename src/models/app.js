import { menuArray } from '@/config/menu';
import { whiteList } from '../config';
import { getFullPath, getLocationKey, cloneMenu } from '../utils/location';
import { getToken, setToken } from '../utils/token';
import { login, getUserInfo } from '../api/login';
import router from 'umi/router';
export default {
  namespace: 'app',
  state: {
    pageTabs: [
      {
        key: 'home',
        fullPath: '/',
        menuName: '首页',
        fixed: true,
      },
    ],
    activePageTab: null,
    user: {},
    token: '',  
    whiteList:whiteList // 没有layout的白名单页面
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (!whiteList.includes(location) && !getToken()) {
          if (location.pathname !== '/login'){
            router.push('/login')
          }
        } else {
          dispatch({
            type: 'setPageTabs',
            location: location,
          });
        }
      });
    },
  },
  effects: {
    *login({ params }, { put, call }) {
      let result = yield call(login, params);
      if (result.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: result.data.user,
            token: result.data.token,
          },
        });
        setToken(result.data.token);
        yield router.push('/');
      }
    },
    *logout({ payload }, { put }) {
      setToken('');
      yield put({
        type: 'updateState',
        payload: {
          token: '',
          user: {},
        },
      });
      yield router.replace('/login')
    },
    *getUserInfo({ payload }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: result.data,
          },
        });
      }
    },
    *setPageTabs({ location }, { select, put }) {
      const { pageTabs } = yield select(state => state.app);
      if (!whiteList.includes(location.pathname)) {
        const curPageTab = pageTabs.find(x => x.fullPath === getFullPath(location));
        if (curPageTab) {
          yield put({
            type: 'updateState',
            payload: {
              activePageTab: curPageTab,
            },
          });
        } else {
          let addPageTab = menuArray.find(x => x.path === location.pathname);
          if (addPageTab) {
            addPageTab = cloneMenu(addPageTab);
            addPageTab.key = getLocationKey(location);
            addPageTab.fullPath = getFullPath(location);
            pageTabs.push(addPageTab);
            yield put({
              type: 'updateState',
              payload: {
                pageTabs,
                activePageTab: addPageTab,
              },
            });
          }
        }
      }
    },
    *removeAllPageTabs(param, { select, put }) {
      const { pageTabs } = yield select(state => state.app);
      const fixedPageTabs = pageTabs.filter(x => x.fixed);
      yield put({
        type: 'updateState',
        payload: {
          pageTabs: fixedPageTabs,
          activePageTab: fixedPageTabs[0],
        },
      });
      yield router.push(fixedPageTabs[0].fullPath);
    },
    *removePageTabs({ page }, { select, put }) {
      const { pageTabs, activePageTab } = yield select(state => state.app);
      let nextActivePageTab = null;
      let index = pageTabs.findIndex(item => item.key === page.key);
      if (activePageTab.key === page.key) {
        if (index === 0) {
          nextActivePageTab = pageTabs[0];
        } else {
          nextActivePageTab = pageTabs[index - 1];
        }
      } else {
        nextActivePageTab = activePageTab;
      }
      pageTabs.splice(index, 1);
      yield put({
        type: 'updateState',
        payload: {
          pageTabs,
          activePageTab: nextActivePageTab,
        },
      });
      yield router.push(nextActivePageTab.fullPath);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
