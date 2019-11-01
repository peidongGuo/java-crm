import { BaseAction } from './baseAction';
import { GlobalState } from '../globalContext';
import { BaseMutators, Mutators } from '../types';

/**
 * Mutators 是操作GlobalState的方法说明
 * 进行操作，然后融合到 GlobalMutators 中去，以便分离不同的逻辑
 *
 * 记住要在 GlobalMutators 中 extends 新创建的 XxxMutators
 */

export interface UserMutators extends BaseMutators {
  addUser(user: any): void;
  removeUser(): void;
}
/**
 * domainMutators 是操作GlobalState的方法实践
 * 用 {...domainMutators}融合到 globalMutators 中去，以便分离不同的逻辑
 */
export const userMutators: Mutators<UserMutators> = (state: GlobalState) => {
  return {
    addUser(user: any) {
      state.userInfo = { ...user };
      localStorage.setItem('userInfo', JSON.stringify(user));
      // apiServices.setToken('Bearer ' + user.token);
    },
    removeUser() {
      state.userInfo = null;
      localStorage.setItem('userInfo', null);
      // apiServices.setToken(null);
    },
    updateUser(user: any) {
      state.userInfo = { ...user };
      // apiServices.setToken('Bearer ' + user.token);
    }
  };
};
/**
 * 同步/异步操作
 */
export class UserAction extends BaseAction {
  addUser = (userInfo) => {
    this.mutators.addUser(userInfo);
  };
  updateUser = (userInfo) => {
    this.mutators.updateUser(userInfo);
  };

  removeUser = () => {
    this.mutators.removeUser();
  };
}
