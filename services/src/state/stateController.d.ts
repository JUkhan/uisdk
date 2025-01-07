import { Observable, Subscription } from 'rxjs';
import { Action } from './action';
import { Actions } from './actions';
/**
  * Dispatches an action to update the controller's state.
  * @param {string | Action} actionName - The name of the action or an Action instance.
  */
export declare function dispatch(actionName: string | Action): void;
export declare const action$: Actions;
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
export declare abstract class StateController<S> {
    /**
     * The BehaviorSubject that holds the current state.
     */
    private _store;
    /**
     * The subscription to actions and effects.
     */
    private _sub;
    /**
     * Creates an instance of StateController.
     * @param {S} initialState - The initial state of the controller.
     */
    constructor(initialState: S);
    /**
     * Handles incoming actions.
     * @param {Action} action - The action to be handled.
     */
    onAction(action: Action): void;
    /**
     * This function is fired after instantiating the controller.
     */
    onInit(): void;
    /**
   * Selects a slice of the state and returns it as an observable.
   * @typeparam T The type of the selected slice.
   * @param {function(state: S): T} mapFn - The function to map the state to the desired slice.
   * @returns {Observable<T>} An observable of the selected slice of the state.
   */
    select<T = any>(mapFn: (state: S) => T): Observable<T>;
    /**
    * Gets an observable stream of the controller's state with distinct value changes.
    * @returns {Observable<S>} An observable stream of the controller's state with distinct value changes.
    */
    get stream$(): Observable<S>;
    /**
    * Gets the Actions instance used for dispatching actions.
    * @returns {Actions} The Actions instance for dispatching actions.
    */
    get action$(): Actions;
    /**
    * Gets the current state of the controller.
    * @returns {S} The current state of the controller.
    */
    get state(): S;
    /**
    * Dispatches an action to update the controller's state.
    * @param {string | Action} actionName - The name of the action or an Action instance.
    */
    dispatch(actionName: string | Action): void;
    /**
    * Emits a new state or a partial state update to the controller's current state.
    * @param {Partial<S>} state - The new state or partial state update to be emitted.
    */
    emit(state: Partial<S>): void;
    /**
   * Imports a new state and updates the controller's current state.
   * @param {S} state - The new state to be imported.
   */
    importState(state: S): void;
    /**
   * Retrieves remote data from a controller instance by dispatching a remote action.
   * @typeparam S - The type of the state managed by the remote controller.
   * @param {new () => S} controllerType - The constructor of the remote controller.
   * @returns {Promise<S>} A promise that resolves to the retrieved remote data.
   * @private
   */
    private remoteData;
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
    remoteState<S, T extends StateController<any> = any>(controllerType: new () => T): Promise<S>;
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
    remoteController<S extends StateController<any>>(controllerType: new () => S): Observable<S>;
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
    remoteStream<S, T extends StateController<any> = any>(controllerType: new () => T): Observable<S>;
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
    effectOnAction(aStream: Observable<S>): void;
    /**
     * Disposes of the subscription to actions and effects.
     */
    dispose(): void;
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
    effect<T>(fx: (arg$: Observable<T>) => Observable<Partial<S>>): (arg: T) => void;
    /**
    * Tears down a subscription by adding it to the internal collection.
    * @param {Subscription} subscription - The subscription to tear down.
    * @returns {void}
    */
    tearDown(subscription: Subscription): void;
}
