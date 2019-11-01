import { createContext } from 'react';
import { MethodRecordBase } from 'use-methods';
import { BaseMutators } from './types';
import { UserAction } from './actions/userAction';
import { LayoutAction } from './actions/layoutAction';

export interface UserInfo {
  username: string;
  token: string;
  admin: boolean;
}
/**
 * 首先应该定义 GlobalState 的字段, 并在 GlobalStateContainer 中设置默认值
 */
export interface GlobalState {
  lang: string;
  asideFolded: boolean;
  offScreen: boolean;
  layoutAction: LayoutAction;
  userInfo: UserInfo;
  userAction: UserAction;
}

export const initialState: GlobalState = {} as any;

export const GlobalContext = createContext<GlobalState>(initialState);
