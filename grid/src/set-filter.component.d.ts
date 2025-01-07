import { OnDestroy } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Action } from '@streamstech/ui-sdk/services';
import * as i0 from "@angular/core";
export declare class SetFilterComponent implements IFilterAngularComp, OnDestroy {
    params: IFilterParams;
    year: string;
    uniqueValues: ResourceModel[];
    allChecked: boolean;
    search: FormControl<string | null>;
    sub: Subscription;
    private destroy$;
    constructor();
    agInit(params: any): void;
    updateAllChecked(): void;
    setAll(completed: boolean): void;
    someChecked(): boolean;
    isFilterActive(): boolean;
    doesFilterPass(params: IDoesFilterPassParams): boolean;
    getModel(): string[];
    setModel(model: any): void;
    updateFilter(): void;
    resetAll(): void;
    ngOnDestroy(): void;
    private getColumnValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<SetFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SetFilterComponent, "grid-set-filter", never, {}, {}, never, never, false, never>;
}
export interface ResourceModel {
    value: any;
    label: any;
    checked: boolean;
}
export declare class RequestForResourceData implements Action {
    resourceKey: string;
    search: string;
    type: any;
    constructor(resourceKey: string, search: string);
}
export declare class ReceivingResourceData implements Action {
    resourceKey: string;
    data: ResourceModel[];
    type: any;
    constructor(resourceKey: string, data: ResourceModel[]);
}
