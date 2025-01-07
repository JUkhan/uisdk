import { Component, EventEmitter, Input, Output, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, forkJoin, fromEvent, takeUntil } from 'rxjs';
import { ActionComponent, DeleteAction, EditAction } from '../action.component';
//import { FuseConfirmationService } from '@streamstech/ui-sdk/fuse/services';
import { SetFilterComponent, RequestForResourceData, ReceivingResourceData } from '../set-filter.component';
import { CellRendererComponent } from '../cell.renderer.component';
import { toTitleCaseModel, toSnakeCase, toSnakeCaseModel, toTitleCase } from '../case-conversion';
import { ColumnSelectorComponent } from '../column-selector/column-selector.component';
import { action$, dispatch } from '@streamstech/ui-sdk/services';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import * as i0 from "@angular/core";
import * as i1 from "@streamstech/ui-sdk/constants";
import * as i2 from "@streamstech/ui-sdk/services";
import * as i3 from "@angular/router";
import * as i4 from "@angular/material/dialog";
export class StlGridComponent {
    constructor(changeDetector, constant, apiService, activatedRoute, eventEmitterService, messageService, dateTimeService, 
    //private _fuseConfirmationService: FuseConfirmationService,
    dialog, sidebarService) {
        this.changeDetector = changeDetector;
        this.constant = constant;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this.eventEmitterService = eventEmitterService;
        this.messageService = messageService;
        this.dateTimeService = dateTimeService;
        this.dialog = dialog;
        this.sidebarService = sidebarService;
        this.columnDefs = [];
        this.defaultColDef = {
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 150,
            flex: 1
        };
        //@ts-ignore
        this.rowData = null;
        this.gridReady = new EventEmitter();
        this.pageSize = 20;
        this.gridOptions = {
            animateRows: true,
            pagination: true,
            cacheBlockSize: this.pageSize,
            suppressServerSideInfiniteScroll: true,
            paginationPageSize: this.pageSize,
            enableCellChangeFlash: true
        };
        this.rowModelType = 'infinite';
        this.formTitle = '';
        this.downLoadPdfEnabled = true;
        this.downLoadCsvEnabled = true;
        this.downLoadExcelEnabled = false;
        this.downLoadJpgEnabled = false;
        this.showDownLoadButton = true;
        this.showColumnsButton = true;
        this.showSearchButton = false;
        //@ts-ignore
        this.toolbarButtons = [];
        this.haveAdditionalFormFields = false;
        this.buttonPermissions = [];
        this.showCreateButton = true;
        this.strictlyHideOrShowCreateButton = false;
        //@ViewChild(StlFormComponent) stlFormComponent: StlFormComponent;
        this.selectedIdsEmitter = new EventEmitter();
        this.selectedRowDataEmitter = new EventEmitter();
        this.createDataEmitter = new EventEmitter();
        this.saveOrCancelEmitter = new EventEmitter();
        this.inputComponents = [];
        this.tableConfig = [];
        this.showBackButton = false;
        this.backHandler = new EventEmitter();
        this.tableName = '';
        //@ViewChild('tableContent') tableContent: ElementRef<HTMLElement>;
        this.searchBoxVisibility = false;
        this.searchInputValue = '';
        this.sliderWidth = 45;
        this.showFilter = false;
        this.invokingUrlList = [];
        this.resourceStorage = {};
        this.inputFormTitle = '';
        this.formRowData = [];
        this.destroy$ = new Subject();
        this.isDataAddModeOn = false;
        this.getRowId = (params) => params.data.id;
        this.mapCol = (acc, it) => {
            if (it.isCrudButtons || it.name === 'Crud-Buttons' || !it.label) {
                return acc;
            }
            if (!(it.list && it.list.hidden)) {
                const col = { field: toSnakeCase(it.name), headerName: it.label, filter: SetFilterComponent, filterParams: { tableName: this.model, columnName: it.name } };
                if (this.hasAnotherDataSource(it)) {
                    col.cellRenderer = (params) => {
                        const find = (this.resourceStorage[params.resourceKey] ?? []).find(el => el.value === params.value);
                        return find ? find.label : '';
                    };
                    col.cellRendererParams = { resourceKey: it.list.optionSource };
                }
                else if (this.isDateType(it)) {
                    col.cellRenderer = (params) => {
                        if (!params.value || params.value === '0001-01-01T00:00:00') {
                            return '';
                        }
                        return this.dateTimeService.formatDate(params.value);
                    };
                }
                else if (it.list && it.list.cellTemplate) {
                    col.cellRenderer = CellRendererComponent;
                    col.cellRendererParams = { templateName: it.list.cellTemplate };
                }
                if (it.list && it.list.width) {
                    col.flex = 0;
                    col.width = it.list.width;
                }
                acc.push(col);
            }
            return acc;
        };
    }
    ngOnInit() {
        if (this.tableConfig.length === 0) {
            this.loadConfig();
        }
        action$.isA(RequestForResourceData)
            .pipe(takeUntil(this.destroy$)).subscribe((req) => {
            if (!this.resourceStorage[req.resourceKey]) {
                return;
            }
            dispatch(new ReceivingResourceData(req.resourceKey, this.resourceStorage[req.resourceKey].filter(el => el.label.toLowerCase().includes(req.search))));
        });
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onGridReady(params) {
        const mneGrid = this.agGrid;
        mneGrid.stlGrid = this;
        if (this.rowModelType === 'infinite') {
            params.api.setDatasource(this.getDataSource());
        }
        this.injectPageSizeElm();
        this.gridReady.emit(mneGrid);
    }
    injectPageSizeElm() {
        const pageSize = document.createElement('span');
        pageSize.classList.add('ag-paging-page-size');
        pageSize.innerHTML = `<span class="ag-label">Page Size</span><select title="" name="pageSize" class="pageSize"><option value="10">10</option>
        <option selected value="20">20</option><option value="50">50</option><option value="100">100</option></select>`;
        /*this.tableContent.nativeElement.querySelector('.ag-paging-panel').prepend(pageSize);
        pageSize.querySelector('.pageSize').addEventListener('change', (el: any) => {
            this.agGrid.api.paginationSetPageSize(+el.target.value);
            this.agGrid.api.paginationGoToPage(0);
        });*/
    }
    detectChanges() {
        this.changeDetector.detectChanges();
    }
    emitCreateEvent() {
        this.openSidebar();
        this.isDataAddModeOn = true;
        this.inputFormTitle = 'New ' + this.formTitle;
        this.formRowData = {};
        this.createDataEmitter.emit();
    }
    openDialog() {
        /*return this._fuseConfirmationService.open({
            title: ConstantService.Message.INCOMPLETE_TASK_TITLE,
            message: ConstantService.Message.INCOMPLETE_TASK_WARNING_MESSAGE,
            // message: `Are you sure you want to delete this ${this.row.model}?`,
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Yes',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'No',
                },
            },
            dismissible: true,
        });*/
    }
    openColumnsDialog(event) {
        const clickedButton = new ElementRef(event.currentTarget);
        const dialogRef = this.dialog.open(ColumnSelectorComponent, {
            data: {
                trigger: clickedButton,
                //@ts-ignore
                columnDefs: this.agGrid.api.getColumnDefs().map((it) => ({ field: it.field, headerName: it.headerName || toTitleCase(it.field, ' '), visible: !it.hide })),
                callback: (arr, flag) => this.agGrid.columnApi.setColumnsVisible(arr, flag),
                scrollEvent: fromEvent(document, 'scroll')
            },
        });
        dialogRef.afterClosed().subscribe();
    }
    canDeactivate() {
        return false;
        /*if (this.isDataAddModeOn === true) {
            return this.openDialog()
                .afterClosed()
                .pipe(
                    map((res: string) => res === 'confirmed')
                )
                .toPromise();
        } else {
            return true;
        }*/
    }
    toggleSearchBox() {
        this.searchBoxVisibility = !this.searchBoxVisibility;
        this.searchInputValue = '';
        this.agGrid.api.setQuickFilter(this.searchInputValue);
    }
    applySearch(ev) {
        this.agGrid.api.setQuickFilter(this.searchInputValue);
    }
    formCancel() {
        this.closeSidebar();
        this.isDataAddModeOn = false;
        this.saveOrCancelEmitter.emit();
    }
    receiveComponentData(data) {
        const operationKey = data.Id
            ? ConstantService.OperationType.UPDATE
            : ConstantService.OperationType.INSERT;
        if (!data.Id) {
            delete data['Id'];
        }
        if (this.model === 'User') {
            data.ClientUrl = window.location.protocol + '//' + window.location.host;
        }
        const grid = this.agGrid;
        if (grid.beforeSubmit) {
            data = grid.beforeSubmit(data);
        }
        this.apiService
            .post(getCrudUrl(this.model, ConstantService.ApiType.CRUD, operationKey), data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (res) => {
                if (!res.isSuccess) {
                    this.messageService.showErrorMessage(res.message);
                }
                else {
                    this.closeSidebar();
                    this.saveOrCancelEmitter.emit();
                    this.isDataAddModeOn = false;
                    this.messageService.showSuccessMessage();
                    if (operationKey === ConstantService.OperationType.INSERT) {
                        this.updateRowCount(1);
                    }
                    else {
                        const record = toSnakeCaseModel(res.data);
                        const rowNode = this.agGrid.api.getRowNode(record.id);
                        rowNode?.updateData(record);
                        setTimeout(() => {
                            rowNode?.setData(record);
                        }, 100);
                    }
                }
            },
            error: (e) => {
                this.messageService.showError();
                console.error(e);
            }
        });
    }
    closeSidebar() {
        this.sidebarService.close();
    }
    manualFormData(data) {
        this.isDataAddModeOn = false;
        this.saveOrCancelEmitter.emit();
        this.initializeTable();
    }
    goBack() {
        this.backHandler.emit();
    }
    openSidebar() {
        const grid = this.agGrid;
        if (grid.sidebarOpening) {
            grid.sidebarOpening();
        }
        this.sidebarService.sidebarWidth = 45;
        this.sidebarService.sidebarContainerRef.clear();
        this.sidebarService.sidebarContainerRef.createEmbeddedView(this.formTemplate || this.stlFormContainer);
        this.sidebarService.open();
    }
    deleteRow(data) {
        this.apiService
            .post(getCrudUrl(this.model, ConstantService.ApiType.CRUD, ConstantService.OperationType.DELETE, data.Id), data.Id)
            .subscribe({
            next: (res) => {
                if (!res.isSuccess) {
                    this.messageService.showErrorMessage(res.message);
                }
                else {
                    this.updateRowCount(-1);
                    this.eventEmitterService.emitClickEvent(data.Id);
                    this.messageService.showDeleteMessage();
                }
            },
            error: (error) => {
                console.error('There was an error!', error);
            },
        });
    }
    loadConfig() {
        if (!this.model) {
            this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe({
                next: (res) => {
                    this.model = res.model;
                    if (!this.model) {
                        return;
                    }
                    this.title = res.title;
                    this.showFilter = res.showFilter;
                    this.haveAdditionalFormFields = res.haveAdditionalFormFields
                        ? true
                        : false;
                    if (res.actionsCol) {
                        this.actionsCol = res.actionsCol;
                    }
                    this.initializeTable();
                    this.formTitle = res.formTitle;
                    this.inputComponents = res.inputComponents;
                    this.buttonPermissions = res.buttonPermissions
                        ? res.buttonPermissions
                        : [];
                    this.formSelector = res.formSelector;
                    this.customFormInfo = res.customFormInfo;
                    this.showCreateButton =
                        res.showCreateButton === undefined
                            ? true
                            : res.showCreateButton;
                    this.permittedActionsPrefix = res.permittedActionsPrefix
                        ? res.permittedActionsPrefix
                        : '';
                    this.strictlyHideOrShowCreateButton =
                        res.strictlyHideOrShowCreateButton === undefined
                            ? false
                            : res.strictlyHideOrShowCreateButton;
                    this.setPermittedActions();
                },
                error: (err) => {
                    console.log(err.message);
                },
                complete: () => { },
            });
        }
        else {
            this.setPermittedActions();
            this.initializeTable();
        }
    }
    getTableConfig() {
        return this.apiService
            .get(getCrudUrl(this.model, this.haveAdditionalFormFields
            ? ConstantService.ApiType.DYNAMIC_CONFIG
            : ConstantService.ApiType.CONFIG, ConstantService.OperationType.GET));
    }
    initializeTable() {
        if (!this.model) {
            return;
        }
        this.getTableConfig()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (configs) => {
                this.tableConfig = configs;
                const grid = this.agGrid;
                if (grid.mutateTableConfig) {
                    this.tableConfig = grid.mutateTableConfig(this.tableConfig);
                }
                let cols = configs.reduce(this.mapCol, []);
                const customButtons = configs.find(it => it.isCrudButtons);
                cols = this.addActionsCol(cols, customButtons);
                if (grid.mutateColDefs) {
                    cols = grid.mutateColDefs(cols);
                }
                this.columnDefs = cols;
                this.setMultiOptionValue();
            },
            error: (e) => console.error(e)
        });
    }
    addActionsCol(columnDefs, config) {
        if (!this.actionsCol) {
            const col = {
                sortable: false,
                filter: false,
                resizable: false,
                flex: 1, field: 'id',
                headerName: 'Actions',
                cellRenderer: ActionComponent,
                cellRendererParams: {}
            };
            this.setCrudActions(col, config);
            columnDefs.push(col);
            return columnDefs;
        }
        else {
            if (!this.actionsCol.field) {
                this.actionsCol.field = 'id';
            }
            this.setCrudActions(this.actionsCol, config);
            columnDefs.push(this.actionsCol);
        }
        return columnDefs;
    }
    setCrudActions(col, config) {
        if (!col.cellRendererParams) {
            col.cellRendererParams = {};
        }
        col.cellRendererParams.hasEditPermission = this.buttonPermissions.includes('edit');
        col.cellRendererParams.hasDeletePermission = this.buttonPermissions.includes('delete');
        col.cellRendererParams.crudEdit = (data) => {
            data = toTitleCaseModel(data);
            this.inputFormTitle = 'Edit ' + this.formTitle;
            this.formRowData = Object.assign({}, data);
            this.openSidebar();
            dispatch(new EditAction(this.model, data));
        };
        col.cellRendererParams.crudDelete = (data) => {
            data = toTitleCaseModel(data);
            this.deleteRow(data);
            dispatch(new DeleteAction(this.model, data));
        };
        col.cellRendererParams.customButtons = [];
        if (config) {
            col.cellRendererParams.customButtons = config.list.customButtons;
        }
    }
    setPermittedActions() {
        this.constant.permittedAction$.subscribe({
            next: (res) => {
                if (res.length && this.permittedActionsPrefix) {
                    if (!this.strictlyHideOrShowCreateButton) {
                        //we will strictly hide or shown the add button if strictlyHideOrShowCreateButton = true even if there is a permission
                        this.showCreateButton = res.includes(this.permittedActionsPrefix + '_create');
                    }
                    if (res.includes(this.permittedActionsPrefix + '_update')) {
                        if (!this.buttonPermissions.includes('edit')) {
                            this.buttonPermissions.push('edit');
                        }
                    }
                    if (res.includes(this.permittedActionsPrefix + '_delete')) {
                        if (!this.buttonPermissions.includes('delete')) {
                            this.buttonPermissions.push('delete');
                        }
                    }
                }
                else if (res.length && this.model) {
                    if (!this.strictlyHideOrShowCreateButton) {
                        //we will strictly hide or shown the add button if strictlyHideOrShowCreateButton = true even if there is a permission
                        this.showCreateButton = res.includes(this.model + '_create');
                    }
                    if (res.includes(this.model + '_update')) {
                        if (!this.buttonPermissions.includes('edit')) {
                            this.buttonPermissions.push('edit');
                        }
                    }
                    if (res.includes(this.model + '_delete')) {
                        if (!this.buttonPermissions.includes('delete')) {
                            this.buttonPermissions.push('delete');
                        }
                    }
                }
            },
            error: (e) => {
                console.log(e);
            },
        });
    }
    setMultiOptionValue() {
        const observables = [];
        this.invokingUrlList = [];
        this.tableConfig?.forEach((element) => {
            if (this.hasAnotherDataSource(element)) {
                if (!this.invokingUrlList.includes(element.list.optionSource)) {
                    this.invokingUrlList.push(element.list.optionSource);
                    const observable = this.apiService
                        .get(element.list.optionSource)
                        .pipe(takeUntil(this.destroy$));
                    observables.push(observable);
                }
            }
        });
        if (observables.length > 0) {
            forkJoin(observables).subscribe((responses) => {
                responses.forEach((res, index) => {
                    const optionSource = this.invokingUrlList[index];
                    this.resourceStorage[optionSource] = res;
                });
                this.agGrid.api.redrawRows();
            });
        }
    }
    hasAnotherDataSource(element) {
        return element.hasOwnProperty('list') &&
            element.list.hasOwnProperty('type') &&
            (element.list.type === 'multiOption' ||
                element.list.type === 'dropdown');
    }
    isDateType(element) {
        return (element.hasOwnProperty('edit') &&
            element.edit.hasOwnProperty('type') &&
            element.edit.type === 'datepicker');
    }
    getDataSource() {
        return {
            getRows: (params) => {
                if (!(this.model || this.tableName)) {
                    return;
                }
                this.apiService.post('Table/GetFilteredTableData', this.getPayload(params))
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                    params.successCallback(res.data, res.rowCount.total);
                });
            }
        };
    }
    ;
    getPayload(params) {
        let orderBy = '';
        if (params.sortModel.length) {
            orderBy = `${params.sortModel[0].colId} ${params.sortModel[0].sort}`;
        }
        return {
            table: `"${toSnakeCase(this.model || this.tableName)}"`,
            page: Math.floor(params.startRow / (this.gridOptions.paginationPageSize ?? 1)),
            limit: this.gridOptions.paginationPageSize,
            orderBy,
            condition: JSON.stringify(params.filterModel)
        };
    }
    updateRowCount(count) {
        const maxRowFound = this.agGrid.api.isLastRowIndexKnown();
        if (maxRowFound) {
            const rowCount = this.agGrid.api.getInfiniteRowCount() || 0;
            this.agGrid.api.setRowCount(rowCount + count);
        }
        this.agGrid.api.refreshInfiniteCache();
    }
}
StlGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.ConstantService }, { token: i2.ApiService }, { token: i3.ActivatedRoute }, { token: i2.EventEmitterService }, { token: i2.AlertMessageService }, { token: i2.DateTimeService }, { token: i4.MatDialog }, { token: i2.SidebarService }], target: i0.ɵɵFactoryTarget.Component });
StlGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: StlGridComponent, selector: "stl-grid", inputs: { columnDefs: "columnDefs", defaultColDef: "defaultColDef", defaultColGroupDef: "defaultColGroupDef", rowData: "rowData", model: "model", actionsCol: "actionsCol", pageSize: "pageSize", gridOptions: "gridOptions", rowModelType: "rowModelType", formTitle: "formTitle", title: "title", downLoadPdfEnabled: "downLoadPdfEnabled", downLoadCsvEnabled: "downLoadCsvEnabled", downLoadExcelEnabled: "downLoadExcelEnabled", downLoadJpgEnabled: "downLoadJpgEnabled", showDownLoadButton: "showDownLoadButton", showColumnsButton: "showColumnsButton", showSearchButton: "showSearchButton", toolbarButtons: "toolbarButtons", formTemplate: "formTemplate", toolbarTemplate: "toolbarTemplate", haveAdditionalFormFields: "haveAdditionalFormFields", buttonPermissions: "buttonPermissions", showCreateButton: "showCreateButton", permittedActionsPrefix: "permittedActionsPrefix", strictlyHideOrShowCreateButton: "strictlyHideOrShowCreateButton", formSelector: "formSelector", customFormInfo: "customFormInfo", inputComponents: "inputComponents", tableConfig: "tableConfig", showBackButton: "showBackButton", tableName: "tableName", getRowId: "getRowId" }, outputs: { gridReady: "gridReady", selectedIdsEmitter: "selectedIdsEmitter", selectedRowDataEmitter: "selectedRowDataEmitter", createDataEmitter: "createDataEmitter", saveOrCancelEmitter: "saveOrCancelEmitter", backHandler: "backHandler" }, viewQueries: [{ propertyName: "agGrid", first: true, predicate: AgGridAngular, descendants: true }, { propertyName: "stlFormContainer", first: true, predicate: ["stlFormContainer"], descendants: true, read: (TemplateRef) }], ngImport: i0, template: "<div>Hello world</div>", styles: [".back-button:hover{cursor:pointer}.title{position:relative;top:-5px}.header-content{border:1px solid #e2e8f0;border-radius:4px 4px 0 0;border-bottom:none}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'stl-grid', template: "<div>Hello world</div>", styles: [".back-button:hover{cursor:pointer}.title{position:relative;top:-5px}.header-content{border:1px solid #e2e8f0;border-radius:4px 4px 0 0;border-bottom:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.ConstantService }, { type: i2.ApiService }, { type: i3.ActivatedRoute }, { type: i2.EventEmitterService }, { type: i2.AlertMessageService }, { type: i2.DateTimeService }, { type: i4.MatDialog }, { type: i2.SidebarService }]; }, propDecorators: { columnDefs: [{
                type: Input
            }], defaultColDef: [{
                type: Input
            }], defaultColGroupDef: [{
                type: Input
            }], rowData: [{
                type: Input
            }], gridReady: [{
                type: Output
            }], agGrid: [{
                type: ViewChild,
                args: [AgGridAngular]
            }], model: [{
                type: Input
            }], actionsCol: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], gridOptions: [{
                type: Input
            }], rowModelType: [{
                type: Input
            }], formTitle: [{
                type: Input
            }], title: [{
                type: Input
            }], downLoadPdfEnabled: [{
                type: Input
            }], downLoadCsvEnabled: [{
                type: Input
            }], downLoadExcelEnabled: [{
                type: Input
            }], downLoadJpgEnabled: [{
                type: Input
            }], showDownLoadButton: [{
                type: Input
            }], showColumnsButton: [{
                type: Input
            }], showSearchButton: [{
                type: Input
            }], toolbarButtons: [{
                type: Input
            }], stlFormContainer: [{
                type: ViewChild,
                args: ['stlFormContainer', { read: (TemplateRef) }]
            }], formTemplate: [{
                type: Input
            }], toolbarTemplate: [{
                type: Input
            }], haveAdditionalFormFields: [{
                type: Input
            }], buttonPermissions: [{
                type: Input
            }], showCreateButton: [{
                type: Input
            }], permittedActionsPrefix: [{
                type: Input
            }], strictlyHideOrShowCreateButton: [{
                type: Input
            }], formSelector: [{
                type: Input
            }], selectedIdsEmitter: [{
                type: Output
            }], selectedRowDataEmitter: [{
                type: Output
            }], createDataEmitter: [{
                type: Output
            }], saveOrCancelEmitter: [{
                type: Output
            }], customFormInfo: [{
                type: Input
            }], inputComponents: [{
                type: Input
            }], tableConfig: [{
                type: Input
            }], showBackButton: [{
                type: Input
            }], backHandler: [{
                type: Output
            }], tableName: [{
                type: Input
            }], getRowId: [{
                type: Input
            }] } });
function buildUrl(routingKey, apiType, operationType) {
    return `${apiType}/${routingKey.charAt(0).toUpperCase() + routingKey.slice(1)}/${operationType}`;
}
export function getCrudUrl(routingKey, apiType, operationType, id) {
    return buildUrl(routingKey, apiType, operationType) + (id ? `/${id}` : '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RsLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL2dyaWQvc3JjL3N0bC1ncmlkL3N0bC1ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9ncmlkL3NyYy9zdGwtZ3JpZC9zdGwtZ3JpZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBYSxTQUFTLEVBQWlCLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBYyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBTyxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsOEVBQThFO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBaUIsTUFBTSx5QkFBeUIsQ0FBQztBQUMzSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBa0IsT0FBTyxFQUFFLFFBQVEsRUFBMEUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6SixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStC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ImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWdHcmlkQW5ndWxhciB9IGZyb20gJ2FnLWdyaWQtYW5ndWxhcic7XHJcbmltcG9ydCB7IENvbERlZiwgQ29sR3JvdXBEZWYsIEdyaWRSZWFkeUV2ZW50LCBHZXRSb3dJZEZ1bmMsIEdyaWRPcHRpb25zLCBSb3dNb2RlbFR5cGUsIElEYXRhc291cmNlLCBJR2V0Um93c1BhcmFtcyB9IGZyb20gJ2FnLWdyaWQtY29tbXVuaXR5JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgZm9ya0pvaW4sIGZyb21FdmVudCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVG9vbGJhckJ1dHRvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvdG9vbGJhci1hY3Rpb24nO1xyXG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aW9uQ29tcG9uZW50LCBEZWxldGVBY3Rpb24sIEVkaXRBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb24uY29tcG9uZW50JztcclxuLy9pbXBvcnQgeyBGdXNlQ29uZmlybWF0aW9uU2VydmljZSB9IGZyb20gJ0BzdHJlYW1zdGVjaC91aS1zZGsvZnVzZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFNldEZpbHRlckNvbXBvbmVudCwgUmVxdWVzdEZvclJlc291cmNlRGF0YSwgUmVjZWl2aW5nUmVzb3VyY2VEYXRhLCBSZXNvdXJjZU1vZGVsIH0gZnJvbSAnLi4vc2V0LWZpbHRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDZWxsUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi9jZWxsLnJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHRvVGl0bGVDYXNlTW9kZWwsIHRvU25ha2VDYXNlLCB0b1NuYWtlQ2FzZU1vZGVsLCB0b1RpdGxlQ2FzZSB9IGZyb20gJy4uL2Nhc2UtY29udmVyc2lvbic7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IENvbHVtblNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY29sdW1uLXNlbGVjdG9yL2NvbHVtbi1zZWxlY3Rvci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWRlYmFyU2VydmljZSwgYWN0aW9uJCwgZGlzcGF0Y2gsIERhdGVUaW1lU2VydmljZSwgRXZlbnRFbWl0dGVyU2VydmljZSwgQWxlcnRNZXNzYWdlU2VydmljZSwgQXBpU2VydmljZSAgfSBmcm9tICdAc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgQ29uc3RhbnRTZXJ2aWNlIH0gZnJvbSAnQHN0cmVhbXN0ZWNoL3VpLXNkay9jb25zdGFudHMnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGwtZ3JpZCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3RsLWdyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RsLWdyaWQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RsR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBjb2x1bW5EZWZzOiBDb2xEZWZbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgZGVmYXVsdENvbERlZjogQ29sRGVmID0ge1xyXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICByZXNpemFibGU6IHRydWUsXHJcbiAgICAgICAgbWluV2lkdGg6IDE1MCxcclxuICAgICAgICBmbGV4OiAxXHJcbiAgICB9O1xyXG4gICAgQElucHV0KCkgZGVmYXVsdENvbEdyb3VwRGVmOiBDb2xHcm91cERlZiB8IHVuZGVmaW5lZDtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgQElucHV0KCkgcm93RGF0YTogT2JzZXJ2YWJsZTxhbnlbXT4gPSBudWxsO1xyXG4gICAgQE91dHB1dCgpIGdyaWRSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8TW5lR3JpZD4oKTtcclxuICAgIEBWaWV3Q2hpbGQoQWdHcmlkQW5ndWxhcikgYWdHcmlkITogQWdHcmlkQW5ndWxhcjtcclxuICAgIEBJbnB1dCgpIG1vZGVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBASW5wdXQoKSBhY3Rpb25zQ29sOiBDb2xEZWYgfCB1bmRlZmluZWQ7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZSA9IDIwO1xyXG4gICAgQElucHV0KCkgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zID0ge1xyXG4gICAgICAgIGFuaW1hdGVSb3dzOiB0cnVlLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHRydWUsXHJcbiAgICAgICAgY2FjaGVCbG9ja1NpemU6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgICAgc3VwcHJlc3NTZXJ2ZXJTaWRlSW5maW5pdGVTY3JvbGw6IHRydWUsXHJcbiAgICAgICAgcGFnaW5hdGlvblBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICAgIGVuYWJsZUNlbGxDaGFuZ2VGbGFzaDogdHJ1ZVxyXG4gICAgfTtcclxuICAgIEBJbnB1dCgpIHJvd01vZGVsVHlwZTogUm93TW9kZWxUeXBlID0gJ2luZmluaXRlJztcclxuICAgIEBJbnB1dCgpIGZvcm1UaXRsZTogc3RyaW5nID0gJyc7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkb3duTG9hZFBkZkVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgZG93bkxvYWRDc3ZFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGRvd25Mb2FkRXhjZWxFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkb3duTG9hZEpwZ0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHNob3dEb3duTG9hZEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBzaG93Q29sdW1uc0J1dHRvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBzaG93U2VhcmNoQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIEBJbnB1dCgpIHRvb2xiYXJCdXR0b25zOiBUb29sYmFyQnV0dG9uW10gPSBbXTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgQFZpZXdDaGlsZCgnc3RsRm9ybUNvbnRhaW5lcicsIHsgcmVhZDogVGVtcGxhdGVSZWY8YW55PiB9KSBzdGxGb3JtQ29udGFpbmVyOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBASW5wdXQoKSBmb3JtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIEBJbnB1dCgpIHRvb2xiYXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIGhhdmVBZGRpdGlvbmFsRm9ybUZpZWxkczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgYnV0dG9uUGVybWlzc2lvbnM6IHN0cmluZ1tdID0gW107XHJcbiAgICBASW5wdXQoKSBzaG93Q3JlYXRlQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgQElucHV0KCkgcGVybWl0dGVkQWN0aW9uc1ByZWZpeDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgc3RyaWN0bHlIaWRlT3JTaG93Q3JlYXRlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIEBJbnB1dCgpIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgLy9AVmlld0NoaWxkKFN0bEZvcm1Db21wb25lbnQpIHN0bEZvcm1Db21wb25lbnQ6IFN0bEZvcm1Db21wb25lbnQ7XHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRJZHNFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkUm93RGF0YUVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY3JlYXRlRGF0YUVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgc2F2ZU9yQ2FuY2VsRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgQElucHV0KCkgY3VzdG9tRm9ybUluZm87XHJcbiAgICBASW5wdXQoKSBpbnB1dENvbXBvbmVudHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBASW5wdXQoKSB0YWJsZUNvbmZpZzogYW55W10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHNob3dCYWNrQnV0dG9uID0gZmFsc2U7XHJcbiAgICBAT3V0cHV0KCkgYmFja0hhbmRsZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBASW5wdXQoKSB0YWJsZU5hbWU9Jyc7XHJcbiAgICAvL0BWaWV3Q2hpbGQoJ3RhYmxlQ29udGVudCcpIHRhYmxlQ29udGVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcbiAgICBzZWFyY2hCb3hWaXNpYmlsaXR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzZWFyY2hJbnB1dFZhbHVlID0gJyc7XHJcbiAgICBzbGlkZXJXaWR0aDogbnVtYmVyID0gNDU7XHJcbiAgICBzaG93RmlsdGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpbnZva2luZ1VybExpc3Q6IHN0cmluZ1tdID0gW107XHJcbiAgICByZXNvdXJjZVN0b3JhZ2U6IHsgW2tleTogc3RyaW5nXTogUmVzb3VyY2VNb2RlbFtdIH0gPSB7fTtcclxuICAgIGlucHV0Rm9ybVRpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIGZvcm1Sb3dEYXRhOiBhbnkgPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIHByaXZhdGUgaXNEYXRhQWRkTW9kZU9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIGNvbnN0YW50OiBDb25zdGFudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBBbGVydE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZGF0ZVRpbWVTZXJ2aWNlOiBEYXRlVGltZVNlcnZpY2UsXHJcbiAgICAgICAgLy9wcml2YXRlIF9mdXNlQ29uZmlybWF0aW9uU2VydmljZTogRnVzZUNvbmZpcm1hdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgICAgICBwcml2YXRlIHNpZGViYXJTZXJ2aWNlOiBTaWRlYmFyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0Um93SWQ6IEdldFJvd0lkRnVuYyA9IChwYXJhbXM6IGFueSkgPT4gcGFyYW1zLmRhdGEuaWQ7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YWJsZUNvbmZpZy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjdGlvbiQuaXNBKFJlcXVlc3RGb3JSZXNvdXJjZURhdGEpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChyZXEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZXNvdXJjZVN0b3JhZ2VbcmVxLnJlc291cmNlS2V5XSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5ldyBSZWNlaXZpbmdSZXNvdXJjZURhdGEocmVxLnJlc291cmNlS2V5LCB0aGlzLnJlc291cmNlU3RvcmFnZVtyZXEucmVzb3VyY2VLZXldLmZpbHRlcihlbCA9PiBlbC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHJlcS5zZWFyY2gpKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIG9uR3JpZFJlYWR5KHBhcmFtczogR3JpZFJlYWR5RXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtbmVHcmlkID0gdGhpcy5hZ0dyaWQgYXMgTW5lR3JpZDtcclxuICAgICAgICBtbmVHcmlkLnN0bEdyaWQgPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucm93TW9kZWxUeXBlID09PSAnaW5maW5pdGUnKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5hcGkuc2V0RGF0YXNvdXJjZSh0aGlzLmdldERhdGFTb3VyY2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5qZWN0UGFnZVNpemVFbG0oKTtcclxuICAgICAgICB0aGlzLmdyaWRSZWFkeS5lbWl0KG1uZUdyaWQpO1xyXG4gICAgfVxyXG4gICAgaW5qZWN0UGFnZVNpemVFbG0oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGFnZVNpemU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHBhZ2VTaXplLmNsYXNzTGlzdC5hZGQoJ2FnLXBhZ2luZy1wYWdlLXNpemUnKTtcclxuICAgICAgICBwYWdlU2l6ZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJhZy1sYWJlbFwiPlBhZ2UgU2l6ZTwvc3Bhbj48c2VsZWN0IHRpdGxlPVwiXCIgbmFtZT1cInBhZ2VTaXplXCIgY2xhc3M9XCJwYWdlU2l6ZVwiPjxvcHRpb24gdmFsdWU9XCIxMFwiPjEwPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiBzZWxlY3RlZCB2YWx1ZT1cIjIwXCI+MjA8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiNTBcIj41MDwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCIxMDBcIj4xMDA8L29wdGlvbj48L3NlbGVjdD5gO1xyXG4gICAgICAgIC8qdGhpcy50YWJsZUNvbnRlbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWctcGFnaW5nLXBhbmVsJykucHJlcGVuZChwYWdlU2l6ZSk7XHJcbiAgICAgICAgcGFnZVNpemUucXVlcnlTZWxlY3RvcignLnBhZ2VTaXplJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZ0dyaWQuYXBpLnBhZ2luYXRpb25TZXRQYWdlU2l6ZSgrZWwudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5hZ0dyaWQuYXBpLnBhZ2luYXRpb25Hb1RvUGFnZSgwKTtcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG4gICAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICAgIGVtaXRDcmVhdGVFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9wZW5TaWRlYmFyKCk7XHJcbiAgICAgICAgdGhpcy5pc0RhdGFBZGRNb2RlT24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtVGl0bGUgPSAnTmV3ICcgKyB0aGlzLmZvcm1UaXRsZTtcclxuICAgICAgICB0aGlzLmZvcm1Sb3dEYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEYXRhRW1pdHRlci5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICBvcGVuRGlhbG9nKCk6IGFueSB7XHJcbiAgICAgICAgLypyZXR1cm4gdGhpcy5fZnVzZUNvbmZpcm1hdGlvblNlcnZpY2Uub3Blbih7XHJcbiAgICAgICAgICAgIHRpdGxlOiBDb25zdGFudFNlcnZpY2UuTWVzc2FnZS5JTkNPTVBMRVRFX1RBU0tfVElUTEUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLklOQ09NUExFVEVfVEFTS19XQVJOSU5HX01FU1NBR0UsXHJcbiAgICAgICAgICAgIC8vIG1lc3NhZ2U6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgJHt0aGlzLnJvdy5tb2RlbH0/YCxcclxuICAgICAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdoZXJvaWNvbnNfb3V0bGluZTpleGNsYW1hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3dhcm4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBjb25maXJtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1llcycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3YXJuJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTm8nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlzbWlzc2libGU6IHRydWUsXHJcbiAgICAgICAgfSk7Ki9cclxuICAgIH1cclxuICAgIG9wZW5Db2x1bW5zRGlhbG9nKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2xpY2tlZEJ1dHRvbjogRWxlbWVudFJlZiA9IG5ldyBFbGVtZW50UmVmKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ29sdW1uU2VsZWN0b3JDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogY2xpY2tlZEJ1dHRvbixcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY29sdW1uRGVmczogdGhpcy5hZ0dyaWQuYXBpLmdldENvbHVtbkRlZnMoKS5tYXAoKGl0OiBhbnkpID0+ICh7IGZpZWxkOiBpdC5maWVsZCwgaGVhZGVyTmFtZTogaXQuaGVhZGVyTmFtZSB8fCB0b1RpdGxlQ2FzZShpdC5maWVsZCwgJyAnKSwgdmlzaWJsZTogIWl0LmhpZGUgfSkpLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChhcnI6IHN0cmluZ1tdLCBmbGFnOiBib29sZWFuKSA9PiB0aGlzLmFnR3JpZC5jb2x1bW5BcGkuc2V0Q29sdW1uc1Zpc2libGUoYXJyLCBmbGFnKSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbEV2ZW50OiBmcm9tRXZlbnQoZG9jdW1lbnQsICdzY3JvbGwnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGNhbkRlYWN0aXZhdGUoKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvKmlmICh0aGlzLmlzRGF0YUFkZE1vZGVPbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuRGlhbG9nKClcclxuICAgICAgICAgICAgICAgIC5hZnRlckNsb3NlZCgpXHJcbiAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICBtYXAoKHJlczogc3RyaW5nKSA9PiByZXMgPT09ICdjb25maXJtZWQnKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlU2VhcmNoQm94KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQm94VmlzaWJpbGl0eSA9ICF0aGlzLnNlYXJjaEJveFZpc2liaWxpdHk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dFZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5hZ0dyaWQuYXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoSW5wdXRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhcHBseVNlYXJjaChldjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZ0dyaWQuYXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoSW5wdXRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBmb3JtQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaWRlYmFyKCk7XHJcbiAgICAgICAgdGhpcy5pc0RhdGFBZGRNb2RlT24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNhdmVPckNhbmNlbEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgfVxyXG4gICAgcmVjZWl2ZUNvbXBvbmVudERhdGEoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9uS2V5ID0gZGF0YS5JZFxyXG4gICAgICAgICAgICA/Q29uc3RhbnRTZXJ2aWNlLk9wZXJhdGlvblR5cGUuVVBEQVRFXHJcbiAgICAgICAgICAgIDogQ29uc3RhbnRTZXJ2aWNlLk9wZXJhdGlvblR5cGUuSU5TRVJUO1xyXG4gICAgICAgIGlmICghZGF0YS5JZCkge1xyXG4gICAgICAgICAgICBkZWxldGUgZGF0YVsnSWQnXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgPT09ICdVc2VyJykge1xyXG4gICAgICAgICAgICBkYXRhLkNsaWVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuYWdHcmlkIGFzIE1uZUdyaWQ7XHJcbiAgICAgICAgaWYgKGdyaWQuYmVmb3JlU3VibWl0KSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBncmlkLmJlZm9yZVN1Ym1pdChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5wb3N0KGdldENydWRVcmwodGhpcy5tb2RlbCEsIENvbnN0YW50U2VydmljZS5BcGlUeXBlLkNSVUQsIG9wZXJhdGlvbktleSksIGRhdGEpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5pc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3JNZXNzYWdlKHJlcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2lkZWJhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVPckNhbmNlbEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGF0YUFkZE1vZGVPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dTdWNjZXNzTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uS2V5ID09PSBDb25zdGFudFNlcnZpY2UuT3BlcmF0aW9uVHlwZS5JTlNFUlQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUm93Q291bnQoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWNvcmQgPSB0b1NuYWtlQ2FzZU1vZGVsKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd05vZGUgPSB0aGlzLmFnR3JpZC5hcGkuZ2V0Um93Tm9kZShyZWNvcmQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Tm9kZT8udXBkYXRlRGF0YShyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Tm9kZT8uc2V0RGF0YShyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd0Vycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjbG9zZVNpZGViYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VydmljZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgbWFudWFsRm9ybURhdGEoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0RhdGFBZGRNb2RlT24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNhdmVPckNhbmNlbEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XHJcbiAgICB9XHJcbiAgICBnb0JhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iYWNrSGFuZGxlci5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9wZW5TaWRlYmFyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmFnR3JpZCBhcyBNbmVHcmlkO1xyXG4gICAgICAgIGlmIChncmlkLnNpZGViYXJPcGVuaW5nKSB7XHJcbiAgICAgICAgICAgIGdyaWQuc2lkZWJhck9wZW5pbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VydmljZS5zaWRlYmFyV2lkdGggPSA0NTtcclxuICAgICAgICB0aGlzLnNpZGViYXJTZXJ2aWNlLnNpZGViYXJDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnNpZGViYXJTZXJ2aWNlLnNpZGViYXJDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuZm9ybVRlbXBsYXRlIHx8IHRoaXMuc3RsRm9ybUNvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VydmljZS5vcGVuKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRlbGV0ZVJvdyhkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwaVNlcnZpY2VcclxuICAgICAgICAgICAgLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBnZXRDcnVkVXJsKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwhLFxyXG4gICAgICAgICAgICAgICAgICAgIENvbnN0YW50U2VydmljZS5BcGlUeXBlLkNSVUQsXHJcbiAgICAgICAgICAgICAgICAgICAgQ29uc3RhbnRTZXJ2aWNlLk9wZXJhdGlvblR5cGUuREVMRVRFLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuSWRcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBkYXRhLklkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5pc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3JNZXNzYWdlKHJlcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJvd0NvdW50KC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXRDbGlja0V2ZW50KGRhdGEuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dEZWxldGVNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLmRhdGEucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gcmVzLm1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gcmVzLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZpbHRlciA9IHJlcy5zaG93RmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZUFkZGl0aW9uYWxGb3JtRmllbGRzID0gcmVzLmhhdmVBZGRpdGlvbmFsRm9ybUZpZWxkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmFjdGlvbnNDb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zQ29sID0gcmVzLmFjdGlvbnNDb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtVGl0bGUgPSByZXMuZm9ybVRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRDb21wb25lbnRzID0gcmVzLmlucHV0Q29tcG9uZW50cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblBlcm1pc3Npb25zID0gcmVzLmJ1dHRvblBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVzLmJ1dHRvblBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtU2VsZWN0b3IgPSByZXMuZm9ybVNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRm9ybUluZm8gPSByZXMuY3VzdG9tRm9ybUluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3JlYXRlQnV0dG9uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNob3dDcmVhdGVCdXR0b24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJlcy5zaG93Q3JlYXRlQnV0dG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVybWl0dGVkQWN0aW9uc1ByZWZpeCA9IHJlcy5wZXJtaXR0ZWRBY3Rpb25zUHJlZml4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVzLnBlcm1pdHRlZEFjdGlvbnNQcmVmaXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmljdGx5SGlkZU9yU2hvd0NyZWF0ZUJ1dHRvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdHJpY3RseUhpZGVPclNob3dDcmVhdGVCdXR0b24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZXMuc3RyaWN0bHlIaWRlT3JTaG93Q3JlYXRlQnV0dG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVybWl0dGVkQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVybWl0dGVkQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRhYmxlQ29uZmlnKCk6IE9ic2VydmFibGU8YW55W10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBnZXRDcnVkVXJsKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwhLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZUFkZGl0aW9uYWxGb3JtRmllbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gQ29uc3RhbnRTZXJ2aWNlLkFwaVR5cGUuRFlOQU1JQ19DT05GSUdcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBDb25zdGFudFNlcnZpY2UuQXBpVHlwZS5DT05GSUcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnN0YW50U2VydmljZS5PcGVyYXRpb25UeXBlLkdFVFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIGFzIGFueTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVRhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmdldFRhYmxlQ29uZmlnKClcclxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgICAgIG5leHQ6IChjb25maWdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZUNvbmZpZyA9IGNvbmZpZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuYWdHcmlkIGFzIE1uZUdyaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQubXV0YXRlVGFibGVDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZUNvbmZpZyA9IGdyaWQubXV0YXRlVGFibGVDb25maWcodGhpcy50YWJsZUNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xzID0gY29uZmlncy5yZWR1Y2UodGhpcy5tYXBDb2wsIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21CdXR0b25zID0gY29uZmlncy5maW5kKGl0ID0+IGl0LmlzQ3J1ZEJ1dHRvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHMgPSB0aGlzLmFkZEFjdGlvbnNDb2woY29scywgY3VzdG9tQnV0dG9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQubXV0YXRlQ29sRGVmcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzID0gZ3JpZC5tdXRhdGVDb2xEZWZzKGNvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkRlZnMgPSBjb2xzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlPcHRpb25WYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZTogYW55KSA9PiBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtYXBDb2wgPSAoYWNjOiBDb2xEZWZbXSwgaXQ6IGFueSk6IENvbERlZltdID0+IHtcclxuICAgICAgICBpZiAoaXQuaXNDcnVkQnV0dG9ucyB8fCBpdC5uYW1lID09PSAnQ3J1ZC1CdXR0b25zJyB8fCAhaXQubGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoaXQubGlzdCAmJiBpdC5saXN0LmhpZGRlbikpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sOiBDb2xEZWYgPSB7IGZpZWxkOiB0b1NuYWtlQ2FzZShpdC5uYW1lKSwgaGVhZGVyTmFtZTogaXQubGFiZWwsIGZpbHRlcjogU2V0RmlsdGVyQ29tcG9uZW50LCBmaWx0ZXJQYXJhbXM6IHsgdGFibGVOYW1lOiB0aGlzLm1vZGVsLCBjb2x1bW5OYW1lOiBpdC5uYW1lIH0gfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQW5vdGhlckRhdGFTb3VyY2UoaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2wuY2VsbFJlbmRlcmVyID0gKHBhcmFtczogYW55KTogYW55ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaW5kID0gKHRoaXMucmVzb3VyY2VTdG9yYWdlW3BhcmFtcy5yZXNvdXJjZUtleV0gPz8gW10pLmZpbmQoZWwgPT4gZWwudmFsdWUgPT09IHBhcmFtcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQgPyBmaW5kLmxhYmVsIDogJyc7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29sLmNlbGxSZW5kZXJlclBhcmFtcyA9IHsgcmVzb3VyY2VLZXk6IGl0Lmxpc3Qub3B0aW9uU291cmNlIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0RhdGVUeXBlKGl0KSkge1xyXG4gICAgICAgICAgICAgICAgY29sLmNlbGxSZW5kZXJlciA9IChwYXJhbXM6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJhbXMudmFsdWUgfHwgcGFyYW1zLnZhbHVlID09PSAnMDAwMS0wMS0wMVQwMDowMDowMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZVNlcnZpY2UuZm9ybWF0RGF0ZShwYXJhbXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpdC5saXN0ICYmIGl0Lmxpc3QuY2VsbFRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2wuY2VsbFJlbmRlcmVyID0gQ2VsbFJlbmRlcmVyQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgY29sLmNlbGxSZW5kZXJlclBhcmFtcyA9IHsgdGVtcGxhdGVOYW1lOiBpdC5saXN0LmNlbGxUZW1wbGF0ZSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdC5saXN0ICYmIGl0Lmxpc3Qud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbC5mbGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbC53aWR0aCA9IGl0Lmxpc3Qud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWNjLnB1c2goY29sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGFkZEFjdGlvbnNDb2woY29sdW1uRGVmczogQ29sRGVmW10sIGNvbmZpZzogYW55KTogQ29sRGVmW10ge1xyXG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25zQ29sKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHtcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZmxleDogMSwgZmllbGQ6ICdpZCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiAnQWN0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI6IEFjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgIGNlbGxSZW5kZXJlclBhcmFtczoge31cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDcnVkQWN0aW9ucyhjb2wsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGNvbHVtbkRlZnMucHVzaChjb2wpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uRGVmcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc0NvbC5maWVsZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zQ29sLmZpZWxkID0gJ2lkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldENydWRBY3Rpb25zKHRoaXMuYWN0aW9uc0NvbCwgY29uZmlnKTtcclxuICAgICAgICAgICAgY29sdW1uRGVmcy5wdXNoKHRoaXMuYWN0aW9uc0NvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2x1bW5EZWZzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q3J1ZEFjdGlvbnMoY29sOiBDb2xEZWYsIGNvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFjb2wuY2VsbFJlbmRlcmVyUGFyYW1zKSB7IGNvbC5jZWxsUmVuZGVyZXJQYXJhbXMgPSB7fTsgfVxyXG4gICAgICAgIGNvbC5jZWxsUmVuZGVyZXJQYXJhbXMuaGFzRWRpdFBlcm1pc3Npb24gPSB0aGlzLmJ1dHRvblBlcm1pc3Npb25zLmluY2x1ZGVzKCdlZGl0Jyk7XHJcbiAgICAgICAgY29sLmNlbGxSZW5kZXJlclBhcmFtcy5oYXNEZWxldGVQZXJtaXNzaW9uID0gdGhpcy5idXR0b25QZXJtaXNzaW9ucy5pbmNsdWRlcygnZGVsZXRlJyk7XHJcbiAgICAgICAgY29sLmNlbGxSZW5kZXJlclBhcmFtcy5jcnVkRWRpdCA9IChkYXRhOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRvVGl0bGVDYXNlTW9kZWwoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtVGl0bGUgPSAnRWRpdCAnICsgdGhpcy5mb3JtVGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybVJvd0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuU2lkZWJhcigpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChuZXcgRWRpdEFjdGlvbih0aGlzLm1vZGVsLCBkYXRhKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb2wuY2VsbFJlbmRlcmVyUGFyYW1zLmNydWREZWxldGUgPSAoZGF0YTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0b1RpdGxlQ2FzZU1vZGVsKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdyhkYXRhKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2gobmV3IERlbGV0ZUFjdGlvbih0aGlzLm1vZGVsLCBkYXRhKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb2wuY2VsbFJlbmRlcmVyUGFyYW1zLmN1c3RvbUJ1dHRvbnMgPSBbXTtcclxuICAgICAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGNvbC5jZWxsUmVuZGVyZXJQYXJhbXMuY3VzdG9tQnV0dG9ucyA9IGNvbmZpZy5saXN0LmN1c3RvbUJ1dHRvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRQZXJtaXR0ZWRBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnQucGVybWl0dGVkQWN0aW9uJC5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmxlbmd0aCAmJiB0aGlzLnBlcm1pdHRlZEFjdGlvbnNQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RyaWN0bHlIaWRlT3JTaG93Q3JlYXRlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCBzdHJpY3RseSBoaWRlIG9yIHNob3duIHRoZSBhZGQgYnV0dG9uIGlmIHN0cmljdGx5SGlkZU9yU2hvd0NyZWF0ZUJ1dHRvbiA9IHRydWUgZXZlbiBpZiB0aGVyZSBpcyBhIHBlcm1pc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3JlYXRlQnV0dG9uID0gcmVzLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJtaXR0ZWRBY3Rpb25zUHJlZml4ICsgJ19jcmVhdGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmluY2x1ZGVzKHRoaXMucGVybWl0dGVkQWN0aW9uc1ByZWZpeCArICdfdXBkYXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJ1dHRvblBlcm1pc3Npb25zLmluY2x1ZGVzKCdlZGl0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uUGVybWlzc2lvbnMucHVzaCgnZWRpdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuaW5jbHVkZXModGhpcy5wZXJtaXR0ZWRBY3Rpb25zUHJlZml4ICsgJ19kZWxldGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uUGVybWlzc2lvbnMuaW5jbHVkZXMoJ2RlbGV0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblBlcm1pc3Npb25zLnB1c2goJ2RlbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMubGVuZ3RoICYmIHRoaXMubW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RyaWN0bHlIaWRlT3JTaG93Q3JlYXRlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCBzdHJpY3RseSBoaWRlIG9yIHNob3duIHRoZSBhZGQgYnV0dG9uIGlmIHN0cmljdGx5SGlkZU9yU2hvd0NyZWF0ZUJ1dHRvbiA9IHRydWUgZXZlbiBpZiB0aGVyZSBpcyBhIHBlcm1pc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3JlYXRlQnV0dG9uID0gcmVzLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbCArICdfY3JlYXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmluY2x1ZGVzKHRoaXMubW9kZWwgKyAnX3VwZGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25QZXJtaXNzaW9ucy5pbmNsdWRlcygnZWRpdCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblBlcm1pc3Npb25zLnB1c2goJ2VkaXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmluY2x1ZGVzKHRoaXMubW9kZWwgKyAnX2RlbGV0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25QZXJtaXNzaW9ucy5pbmNsdWRlcygnZGVsZXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uUGVybWlzc2lvbnMucHVzaCgnZGVsZXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aU9wdGlvblZhbHVlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW52b2tpbmdVcmxMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMudGFibGVDb25maWc/LmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQW5vdGhlckRhdGFTb3VyY2UoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbnZva2luZ1VybExpc3QuaW5jbHVkZXMoZWxlbWVudC5saXN0Lm9wdGlvblNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludm9raW5nVXJsTGlzdC5wdXNoKGVsZW1lbnQubGlzdC5vcHRpb25Tb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5hcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoZWxlbWVudC5saXN0Lm9wdGlvblNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaChvYnNlcnZhYmxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3JrSm9pbihvYnNlcnZhYmxlcykuc3Vic2NyaWJlKChyZXNwb25zZXM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZXMuZm9yRWFjaCgocmVzLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvblNvdXJjZSA9IHRoaXMuaW52b2tpbmdVcmxMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlU3RvcmFnZVtvcHRpb25Tb3VyY2VdID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnR3JpZC5hcGkucmVkcmF3Um93cygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNBbm90aGVyRGF0YVNvdXJjZShlbGVtZW50OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnbGlzdCcpICYmXHJcbiAgICAgICAgICAgIGVsZW1lbnQubGlzdC5oYXNPd25Qcm9wZXJ0eSgndHlwZScpICYmXHJcbiAgICAgICAgICAgIChlbGVtZW50Lmxpc3QudHlwZSA9PT0gJ211bHRpT3B0aW9uJyB8fFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5saXN0LnR5cGUgPT09ICdkcm9wZG93bicpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0RhdGVUeXBlKGVsZW1lbnQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIGVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2VkaXQnKSAmJlxyXG4gICAgICAgICAgICBlbGVtZW50LmVkaXQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJlxyXG4gICAgICAgICAgICBlbGVtZW50LmVkaXQudHlwZSA9PT0gJ2RhdGVwaWNrZXInXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0RGF0YVNvdXJjZSgpOiBJRGF0YXNvdXJjZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0Um93czogKHBhcmFtczogSUdldFJvd3NQYXJhbXMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCEodGhpcy5tb2RlbHx8dGhpcy50YWJsZU5hbWUpKXtyZXR1cm47fVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLnBvc3QoJ1RhYmxlL0dldEZpbHRlcmVkVGFibGVEYXRhJywgdGhpcy5nZXRQYXlsb2FkKHBhcmFtcykpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zdWNjZXNzQ2FsbGJhY2soXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5yb3dDb3VudC50b3RhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFBheWxvYWQocGFyYW1zOiBJR2V0Um93c1BhcmFtcyk6IGFueSB7XHJcbiAgICAgICAgbGV0IG9yZGVyQnkgPSAnJztcclxuICAgICAgICBpZiAocGFyYW1zLnNvcnRNb2RlbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgb3JkZXJCeSA9IGAke3BhcmFtcy5zb3J0TW9kZWxbMF0uY29sSWR9ICR7cGFyYW1zLnNvcnRNb2RlbFswXS5zb3J0fWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRhYmxlOiBgXCIke3RvU25ha2VDYXNlKHRoaXMubW9kZWx8fHRoaXMudGFibGVOYW1lKX1cImAsXHJcbiAgICAgICAgICAgIHBhZ2U6IE1hdGguZmxvb3IocGFyYW1zLnN0YXJ0Um93IC8gKHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvblBhZ2VTaXplPz8xKSksXHJcbiAgICAgICAgICAgIGxpbWl0OiB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb25QYWdlU2l6ZSxcclxuICAgICAgICAgICAgb3JkZXJCeSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBKU09OLnN0cmluZ2lmeShwYXJhbXMuZmlsdGVyTW9kZWwpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVSb3dDb3VudChjb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWF4Um93Rm91bmQgPSB0aGlzLmFnR3JpZC5hcGkuaXNMYXN0Um93SW5kZXhLbm93bigpO1xyXG4gICAgICAgIGlmIChtYXhSb3dGb3VuZCkge1xyXG4gICAgICAgICAgICBjb25zdCByb3dDb3VudCA9IHRoaXMuYWdHcmlkLmFwaS5nZXRJbmZpbml0ZVJvd0NvdW50KCkgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5hZ0dyaWQuYXBpLnNldFJvd0NvdW50KHJvd0NvdW50ICsgY291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFnR3JpZC5hcGkucmVmcmVzaEluZmluaXRlQ2FjaGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNbmVHcmlkIGV4dGVuZHMgQWdHcmlkQW5ndWxhciB7XHJcbiAgICBtdXRhdGVUYWJsZUNvbmZpZzogKGNvbmZpZzogYW55W10pID0+IGFueVtdO1xyXG4gICAgYmVmb3JlU3VibWl0OiAoZm9ybURhdGE6IGFueSkgPT4gYW55O1xyXG4gICAgc2lkZWJhck9wZW5pbmc6ICgpID0+IHZvaWQ7XHJcbiAgICBtdXRhdGVDb2xEZWZzOiAoY29uZmlnOiBDb2xEZWZbXSkgPT4gQ29sRGVmW107XHJcbiAgICBzaWRlYmFySW5zdGFuY2U6IE1hdFNpZGVuYXY7XHJcbiAgICBzdGxHcmlkOlN0bEdyaWRDb21wb25lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVXJsKHJvdXRpbmdLZXk6IHN0cmluZywgYXBpVHlwZTogc3RyaW5nLCBvcGVyYXRpb25UeXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBgJHthcGlUeXBlfS8ke1xyXG4gICAgICAgIHJvdXRpbmdLZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByb3V0aW5nS2V5LnNsaWNlKDEpXHJcbiAgICB9LyR7b3BlcmF0aW9uVHlwZX1gO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldENydWRVcmwocm91dGluZ0tleTogc3RyaW5nLCBhcGlUeXBlOiBzdHJpbmcsIG9wZXJhdGlvblR5cGU6IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBidWlsZFVybChyb3V0aW5nS2V5LCBhcGlUeXBlLCBvcGVyYXRpb25UeXBlKSArIChpZD8gYC8ke2lkfWAgOiAnJyk7XHJcbiAgfVxyXG4gICIsIjxkaXY+SGVsbG8gd29ybGQ8L2Rpdj4iXX0=