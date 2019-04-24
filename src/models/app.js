import { menuArray } from '@/config/menu';
import { whiteList } from '../config';
import { getFullPath, getLocationKey } from '../utils/location';
export default {
  namespace: 'app',
  state: {
    pageTabs: [],
    activePageTab: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'setPageTabs',
          location: location,
        });
      });
    },
  },
  effects: {
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
          const addPageTab = menuArray.find(x => x.path === location.pathname);
          if (addPageTab) {
            addPageTab.key = getLocationKey(location);
            addPageTab.fullPath = getFullPath(location);
            pageTabs.push(addPageTab)
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
    *removePageTabs({ index }, { select, put }) {
      const { pageTabs } = yield select(state => state.app);
      let activePageTab = null;
      if (index === 0) {
        activePageTab = pageTabs[1];
      } else {
        activePageTab = pageTabs[index - 1];
      }
      pageTabs.splice(index, 1);
      yield put({
        type: 'updateState',
        payload: {
          activePageTab,
          pageTabs,
        },
      });
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  }
}