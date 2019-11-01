import { BaseAction } from './baseAction';
import { GlobalState } from '../globalContext';
import { BaseMutators, Mutators } from '../types';

/**
 * Mutators 是操作GlobalState的方法说明
 * 进行操作，然后融合到 GlobalMutators 中去，以便分离不同的逻辑
 *
 * 记住要在 GlobalMutators 中 extends 新创建的 XxxMutators
 */

export interface LayoutMutators extends BaseMutators {
  toggleOffScreen(): void;
  toggleAsideFolded(): void;
}
/**
 * domainMutators 是操作GlobalState的方法实践
 * 用 {...domainMutators}融合到 globalMutators 中去，以便分离不同的逻辑
 */
export const layoutMutators: Mutators<LayoutMutators> = (state: GlobalState) => {
  return {
    toggleOffScreen() {
      state.offScreen = !state.offScreen;
    },
    toggleAsideFolded() {
      state.asideFolded = !state.asideFolded;
    }
  };
};
/**
 * 同步/异步操作
 */
export class LayoutAction extends BaseAction {
  toggleOffScreen = () => {
    this.mutators.toggleOffScreen();
  };
  toggleAsideFolded = () => {
    this.mutators.toggleAsideFolded();
  };
}
