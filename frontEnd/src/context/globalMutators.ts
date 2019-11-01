import { GlobalState } from './globalContext';
import { Mutators, BaseMutators } from './types';
import { userMutators, UserMutators } from './actions/userAction';
import { LayoutMutators, layoutMutators } from './actions/layoutAction';

/**
 * 第二步定义更改 GlobalState 字段的接口
 * 然后在 globalMutators 中实现新添加的接口方法
 */
export interface GlobalMutators extends UserMutators, LayoutMutators, BaseMutators {}

export const globalMutators: Mutators<GlobalMutators> = (state: GlobalState) => ({
  ...layoutMutators(state),
  ...userMutators(state)
});
