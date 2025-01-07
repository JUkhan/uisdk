import { ChangeDetectorRef, EventEmitter, OnInit, OnDestroy, AfterViewInit, TemplateRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColGroupDef, GridReadyEvent, GetRowIdFunc, GridOptions, RowModelType } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ToolbarButton } from '../interfaces/toolbar-action';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ResourceModel } from '../set-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService, DateTimeService, EventEmitterService, AlertMessageService, ApiService } from '@streamstech/ui-sdk/services';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import * as i0 from "@angular/core";
export declare class StlGridComponent implements OnInit, AfterViewInit, OnDestroy {
    private changeDetector;
    private constant;
    private apiService;
    private activatedRoute;
    private eventEmitterService;
    private messageService;
    private dateTimeService;
    private dialog;
    private sidebarService;
    columnDefs: ColDef[];
    defaultColDef: ColDef;
    defaultColGroupDef: ColGroupDef | undefined;
    rowData: Observable<any[]>;
    gridReady: EventEmitter<MneGrid>;
    agGrid: AgGridAngular;
    model: string | undefined;
    actionsCol: ColDef | undefined;
    pageSize: number;
    gridOptions: GridOptions;
    rowModelType: RowModelType;
    formTitle: string;
    title: string;
    downLoadPdfEnabled: boolean;
    downLoadCsvEnabled: boolean;
    downLoadExcelEnabled: boolean;
    downLoadJpgEnabled: boolean;
    showDownLoadButton: boolean;
    showColumnsButton: boolean;
    showSearchButton: boolean;
    toolbarButtons: ToolbarButton[];
    stlFormContainer: TemplateRef<any>;
    formTemplate: TemplateRef<any>;
    toolbarTemplate: TemplateRef<any>;
    haveAdditionalFormFields: boolean;
    buttonPermissions: string[];
    showCreateButton: boolean;
    permittedActionsPrefix: string;
    strictlyHideOrShowCreateButton: boolean;
    formSelector: string;
    selectedIdsEmitter: EventEmitter<any>;
    selectedRowDataEmitter: EventEmitter<any>;
    createDataEmitter: EventEmitter<any>;
    saveOrCancelEmitter: EventEmitter<any>;
    customFormInfo: any;
    inputComponents: string[];
    tableConfig: any[];
    showBackButton: boolean;
    backHandler: EventEmitter<any>;
    tableName: string;
    searchBoxVisibility: boolean;
    searchInputValue: string;
    sliderWidth: number;
    showFilter: boolean;
    invokingUrlList: string[];
    resourceStorage: {
        [key: string]: ResourceModel[];
    };
    inputFormTitle: string;
    formRowData: any;
    private destroy$;
    private isDataAddModeOn;
    constructor(changeDetector: ChangeDetectorRef, constant: ConstantService, apiService: ApiService, activatedRoute: ActivatedRoute, eventEmitterService: EventEmitterService, messageService: AlertMessageService, dateTimeService: DateTimeService, dialog: MatDialog, sidebarService: SidebarService);
    getRowId: GetRowIdFunc;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onGridReady(params: GridReadyEvent): void;
    injectPageSizeElm(): void;
    detectChanges(): void;
    emitCreateEvent(): void;
    openDialog(): any;
    openColumnsDialog(event: MouseEvent): void;
    canDeactivate(): boolean | Promise<boolean>;
    toggleSearchBox(): void;
    applySearch(ev: any): void;
    formCancel(): void;
    receiveComponentData(data: any): void;
    closeSidebar(): void;
    manualFormData(data: any): void;
    goBack(): void;
    private openSidebar;
    private deleteRow;
    private loadConfig;
    private getTableConfig;
    private initializeTable;
    private mapCol;
    private addActionsCol;
    private setCrudActions;
    private setPermittedActions;
    private setMultiOptionValue;
    private hasAnotherDataSource;
    private isDateType;
    private getDataSource;
    private getPayload;
    updateRowCount(count: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StlGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StlGridComponent, "stl-grid", never, { "columnDefs": "columnDefs"; "defaultColDef": "defaultColDef"; "defaultColGroupDef": "defaultColGroupDef"; "rowData": "rowData"; "model": "model"; "actionsCol": "actionsCol"; "pageSize": "pageSize"; "gridOptions": "gridOptions"; "rowModelType": "rowModelType"; "formTitle": "formTitle"; "title": "title"; "downLoadPdfEnabled": "downLoadPdfEnabled"; "downLoadCsvEnabled": "downLoadCsvEnabled"; "downLoadExcelEnabled": "downLoadExcelEnabled"; "downLoadJpgEnabled": "downLoadJpgEnabled"; "showDownLoadButton": "showDownLoadButton"; "showColumnsButton": "showColumnsButton"; "showSearchButton": "showSearchButton"; "toolbarButtons": "toolbarButtons"; "formTemplate": "formTemplate"; "toolbarTemplate": "toolbarTemplate"; "haveAdditionalFormFields": "haveAdditionalFormFields"; "buttonPermissions": "buttonPermissions"; "showCreateButton": "showCreateButton"; "permittedActionsPrefix": "permittedActionsPrefix"; "strictlyHideOrShowCreateButton": "strictlyHideOrShowCreateButton"; "formSelector": "formSelector"; "customFormInfo": "customFormInfo"; "inputComponents": "inputComponents"; "tableConfig": "tableConfig"; "showBackButton": "showBackButton"; "tableName": "tableName"; "getRowId": "getRowId"; }, { "gridReady": "gridReady"; "selectedIdsEmitter": "selectedIdsEmitter"; "selectedRowDataEmitter": "selectedRowDataEmitter"; "createDataEmitter": "createDataEmitter"; "saveOrCancelEmitter": "saveOrCancelEmitter"; "backHandler": "backHandler"; }, never, never, false, never>;
}
export interface MneGrid extends AgGridAngular {
    mutateTableConfig: (config: any[]) => any[];
    beforeSubmit: (formData: any) => any;
    sidebarOpening: () => void;
    mutateColDefs: (config: ColDef[]) => ColDef[];
    sidebarInstance: MatSidenav;
    stlGrid: StlGridComponent;
}
export declare function getCrudUrl(routingKey: string, apiType: string, operationType: string, id?: string): string;
