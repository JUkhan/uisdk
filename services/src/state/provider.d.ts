import { StateController } from "./stateController";
export declare function Get<T extends StateController<any>>(controllerType: new () => T): T;
export declare function RemoveController<T extends StateController<any>>(controllerType: new () => T): boolean;
