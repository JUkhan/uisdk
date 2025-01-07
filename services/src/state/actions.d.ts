import { BehaviorSubject, Observable } from "rxjs";
import { Action } from "./action";
export declare class Actions {
    private _dispatcher;
    constructor(_dispatcher: BehaviorSubject<Action>);
    whereType(actionType: string): Observable<Action>;
    where(predicate: (action: Action) => boolean): Observable<Action>;
    isA<T extends Action>(actionOf: (new () => T) | (new (...args: any[]) => T)): Observable<T>;
}
