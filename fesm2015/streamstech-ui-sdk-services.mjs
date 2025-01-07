import * as i0 from '@angular/core';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import { AlertMessageComponent } from '@streamstech/ui-sdk/fuse/alert';
import * as i1 from '@angular/material/snack-bar';
import * as i1$1 from '@angular/common/http';
import { BehaviorSubject, from, Subject, Subscription, filter as filter$1, map as map$1 } from 'rxjs';
import { filter, map, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';

class AlertMessageService {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
    }
    showSuccess() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showError() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: ConstantService.Message.SAVED_FAIL_TITLE,
                messageBody: ConstantService.Message.SAVED_FAIL,
            },
        });
    }
    showGivenSuccessMessage(msg) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: msg,
            },
        });
    }
    showSuccessMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.SAVED_SUCCESSFUL,
            },
        });
    }
    showCancelMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.CANCEL_SUCCESSFUL,
            },
        });
    }
    showDeleteMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.DELETE_SUCCESSFUL,
            },
        });
    }
    successMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: message,
            },
        });
    }
    showErrorNotification() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody: 'The operation has failed due to the presence of child entities associated with this office type.',
            },
        });
    }
    showWarning() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showInfo() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'info',
                messageTitle: 'Information',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showErrorMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody: message,
            },
        });
    }
    showWarningMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: message,
            },
        });
    }
}
AlertMessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, deps: [{ token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
AlertMessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }]; } });

class ApiService {
    constructor(http, env) {
        this.http = http;
        this.env = env;
    }
    get(url, options) {
        return this.http.get(this.getUrl(url), options);
    }
    post(url, payload, options) {
        return this.http.post(this.getUrl(url), payload, options);
    }
    delete(url, options) {
        return this.http.delete(this.getUrl(url), options);
    }
    getUrl(url) {
        return this.env.apiBaseUrl + url;
    }
}
ApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, deps: [{ token: i1$1.HttpClient }, { token: 'env' }], target: i0.ɵɵFactoryTarget.Injectable });
ApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.HttpClient }, { type: undefined, decorators: [{
                        type: Inject,
                        args: ['env']
                    }] }];
    } });

class Actions {
    constructor(_dispatcher) {
        this._dispatcher = _dispatcher;
    }
    whereType(actionType) {
        return this._dispatcher.pipe(filter((action) => action.type == actionType));
    }
    where(predicate) {
        return this._dispatcher.pipe(filter(predicate));
    }
    isA(actionOf) {
        return this._dispatcher.pipe(filter((action) => action instanceof actionOf), map((action) => action));
    }
}

function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    }
    else {
        return x !== x && y !== y;
    }
}
function shallowEqual(objA, objB) {
    if (is(objA, objB))
        return true;
    if (typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length)
        return false;
    for (let i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}

const _dispatcher = new BehaviorSubject({ type: '@INIT' });
const _action$ = new Actions(_dispatcher);
/**
  * Dispatches an action to update the controller's state.
  * @param {string | Action} actionName - The name of the action or an Action instance.
  */
function dispatch(actionName) {
    if (typeof actionName === 'object') {
        _dispatcher.next(actionName);
        return;
    }
    _dispatcher.next({ type: actionName });
}
const action$ = _action$;
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
class StateController {
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

const _container = new Map();
const get_id = (() => {
    let _id = 1;
    return () => _id++;
})();
function Get(controllerType) {
    const fn = controllerType;
    if (!fn._$key) {
        fn._$key = `${new Date().getTime()}${get_id()}`;
    }
    if (!_container.has(fn._$key)) {
        _container.set(fn._$key, new controllerType());
    }
    return _container.get(fn._$key);
}
function RemoveController(controllerType) {
    const fn = controllerType;
    if (_container.has(fn._$key)) {
        if (_container.get(fn._$key).dispose)
            _container.get(fn._$key).dispose();
        _container.delete(fn._$key);
        fn._$key = undefined;
        return true;
    }
    return false;
}

var _SidebarService_drawer, _SidebarService_sidebarContainerRef;
class SidebarService {
    constructor() {
        _SidebarService_drawer.set(this, void 0);
        _SidebarService_sidebarContainerRef.set(this, void 0);
    }
    get drawer() {
        return __classPrivateFieldGet(this, _SidebarService_drawer, "f");
    }
    get sidebarContainerRef() {
        return __classPrivateFieldGet(this, _SidebarService_sidebarContainerRef, "f");
    }
    set sidebarWidth(width) {
        dispatch(new SidebarWidth(width));
    }
    set isBackdropOn(value) {
        dispatch(new SidebarBackdrop(value));
    }
    addDrawer(drawer, container) {
        if (!__classPrivateFieldGet(this, _SidebarService_drawer, "f")) {
            __classPrivateFieldSet(this, _SidebarService_drawer, drawer, "f");
            __classPrivateFieldSet(this, _SidebarService_sidebarContainerRef, container, "f");
        }
    }
    open() {
        this.drawer.open();
    }
    close() {
        this.drawer.close();
    }
    setData(data, key = '') {
        dispatch(new DataPassThroughSidebar(data, key));
    }
    getData(key = '') {
        return action$.isA(DataPassThroughSidebar).pipe(filter$1(it => it.type === key), map$1(it => it.data));
    }
    clearData() {
        dispatch('clearData');
    }
    openTableSidebarWithDynamicComponent(componentData) {
        __classPrivateFieldGet(this, _SidebarService_sidebarContainerRef, "f").clear();
        const ref = __classPrivateFieldGet(this, _SidebarService_sidebarContainerRef, "f").createComponent(componentData.componentRef);
        ref.instance.data = componentData.rowData;
        this.open();
    }
}
_SidebarService_drawer = new WeakMap(), _SidebarService_sidebarContainerRef = new WeakMap();
SidebarService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SidebarService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SidebarService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SidebarService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SidebarService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
class SidebarWidth {
    constructor(width) {
        this.width = width;
    }
}
class DataPassThroughSidebar {
    constructor(data, type) {
        this.data = data;
        this.type = type;
    }
}
class SidebarBackdrop {
    constructor(isBackdropOn) {
        this.isBackdropOn = isBackdropOn;
    }
}

class EventEmitterService {
    constructor() {
        this.clickEventEmitter = new EventEmitter();
    }
    emitClickEvent(res) {
        this.clickEventEmitter.emit(res);
    }
    getClickEventEmitter() {
        return this.clickEventEmitter;
    }
}
EventEmitterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EventEmitterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

//import moment from 'moment';
const moment = {};
class DateTimeService {
    constructor(http) {
        this.http = http;
    }
    formatDate(date) {
        return moment(date).format(ConstantService.DateFormat.DATEFORMAT_DD_MM_YYYY);
    }
    formatDateTime(date) {
        return moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
    }
    formatDateWithTime(date) {
        const formattedDate = moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
        return formattedDate;
    }
    isInvalidDate(date) {
        // try to use moment to check the valid date
        return date === '0001-01-01T00:00:00' || !date;
    }
}
DateTimeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, deps: [{ token: i1$1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DateTimeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }]; } });

class FlagService extends StateController {
    constructor() {
        super({
            survey: {
                formId: '',
                stateName: SurveyStateName.formDataViw
            }
        });
        this.surveyFormId$ = this.select(state => state.survey.formId);
        this.surveyFormDataViw$ = this.select(state => state.survey.stateName).pipe(map$1(it => it === SurveyStateName.formDataViw));
        this.surveyMapView$ = this.select(state => state.survey.stateName).pipe(map$1(it => it === SurveyStateName.mapView));
    }
    setSurveyFormId(formId) {
        this.emit({ survey: { stateName: this.state.survey.stateName, formId } });
    }
    setSurveyStateName(stateName) {
        this.emit({ survey: { formId: this.state.survey.formId, stateName } });
    }
}
FlagService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlagService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
var SurveyStateName;
(function (SurveyStateName) {
    SurveyStateName[SurveyStateName["formDataViw"] = 0] = "formDataViw";
    SurveyStateName[SurveyStateName["mapView"] = 1] = "mapView";
})(SurveyStateName || (SurveyStateName = {}));
;
;

/**
 * Generated bundle index. Do not edit.
 */

export { AlertMessageService, ApiService, DataPassThroughSidebar, DateTimeService, EventEmitterService, FlagService, Get, RemoveController, SidebarBackdrop, SidebarService, SidebarWidth, StateController, SurveyStateName, action$, dispatch };
//# sourceMappingURL=streamstech-ui-sdk-services.mjs.map
