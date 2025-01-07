import { BehaviorSubject, Subscription, from, Subject } from 'rxjs';
import { map, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Actions } from './actions';
import { shallowEqual } from './shallowEqual';
const _dispatcher = new BehaviorSubject({ type: '@INIT' });
const _action$ = new Actions(_dispatcher);
/**
  * Dispatches an action to update the controller's state.
  * @param {string | Action} actionName - The name of the action or an Action instance.
  */
export function dispatch(actionName) {
    if (typeof actionName === 'object') {
        _dispatcher.next(actionName);
        return;
    }
    _dispatcher.next({ type: actionName });
}
export const action$ = _action$;
/**
 * Represents a base StateController class for managing state and actions.
 * typeparam S The type of the state managed by the controller.
 *
 *```ts
 *class CounterState extends StateController<number>{
 *
 *    CounterState(){
 *       super(0);
 *    }
 *
 *    increment(){
 *       emit(state + 1);
 *    }
 *
 *    decrement(){
 *       emit(state - 1);
 *    }
 *
 *}
 *```
 */
export class StateController {
    /**
     * Creates an instance of StateController.
     * @param {S} initialState - The initial state of the controller.
     */
    constructor(initialState) {
        this._store = new BehaviorSubject(initialState);
        this._sub = _dispatcher.subscribe((action) => {
            this.onAction(action);
        });
        setTimeout(() => {
            this.onInit();
        }, 0);
    }
    /**
     * Handles incoming actions.
     * @param {Action} action - The action to be handled.
     */
    onAction(action) {
        if (action instanceof RemoteControllerAction &&
            this instanceof action.payload) {
            action.type(this);
        }
    }
    /**
     * This function is fired after instantiating the controller.
     */
    onInit() { }
    /**
   * Selects a slice of the state and returns it as an observable.
   * @typeparam T The type of the selected slice.
   * @param {function(state: S): T} mapFn - The function to map the state to the desired slice.
   * @returns {Observable<T>} An observable of the selected slice of the state.
   */
    select(mapFn) {
        let mapped$;
        if (typeof mapFn === 'function') {
            mapped$ = this._store.pipe(map((source) => mapFn(source)));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof mapFn}' in select operator,` +
                ` expected 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged((prev, current) => shallowEqual(prev, current)));
    }
    /**
    * Gets an observable stream of the controller's state with distinct value changes.
    * @returns {Observable<S>} An observable stream of the controller's state with distinct value changes.
    */
    get stream$() {
        return this._store.pipe(distinctUntilChanged((prev, current) => shallowEqual(prev, current)));
    }
    /**
    * Gets the Actions instance used for dispatching actions.
    * @returns {Actions} The Actions instance for dispatching actions.
    */
    get action$() {
        return _action$;
    }
    /**
    * Gets the current state of the controller.
    * @returns {S} The current state of the controller.
    */
    get state() {
        return this._store.value;
    }
    /**
    * Dispatches an action to update the controller's state.
    * @param {string | Action} actionName - The name of the action or an Action instance.
    */
    dispatch(actionName) {
        dispatch(actionName);
    }
    /**
    * Emits a new state or a partial state update to the controller's current state.
    * @param {Partial<S>} state - The new state or partial state update to be emitted.
    */
    emit(state) {
        if (isPlainObj(state)) {
            this._store.next(Object.assign({}, this.state, state));
            return;
        }
        if (state !== undefined) {
            this._store.next(state);
        }
    }
    /**
   * Imports a new state and updates the controller's current state.
   * @param {S} state - The new state to be imported.
   */
    importState(state) {
        this._store.next(state);
    }
    /**
   * Retrieves remote data from a controller instance by dispatching a remote action.
   * @typeparam S - The type of the state managed by the remote controller.
   * @param {new () => S} controllerType - The constructor of the remote controller.
   * @returns {Promise<S>} A promise that resolves to the retrieved remote data.
   * @private
   */
    remoteData(controllerType) {
        return new Promise((resolver) => {
            this.dispatch(new RemoteControllerAction(resolver, controllerType));
        });
    }
    /**
     * Retrieves the remote state from a controller instance by invoking remote data retrieval.
     * @typeparam S - The type of the state to be retrieved.
     * @typeparam T - The type of the remote controller.
     * @param {new () => T} controllerType - The constructor of the remote controller.
     * @returns {Promise<S>} A promise that resolves to the remote state.
     *
     *```ts
     *const category = await remoteState<SearchCategory>(SearchCategoryController);
     *```
     *
     */
    remoteState(controllerType) {
        return this.remoteData(controllerType).then((ctrl) => ctrl.state);
    }
    /**
     * Creates an observable of a remote controller instance by invoking a remote data retrieval.
     * @typeparam S The type of the state managed by the remote controller.
     * @param {new () => S} controllerType - The constructor of the remote controller.
     * @returns {Observable<S>} An observable of the remote controller instance.
     *
     *`Example`
     *
     *```ts
     * this.remoteController(AppService)
     *    .pipe(
     *     mergeMap(s=>s.select(state=>state.todos.length))
     *    ).subscribe(num=>this.emit(num))
     *```
     */
    remoteController(controllerType) {
        return from(this.remoteData(controllerType));
    }
    /**
     * Creates an observable stream of data by merging the stream of a remote controller's state.
     * @typeparam S The type of the state being observed.
     * @typeparam T The type of the remote controller.
     * @param {new () => T} controllerType - The constructor of the remote controller.
     * @returns {Observable<S>} An observable stream of the merged remote controller's state.
     *
     *`Example`
     *
     *```
     *this.effectOnAction(
     *     this.action$.whereType('inc').pipe(
     *         withLatestFrom(this.remoteStream<IAppService>(AppService)),
     *         map(([_, state])=>state.todos.length)
     *    )
     *);
     *this.remoteStream<IAppService>(AppService).pipe(
     *     map(state=>state.todos.length)
     *    ).subscribe(console.log)
     *
     *```
     */
    remoteStream(controllerType) {
        return this.remoteController(controllerType).pipe(mergeMap((ctrl) => ctrl.stream$));
    }
    /**
     *Applies an effect to the provided stream of data, emitting the data to the controller's state.
     * @param {Observable<S>} aStream - The stream of data to apply the effect on.
     *
     * Use this function inside `onInit()` method only
     *
     *`Example`
     *```ts
     *void onInit() {
     *   effectOnAction(action$
     *     .whereType('testEffectOnAction')
     *     .map((event) => 101)
     *   );
     *}
     *```
     */
    effectOnAction(aStream) {
        this._sub.add(aStream.subscribe((data) => this.emit(data)));
    }
    /**
     * Disposes of the subscription to actions and effects.
     */
    dispose() {
        this._sub.unsubscribe();
    }
    /**
     * Defines an effect function that transforms an observable input into
     * a partial state update and sets up the subscription.
     * ```ts
     *
     * Example
     *
     * searchProduct = this.effect<string>(name$ => name$.pipe(
     *     debounceTime(230),
     *     distinctUntilChanged(),
     *     tap(_=>this.emit({status:'loading'})
     *     map(name => name.toUpperCase()),
     *     switchMap(name => api.searchProduct(name)),
     *     map(products => ({status:'loaded', products}))
     *  )
     * );
     * ```
     *
     */
    effect(fx) {
        const subject = new Subject();
        this._sub.add(fx(subject).subscribe((e) => this.emit(e)));
        return (arg) => {
            subject.next(arg);
        };
    }
    /**
    * Tears down a subscription by adding it to the internal collection.
    * @param {Subscription} subscription - The subscription to tear down.
    * @returns {void}
    */
    tearDown(subscription) {
        if (subscription instanceof Subscription) {
            this._sub.add(subscription);
        }
    }
}
/**
 * Checks if the provided value is a plain object.
 * @param {any} o - The value to check.
 * @returns {boolean} Returns true if the value is a plain object, otherwise false.
 */
function isPlainObj(o) {
    return o ? typeof o == 'object' && o.constructor == Object : false;
}
/**
 * Represents an action that can be dispatched to remote controllers.
 * @implements {Action}
 */
class RemoteControllerAction {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzL3NyYy9zdGF0ZS9zdGF0ZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFMUM7OztJQUdJO0FBQ0osTUFBTSxVQUFVLFFBQVEsQ0FBQyxVQUEyQjtJQUNsRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNsQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLE9BQU87S0FDUjtJQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxPQUFnQixlQUFlO0lBWW5DOzs7T0FHRztJQUNILFlBQVksWUFBZTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFJLFlBQVksQ0FB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LElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFNLEVBQUUsRUFBRTtZQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsUUFBUSxDQUFDLFlBQTBCO1FBQ2pDLElBQUksWUFBWSxZQUFZLFlBQVksRUFBRTtZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Q0FFRjtBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxDQUFNO0lBQ3hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNyRSxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxzQkFBc0I7SUFDMUIsWUFBbUIsSUFBMEIsRUFBUyxPQUFZO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQXNCO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBSztJQUFJLENBQUM7Q0FDeEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgQWN0aW9ucyB9IGZyb20gJy4vYWN0aW9ucyc7XHJcbmltcG9ydCB7IHNoYWxsb3dFcXVhbCB9IGZyb20gJy4vc2hhbGxvd0VxdWFsJztcclxuXHJcbmNvbnN0IF9kaXNwYXRjaGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBY3Rpb24+KHsgdHlwZTogJ0BJTklUJyB9KTtcclxuY29uc3QgX2FjdGlvbiQgPSBuZXcgQWN0aW9ucyhfZGlzcGF0Y2hlcik7XHJcblxyXG4vKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgY29udHJvbGxlcidzIHN0YXRlLlxyXG4gICogQHBhcmFtIHtzdHJpbmcgfCBBY3Rpb259IGFjdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIG9yIGFuIEFjdGlvbiBpbnN0YW5jZS5cclxuICAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uTmFtZTogc3RyaW5nIHwgQWN0aW9uKTogdm9pZCB7XHJcbiAgaWYgKHR5cGVvZiBhY3Rpb25OYW1lID09PSAnb2JqZWN0Jykge1xyXG4gICAgX2Rpc3BhdGNoZXIubmV4dChhY3Rpb25OYW1lKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgX2Rpc3BhdGNoZXIubmV4dCh7IHR5cGU6IGFjdGlvbk5hbWUgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb24kID0gX2FjdGlvbiRcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgYmFzZSBTdGF0ZUNvbnRyb2xsZXIgY2xhc3MgZm9yIG1hbmFnaW5nIHN0YXRlIGFuZCBhY3Rpb25zLlxyXG4gKiB0eXBlcGFyYW0gUyBUaGUgdHlwZSBvZiB0aGUgc3RhdGUgbWFuYWdlZCBieSB0aGUgY29udHJvbGxlci5cclxuICogXHJcbiAqYGBgdHNcclxuICpjbGFzcyBDb3VudGVyU3RhdGUgZXh0ZW5kcyBTdGF0ZUNvbnRyb2xsZXI8bnVtYmVyPntcclxuICpcclxuICogICAgQ291bnRlclN0YXRlKCl7XHJcbiAqICAgICAgIHN1cGVyKDApO1xyXG4gKiAgICB9XHJcbiAqXHJcbiAqICAgIGluY3JlbWVudCgpe1xyXG4gKiAgICAgICBlbWl0KHN0YXRlICsgMSk7XHJcbiAqICAgIH1cclxuICpcclxuICogICAgZGVjcmVtZW50KCl7XHJcbiAqICAgICAgIGVtaXQoc3RhdGUgLSAxKTtcclxuICogICAgfVxyXG4gKlxyXG4gKn1cclxuICpgYGBcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZUNvbnRyb2xsZXI8Uz4ge1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgQmVoYXZpb3JTdWJqZWN0IHRoYXQgaG9sZHMgdGhlIGN1cnJlbnQgc3RhdGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3RvcmU6IEJlaGF2aW9yU3ViamVjdDxTPjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN1YnNjcmlwdGlvbiB0byBhY3Rpb25zIGFuZCBlZmZlY3RzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN0YXRlQ29udHJvbGxlci5cclxuICAgKiBAcGFyYW0ge1N9IGluaXRpYWxTdGF0ZSAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb250cm9sbGVyLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGluaXRpYWxTdGF0ZTogUykge1xyXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFM+KGluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgdGhpcy5fc3ViID0gX2Rpc3BhdGNoZXIuc3Vic2NyaWJlKChhY3Rpb24pID0+IHtcclxuICAgICAgdGhpcy5vbkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25Jbml0KCk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgaW5jb21pbmcgYWN0aW9ucy5cclxuICAgKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uIC0gVGhlIGFjdGlvbiB0byBiZSBoYW5kbGVkLlxyXG4gICAqL1xyXG4gIG9uQWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGFjdGlvbiBpbnN0YW5jZW9mIFJlbW90ZUNvbnRyb2xsZXJBY3Rpb24gJiZcclxuICAgICAgdGhpcyBpbnN0YW5jZW9mIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApIHtcclxuICAgICAgYWN0aW9uLnR5cGUodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGZpcmVkIGFmdGVyIGluc3RhbnRpYXRpbmcgdGhlIGNvbnRyb2xsZXIuXHJcbiAgICovXHJcbiAgb25Jbml0KCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gKiBTZWxlY3RzIGEgc2xpY2Ugb2YgdGhlIHN0YXRlIGFuZCByZXR1cm5zIGl0IGFzIGFuIG9ic2VydmFibGUuXHJcbiAqIEB0eXBlcGFyYW0gVCBUaGUgdHlwZSBvZiB0aGUgc2VsZWN0ZWQgc2xpY2UuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RhdGU6IFMpOiBUfSBtYXBGbiAtIFRoZSBmdW5jdGlvbiB0byBtYXAgdGhlIHN0YXRlIHRvIHRoZSBkZXNpcmVkIHNsaWNlLlxyXG4gKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxUPn0gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0ZWQgc2xpY2Ugb2YgdGhlIHN0YXRlLlxyXG4gKi9cclxuICBzZWxlY3Q8VCA9IGFueT4obWFwRm46IChzdGF0ZTogUykgPT4gVCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgbGV0IG1hcHBlZCQ7XHJcbiAgICBpZiAodHlwZW9mIG1hcEZuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG1hcHBlZCQgPSB0aGlzLl9zdG9yZS5waXBlKG1hcCgoc291cmNlOiBhbnkpID0+IG1hcEZuKHNvdXJjZSkpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgYFVuZXhwZWN0ZWQgdHlwZSAnJHt0eXBlb2YgbWFwRm59JyBpbiBzZWxlY3Qgb3BlcmF0b3IsYCArXHJcbiAgICAgICAgYCBleHBlY3RlZCAnZnVuY3Rpb24nYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcHBlZCQucGlwZShcclxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHByZXYsIGN1cnJlbnQpID0+IHNoYWxsb3dFcXVhbChwcmV2LCBjdXJyZW50KSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldHMgYW4gb2JzZXJ2YWJsZSBzdHJlYW0gb2YgdGhlIGNvbnRyb2xsZXIncyBzdGF0ZSB3aXRoIGRpc3RpbmN0IHZhbHVlIGNoYW5nZXMuXHJcbiAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxTPn0gQW4gb2JzZXJ2YWJsZSBzdHJlYW0gb2YgdGhlIGNvbnRyb2xsZXIncyBzdGF0ZSB3aXRoIGRpc3RpbmN0IHZhbHVlIGNoYW5nZXMuXHJcbiAgKi9cclxuICBnZXQgc3RyZWFtJCgpOiBPYnNlcnZhYmxlPFM+IHtcclxuICAgIHJldHVybiB0aGlzLl9zdG9yZS5waXBlKFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgocHJldiwgY3VycmVudCkgPT4gc2hhbGxvd0VxdWFsKHByZXYsIGN1cnJlbnQpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0cyB0aGUgQWN0aW9ucyBpbnN0YW5jZSB1c2VkIGZvciBkaXNwYXRjaGluZyBhY3Rpb25zLlxyXG4gICogQHJldHVybnMge0FjdGlvbnN9IFRoZSBBY3Rpb25zIGluc3RhbmNlIGZvciBkaXNwYXRjaGluZyBhY3Rpb25zLlxyXG4gICovXHJcbiAgZ2V0IGFjdGlvbiQoKTogQWN0aW9ucyB7XHJcbiAgICByZXR1cm4gX2FjdGlvbiQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNvbnRyb2xsZXIuXHJcbiAgKiBAcmV0dXJucyB7U30gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNvbnRyb2xsZXIuXHJcbiAgKi9cclxuICBnZXQgc3RhdGUoKTogUyB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUudmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgY29udHJvbGxlcidzIHN0YXRlLlxyXG4gICogQHBhcmFtIHtzdHJpbmcgfCBBY3Rpb259IGFjdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIG9yIGFuIEFjdGlvbiBpbnN0YW5jZS5cclxuICAqL1xyXG4gIGRpc3BhdGNoKGFjdGlvbk5hbWU6IHN0cmluZyB8IEFjdGlvbik6IHZvaWQge1xyXG4gICAgZGlzcGF0Y2goYWN0aW9uTmFtZSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRW1pdHMgYSBuZXcgc3RhdGUgb3IgYSBwYXJ0aWFsIHN0YXRlIHVwZGF0ZSB0byB0aGUgY29udHJvbGxlcidzIGN1cnJlbnQgc3RhdGUuXHJcbiAgKiBAcGFyYW0ge1BhcnRpYWw8Uz59IHN0YXRlIC0gVGhlIG5ldyBzdGF0ZSBvciBwYXJ0aWFsIHN0YXRlIHVwZGF0ZSB0byBiZSBlbWl0dGVkLlxyXG4gICovXHJcbiAgZW1pdChzdGF0ZTogUGFydGlhbDxTPikge1xyXG4gICAgaWYgKGlzUGxhaW5PYmooc3RhdGUpKSB7XHJcbiAgICAgIHRoaXMuX3N0b3JlLm5leHQoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwgc3RhdGUpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fc3RvcmUubmV4dChzdGF0ZSBhcyBhbnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIEltcG9ydHMgYSBuZXcgc3RhdGUgYW5kIHVwZGF0ZXMgdGhlIGNvbnRyb2xsZXIncyBjdXJyZW50IHN0YXRlLlxyXG4gKiBAcGFyYW0ge1N9IHN0YXRlIC0gVGhlIG5ldyBzdGF0ZSB0byBiZSBpbXBvcnRlZC5cclxuICovXHJcbiAgaW1wb3J0U3RhdGUoc3RhdGU6IFMpIHtcclxuICAgIHRoaXMuX3N0b3JlLm5leHQoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIFJldHJpZXZlcyByZW1vdGUgZGF0YSBmcm9tIGEgY29udHJvbGxlciBpbnN0YW5jZSBieSBkaXNwYXRjaGluZyBhIHJlbW90ZSBhY3Rpb24uXHJcbiAqIEB0eXBlcGFyYW0gUyAtIFRoZSB0eXBlIG9mIHRoZSBzdGF0ZSBtYW5hZ2VkIGJ5IHRoZSByZW1vdGUgY29udHJvbGxlci5cclxuICogQHBhcmFtIHtuZXcgKCkgPT4gU30gY29udHJvbGxlclR5cGUgLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHJlbW90ZSBjb250cm9sbGVyLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxTPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJldHJpZXZlZCByZW1vdGUgZGF0YS5cclxuICogQHByaXZhdGVcclxuICovXHJcbiAgcHJpdmF0ZSByZW1vdGVEYXRhPFMgZXh0ZW5kcyBTdGF0ZUNvbnRyb2xsZXI8YW55Pj4oXHJcbiAgICBjb250cm9sbGVyVHlwZTogbmV3ICgpID0+IFNcclxuICApOiBQcm9taXNlPFM+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTPigocmVzb2x2ZXIpID0+IHtcclxuICAgICAgdGhpcy5kaXNwYXRjaChuZXcgUmVtb3RlQ29udHJvbGxlckFjdGlvbihyZXNvbHZlciwgY29udHJvbGxlclR5cGUpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSByZW1vdGUgc3RhdGUgZnJvbSBhIGNvbnRyb2xsZXIgaW5zdGFuY2UgYnkgaW52b2tpbmcgcmVtb3RlIGRhdGEgcmV0cmlldmFsLlxyXG4gICAqIEB0eXBlcGFyYW0gUyAtIFRoZSB0eXBlIG9mIHRoZSBzdGF0ZSB0byBiZSByZXRyaWV2ZWQuXHJcbiAgICogQHR5cGVwYXJhbSBUIC0gVGhlIHR5cGUgb2YgdGhlIHJlbW90ZSBjb250cm9sbGVyLlxyXG4gICAqIEBwYXJhbSB7bmV3ICgpID0+IFR9IGNvbnRyb2xsZXJUeXBlIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSByZW1vdGUgY29udHJvbGxlci5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlbW90ZSBzdGF0ZS5cclxuICAgKlxyXG4gICAqYGBgdHNcclxuICAgKmNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgcmVtb3RlU3RhdGU8U2VhcmNoQ2F0ZWdvcnk+KFNlYXJjaENhdGVnb3J5Q29udHJvbGxlcik7XHJcbiAgICpgYGBcclxuICAgKlxyXG4gICAqL1xyXG4gIHJlbW90ZVN0YXRlPFMsIFQgZXh0ZW5kcyBTdGF0ZUNvbnRyb2xsZXI8YW55PiA9IGFueT4oXHJcbiAgICBjb250cm9sbGVyVHlwZTogbmV3ICgpID0+IFRcclxuICApOiBQcm9taXNlPFM+IHtcclxuICAgIHJldHVybiB0aGlzLnJlbW90ZURhdGE8VD4oY29udHJvbGxlclR5cGUpLnRoZW4oKGN0cmwpID0+IGN0cmwuc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIG9mIGEgcmVtb3RlIGNvbnRyb2xsZXIgaW5zdGFuY2UgYnkgaW52b2tpbmcgYSByZW1vdGUgZGF0YSByZXRyaWV2YWwuXHJcbiAgICogQHR5cGVwYXJhbSBTIFRoZSB0eXBlIG9mIHRoZSBzdGF0ZSBtYW5hZ2VkIGJ5IHRoZSByZW1vdGUgY29udHJvbGxlci5cclxuICAgKiBAcGFyYW0ge25ldyAoKSA9PiBTfSBjb250cm9sbGVyVHlwZSAtIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcmVtb3RlIGNvbnRyb2xsZXIuXHJcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Uz59IEFuIG9ic2VydmFibGUgb2YgdGhlIHJlbW90ZSBjb250cm9sbGVyIGluc3RhbmNlLlxyXG4gICAqIFxyXG4gICAqYEV4YW1wbGVgXHJcbiAgICpcclxuICAgKmBgYHRzXHJcbiAgICogdGhpcy5yZW1vdGVDb250cm9sbGVyKEFwcFNlcnZpY2UpXHJcbiAgICogICAgLnBpcGUoXHJcbiAgICogICAgIG1lcmdlTWFwKHM9PnMuc2VsZWN0KHN0YXRlPT5zdGF0ZS50b2Rvcy5sZW5ndGgpKVxyXG4gICAqICAgICkuc3Vic2NyaWJlKG51bT0+dGhpcy5lbWl0KG51bSkpXHJcbiAgICpgYGBcclxuICAgKi9cclxuICByZW1vdGVDb250cm9sbGVyPFMgZXh0ZW5kcyBTdGF0ZUNvbnRyb2xsZXI8YW55Pj4oXHJcbiAgICBjb250cm9sbGVyVHlwZTogbmV3ICgpID0+IFNcclxuICApOiBPYnNlcnZhYmxlPFM+IHtcclxuICAgIHJldHVybiBmcm9tKHRoaXMucmVtb3RlRGF0YTxTPihjb250cm9sbGVyVHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIHN0cmVhbSBvZiBkYXRhIGJ5IG1lcmdpbmcgdGhlIHN0cmVhbSBvZiBhIHJlbW90ZSBjb250cm9sbGVyJ3Mgc3RhdGUuXHJcbiAgICogQHR5cGVwYXJhbSBTIFRoZSB0eXBlIG9mIHRoZSBzdGF0ZSBiZWluZyBvYnNlcnZlZC5cclxuICAgKiBAdHlwZXBhcmFtIFQgVGhlIHR5cGUgb2YgdGhlIHJlbW90ZSBjb250cm9sbGVyLlxyXG4gICAqIEBwYXJhbSB7bmV3ICgpID0+IFR9IGNvbnRyb2xsZXJUeXBlIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSByZW1vdGUgY29udHJvbGxlci5cclxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxTPn0gQW4gb2JzZXJ2YWJsZSBzdHJlYW0gb2YgdGhlIG1lcmdlZCByZW1vdGUgY29udHJvbGxlcidzIHN0YXRlLlxyXG4gICAqXHJcbiAgICpgRXhhbXBsZWBcclxuICAgKlxyXG4gICAqYGBgXHJcbiAgICp0aGlzLmVmZmVjdE9uQWN0aW9uKFxyXG4gICAqICAgICB0aGlzLmFjdGlvbiQud2hlcmVUeXBlKCdpbmMnKS5waXBlKFxyXG4gICAqICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5yZW1vdGVTdHJlYW08SUFwcFNlcnZpY2U+KEFwcFNlcnZpY2UpKSxcclxuICAgKiAgICAgICAgIG1hcCgoW18sIHN0YXRlXSk9PnN0YXRlLnRvZG9zLmxlbmd0aClcclxuICAgKiAgICApXHJcbiAgICopO1xyXG4gICAqdGhpcy5yZW1vdGVTdHJlYW08SUFwcFNlcnZpY2U+KEFwcFNlcnZpY2UpLnBpcGUoXHJcbiAgICogICAgIG1hcChzdGF0ZT0+c3RhdGUudG9kb3MubGVuZ3RoKVxyXG4gICAqICAgICkuc3Vic2NyaWJlKGNvbnNvbGUubG9nKVxyXG4gICAqXHJcbiAgICpgYGBcclxuICAgKi9cclxuICByZW1vdGVTdHJlYW08UywgVCBleHRlbmRzIFN0YXRlQ29udHJvbGxlcjxhbnk+ID0gYW55PihcclxuICAgIGNvbnRyb2xsZXJUeXBlOiBuZXcgKCkgPT4gVFxyXG4gICk6IE9ic2VydmFibGU8Uz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVtb3RlQ29udHJvbGxlcjxUPihjb250cm9sbGVyVHlwZSkucGlwZShcclxuICAgICAgbWVyZ2VNYXAoKGN0cmwpID0+IGN0cmwuc3RyZWFtJClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKkFwcGxpZXMgYW4gZWZmZWN0IHRvIHRoZSBwcm92aWRlZCBzdHJlYW0gb2YgZGF0YSwgZW1pdHRpbmcgdGhlIGRhdGEgdG8gdGhlIGNvbnRyb2xsZXIncyBzdGF0ZS5cclxuICAgKiBAcGFyYW0ge09ic2VydmFibGU8Uz59IGFTdHJlYW0gLSBUaGUgc3RyZWFtIG9mIGRhdGEgdG8gYXBwbHkgdGhlIGVmZmVjdCBvbi5cclxuICAgKiBcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiBpbnNpZGUgYG9uSW5pdCgpYCBtZXRob2Qgb25seVxyXG4gICAqXHJcbiAgICpgRXhhbXBsZWBcclxuICAgKmBgYHRzXHJcbiAgICp2b2lkIG9uSW5pdCgpIHtcclxuICAgKiAgIGVmZmVjdE9uQWN0aW9uKGFjdGlvbiRcclxuICAgKiAgICAgLndoZXJlVHlwZSgndGVzdEVmZmVjdE9uQWN0aW9uJylcclxuICAgKiAgICAgLm1hcCgoZXZlbnQpID0+IDEwMSlcclxuICAgKiAgICk7XHJcbiAgICp9XHJcbiAgICpgYGBcclxuICAgKi9cclxuICBlZmZlY3RPbkFjdGlvbihhU3RyZWFtOiBPYnNlcnZhYmxlPFM+KSB7XHJcbiAgICB0aGlzLl9zdWIuYWRkKGFTdHJlYW0uc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmVtaXQoZGF0YSkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2VzIG9mIHRoZSBzdWJzY3JpcHRpb24gdG8gYWN0aW9ucyBhbmQgZWZmZWN0cy5cclxuICAgKi9cclxuICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGFuIGVmZmVjdCBmdW5jdGlvbiB0aGF0IHRyYW5zZm9ybXMgYW4gb2JzZXJ2YWJsZSBpbnB1dCBpbnRvXHJcbiAgICogYSBwYXJ0aWFsIHN0YXRlIHVwZGF0ZSBhbmQgc2V0cyB1cCB0aGUgc3Vic2NyaXB0aW9uLlxyXG4gICAqIGBgYHRzXHJcbiAgICpcclxuICAgKiBFeGFtcGxlXHJcbiAgICpcclxuICAgKiBzZWFyY2hQcm9kdWN0ID0gdGhpcy5lZmZlY3Q8c3RyaW5nPihuYW1lJCA9PiBuYW1lJC5waXBlKFxyXG4gICAqICAgICBkZWJvdW5jZVRpbWUoMjMwKSxcclxuICAgKiAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgKiAgICAgdGFwKF89PnRoaXMuZW1pdCh7c3RhdHVzOidsb2FkaW5nJ30pXHJcbiAgICogICAgIG1hcChuYW1lID0+IG5hbWUudG9VcHBlckNhc2UoKSksXHJcbiAgICogICAgIHN3aXRjaE1hcChuYW1lID0+IGFwaS5zZWFyY2hQcm9kdWN0KG5hbWUpKSxcclxuICAgKiAgICAgbWFwKHByb2R1Y3RzID0+ICh7c3RhdHVzOidsb2FkZWQnLCBwcm9kdWN0c30pKVxyXG4gICAqICApXHJcbiAgICogKTtcclxuICAgKiBgYGBcclxuICAgKlxyXG4gICAqL1xyXG5cclxuICBlZmZlY3Q8VD4oXHJcbiAgICBmeDogKGFyZyQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8UGFydGlhbDxTPj5cclxuICApOiAoYXJnOiBUKSA9PiB2b2lkIHtcclxuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgdGhpcy5fc3ViLmFkZChmeChzdWJqZWN0KS5zdWJzY3JpYmUoKGUpID0+IHRoaXMuZW1pdChlKSkpO1xyXG4gICAgcmV0dXJuIChhcmc6IFQpID0+IHtcclxuICAgICAgc3ViamVjdC5uZXh0KGFyZyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBUZWFycyBkb3duIGEgc3Vic2NyaXB0aW9uIGJ5IGFkZGluZyBpdCB0byB0aGUgaW50ZXJuYWwgY29sbGVjdGlvbi5cclxuICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gLSBUaGUgc3Vic2NyaXB0aW9uIHRvIHRlYXIgZG93bi5cclxuICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICovXHJcbiAgdGVhckRvd24oc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcclxuICAgIGlmIChzdWJzY3JpcHRpb24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fc3ViLmFkZChzdWJzY3JpcHRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge2FueX0gbyAtIFRoZSB2YWx1ZSB0byBjaGVjay5cclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QsIG90aGVyd2lzZSBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGlzUGxhaW5PYmoobzogYW55KSB7XHJcbiAgcmV0dXJuIG8gPyB0eXBlb2YgbyA9PSAnb2JqZWN0JyAmJiBvLmNvbnN0cnVjdG9yID09IE9iamVjdCA6IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiBhY3Rpb24gdGhhdCBjYW4gYmUgZGlzcGF0Y2hlZCB0byByZW1vdGUgY29udHJvbGxlcnMuXHJcbiAqIEBpbXBsZW1lbnRzIHtBY3Rpb259XHJcbiAqL1xyXG5jbGFzcyBSZW1vdGVDb250cm9sbGVyQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogKHN0YXRlOiBhbnkpID0+IHZvaWQsIHB1YmxpYyBwYXlsb2FkOiBhbnkpIHsgfVxyXG59XHJcbiJdfQ==