import { GlobalState } from "../globalContext";
import { GlobalMutators } from "../globalMutators";

export abstract class BaseAction {
  protected globalState: GlobalState;
  protected mutators: GlobalMutators;

  setGlobalState(globalState: GlobalState, mutators: GlobalMutators) {
    this.globalState = globalState;
    this.mutators = mutators;
  }
}
