import * as React from 'react';
import useMethods from 'use-methods';
import { match, Route, Switch, Redirect } from 'react-router';
import { History } from 'history';
import { GlobalContext, GlobalState } from './globalContext';
import { globalMutators, GlobalMutators } from './globalMutators';
import { useEffect } from 'react';
import { UserAction } from './actions/userAction';
import { LayoutAction } from './actions/layoutAction';

interface Injection {
  history: History;
  match?: match<any>;
  children?: React.ReactNode;
}

interface Props extends Injection {}

const GlobalStateContainer = (props: Props) => {
  const [state, methods] = useMethods<GlobalState, GlobalMutators>(globalMutators, {
    lang: 'zh',
    asideFolded: false,
    offScreen: false,
    layoutAction: new LayoutAction(),
    userInfo: null,
    userAction: new UserAction()
  });

  // !!! 每个 action 都需要设置
  const mutators = methods as any;
  state.userAction.setGlobalState(state, mutators);

  useEffect(() => {
    // 获取 token
    const userInfo: any = JSON.parse(window.localStorage.getItem('userInfo'));
    console.log(userInfo);
    if (userInfo && userInfo.token) {
      // 怎么判断 token 是否有效？？？？
      state.userAction.updateUser(userInfo);
    }
    console.log(state);
  }, []);

  return <GlobalContext.Provider value={state}>{props.children}</GlobalContext.Provider>;
};

export default GlobalStateContainer;
