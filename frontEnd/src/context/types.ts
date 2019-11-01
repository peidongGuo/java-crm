import { MethodRecordBase, Methods } from "use-methods";
import { GlobalState } from "./globalContext";

export type BaseMutators = MethodRecordBase<GlobalState>;
export type Mutators<T extends BaseMutators> = Methods<GlobalState, T>;
