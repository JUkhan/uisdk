import { ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Action } from './state';
import * as i0 from "@angular/core";
export declare class SidebarService {
    #private;
    get drawer(): MatSidenav;
    get sidebarContainerRef(): ViewContainerRef;
    set sidebarWidth(width: number);
    set isBackdropOn(value: boolean);
    addDrawer(drawer: MatSidenav, container: ViewContainerRef): void;
    open(): void;
    close(): void;
    setData(data: any, key?: string): void;
    getData(key?: string): Observable<any>;
    clearData(): void;
    openTableSidebarWithDynamicComponent(componentData: DynamicSidebarComponentData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidebarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SidebarService>;
}
export declare class SidebarWidth implements Action {
    width: number;
    type: any;
    constructor(width: number);
}
export declare class DataPassThroughSidebar implements Action {
    data: any;
    type: any;
    constructor(data: any, type: any);
}
export declare class SidebarBackdrop implements Action {
    isBackdropOn: boolean;
    type: any;
    constructor(isBackdropOn: boolean);
}
export interface DynamicSidebarComponentData {
    componentRef: any;
    rowData: any;
}
