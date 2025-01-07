import * as i0 from '@angular/core';
import { Component, Input, Inject, ViewChild, EventEmitter, ElementRef, TemplateRef, Output, NgModule } from '@angular/core';
import * as i2$1 from '@streamstech/ui-sdk/services';
import { dispatch, action$ } from '@streamstech/ui-sdk/services';
import * as i1 from '@streamstech/ui-sdk/constants';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i4 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i7 from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, startWith, filter, fromEvent, forkJoin } from 'rxjs';
import * as i3$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as i1$1 from '@angular/material/dialog';
import { MatDialogConfig, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i8 from '@angular/material/grid-list';
import { MatGridListModule } from '@angular/material/grid-list';
import * as i3$2 from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

class ActionComponent {
    constructor(
    //private _fuseConfirmationService: FuseConfirmationService,
    constant) {
        this.constant = constant;
        this.suppressCustomButtons = false;
    }
    agInit(params) {
        this.params = params;
    }
    customActionHandler(btnInfo) {
        dispatch(new CustomAction(btnInfo.actionName, this.params?.data));
        console.log(btnInfo.actionName, this.params?.data);
    }
    editRowData() {
        if (this.params?.crudEdit) {
            this.params?.crudEdit(this.params?.data);
        }
    }
    deleteRowData() {
        if (this.params?.crudDelete) {
            /*this._fuseConfirmationService.open({
                title: ConstantService.Message.DELETE_SUCCESSFUL_TITLE,
                message: ConstantService.Message.DELETE_SUCCESSFUL_MESSAGE,
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
            }).afterClosed().subscribe((result) =>{
                if (result === 'confirmed'){
                     this.params?.crudDelete(this.params?.data);
                }
            });*/
        }
    }
}
ActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ActionComponent, deps: [{ token: i1.ConstantService }], target: i0.ɵɵFactoryTarget.Component });
ActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ActionComponent, selector: "grid-actions", inputs: { suppressCustomButtons: "suppressCustomButtons" }, ngImport: i0, template: `
    <mat-icon *ngIf="params?.hasEditPermission" (click)="editRowData()" matTooltip="edit">edit</mat-icon>
    <mat-icon *ngIf="params?.hasDeletePermission" (click)="deleteRowData()" matTooltip="delete">delete</mat-icon>
    <ng-container *ngIf="!suppressCustomButtons">
        <ng-container  *ngFor="let btn of params?.customButtons">
            <mat-icon  (click)="customActionHandler(btn)" [matTooltip]="btn.tooltip">{{btn.icon}}</mat-icon>
        </ng-container>
    </ng-container>
    <ng-container *ngIf="params.buttonTemplate" [ngTemplateOutlet]="params.buttonTemplate" [ngTemplateOutletContext]="{data:params.data}"></ng-container>
  `, isInline: true, styles: [".mat-icon{font-size:20px;cursor:pointer;padding:2px 5px;margin-right:3px;height:30px;width:30px}.mat-icon:hover{background-color:#fff;border-radius:50%}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ActionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'grid-actions', template: `
    <mat-icon *ngIf="params?.hasEditPermission" (click)="editRowData()" matTooltip="edit">edit</mat-icon>
    <mat-icon *ngIf="params?.hasDeletePermission" (click)="deleteRowData()" matTooltip="delete">delete</mat-icon>
    <ng-container *ngIf="!suppressCustomButtons">
        <ng-container  *ngFor="let btn of params?.customButtons">
            <mat-icon  (click)="customActionHandler(btn)" [matTooltip]="btn.tooltip">{{btn.icon}}</mat-icon>
        </ng-container>
    </ng-container>
    <ng-container *ngIf="params.buttonTemplate" [ngTemplateOutlet]="params.buttonTemplate" [ngTemplateOutletContext]="{data:params.data}"></ng-container>
  `, styles: [".mat-icon{font-size:20px;cursor:pointer;padding:2px 5px;margin-right:3px;height:30px;width:30px}.mat-icon:hover{background-color:#fff;border-radius:50%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ConstantService }]; }, propDecorators: { suppressCustomButtons: [{
                type: Input
            }] } });
class EditAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
class DeleteAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
class CustomAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

// @ts-nocheck
const toSnakeCase = (str) => str.replace(/([A-Z])/g, (a, _, i) => `${i ? '_' : ''}${a.toLowerCase()}`);
const toTitleCase = (s, space = '') => s.replace(/^_*(.)|_+(.)/g, (_, c, d) => c ? c.toUpperCase() : space + d.toUpperCase());
const toTitleCaseModel = (record) => Object.keys(record).reduce((obj, key) => {
    obj[toTitleCase(key)] = record[key];
    return obj;
}, {});
const toSnakeCaseModel = (record) => Object.keys(record).reduce((obj, key) => {
    obj[toSnakeCase(key)] = record[key];
    return obj;
}, {});
const actionColHelper = (config) => Object.assign(config, {
    sortable: false,
    filter: false,
    resizable: false,
    headerName: 'Actions',
});

class CellRendererComponent {
    get userStatus() {
        return this.params?.templateName.startsWith('<user-status');
    }
    agInit(params) {
        this.params = params;
    }
}
CellRendererComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellRendererComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CellRendererComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CellRendererComponent, selector: "grid-cell-renderer", ngImport: i0, template: `
    <span *ngIf="userStatus" [ngClass]=" {'label':true,
    'label-danger': params?.data?.activated === false,
    'label-success': params?.data?.activated === true
}">
    {{params?.data?.activated? 'Activated' : 'Not Activated'}}
</span>
  `, isInline: true, styles: [".label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}.label-success{background-color:#5cb85c}.label-danger{background-color:#d9534f}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellRendererComponent, decorators: [{
            type: Component,
            args: [{ selector: 'grid-cell-renderer', template: `
    <span *ngIf="userStatus" [ngClass]=" {'label':true,
    'label-danger': params?.data?.activated === false,
    'label-success': params?.data?.activated === true
}">
    {{params?.data?.activated? 'Activated' : 'Not Activated'}}
</span>
  `, styles: [".label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}.label-success{background-color:#5cb85c}.label-danger{background-color:#d9534f}\n"] }]
        }] });

//@ts-nocheck
class SetFilterComponent {
    constructor() {
        this.year = 'All';
        this.allChecked = false;
        this.search = new FormControl('');
        this.destroy$ = new Subject();
    }
    agInit(params) {
        this.params = params;
        let resourceKey = null;
        if (params.colDef.cellRendererParams && params.colDef.cellRendererParams.resourceKey) {
            resourceKey = params.colDef.cellRendererParams.resourceKey;
        }
        let tableName = toSnakeCase(params.tableName);
        if (tableName === 'user') {
            tableName = `"${tableName}"`;
        }
        const columnName = toSnakeCase(params.columnName);
        if (!(params.tableName && params.columnName)) {
            return;
        }
        this.search.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(320), distinctUntilChanged(), startWith('')).subscribe((val) => {
            if (resourceKey) {
                dispatch(new RequestForResourceData(resourceKey, val));
            }
            else if (typeof params.dataCallback === 'function') {
                params.dataCallback(columnName, val).subscribe(res => {
                    this.uniqueValues = res;
                });
            }
            else {
                this.getColumnValues(tableName, columnName, val);
            }
        });
        if (resourceKey) {
            action$.isA(ReceivingResourceData)
                .pipe(takeUntil(this.destroy$), filter(req => req.resourceKey === resourceKey))
                .subscribe(res => this.uniqueValues = res.data);
        }
    }
    updateAllChecked() {
        this.allChecked = this.uniqueValues != null && this.uniqueValues.every(t => t.checked);
    }
    setAll(completed) {
        this.allChecked = completed;
        if (this.uniqueValues == null) {
            return;
        }
        this.uniqueValues.forEach(t => (t.checked = completed));
    }
    someChecked() {
        if (this.uniqueValues == null) {
            return false;
        }
        return !!this.uniqueValues.find(t => t.checked) && !this.allChecked;
    }
    isFilterActive() {
        return this.uniqueValues.filter(t => t.checked).length > 0;
    }
    doesFilterPass(params) {
        const checkedList = this.uniqueValues.filter(t => t.checked).map(it => it.value);
        const key = this.params.colDef.field;
        if (checkedList.length) {
            return checkedList.includes(params.data[key]);
        }
        return true;
    }
    getModel() {
        return this.uniqueValues.filter(t => t.checked).map(it => it.value);
    }
    setModel(model) {
    }
    updateFilter() {
        this.params.filterChangedCallback();
    }
    resetAll() {
        this.search.patchValue('');
        this.setAll(false);
        this.updateFilter();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    getColumnValues(tableName, columnName, search) {
        /*this.apiService.get(`Table/GetColumnUniqueValues?tableName=${tableName}&columnName=${columnName}&search=${search}`)
            .pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
                this.uniqueValues = res.data.map((el: ResourceModel) => {
                    el.label = el.value;
                    return el;
                });
            });*/
    }
}
SetFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SetFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SetFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SetFilterComponent, selector: "grid-set-filter", ngImport: i0, template: `
      <div class="container">
        <mat-form-field class="w-full">
            <input matInput placeholder="search" [formControl]="search">
            <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <section class="example-section">
            <span class="example-list-section">
                <mat-checkbox class="example-margin"
                            [checked]="allChecked"
                            [indeterminate]="someChecked()"
                            (change)="setAll($event.checked)">
                All Checked
                </mat-checkbox>
            </span>
            <div class="checkboxes">
                <ul>
                <li class="pt-1" *ngFor="let item of uniqueValues">
                    <mat-checkbox [(ngModel)]="item.checked"
                                (ngModelChange)="updateAllChecked()">
                    {{item.label}}
                    </mat-checkbox>
                </li>
                </ul>
            </div>
        </section>
        <div class="flex justify-end">
           <button mat-button color="primary" (click)="resetAll()">Reset</button>
            <button mat-button color="warn" (click)="updateFilter()">Apply</button>
        </div>
      </div>
    `, isInline: true, styles: [".container{padding:8px;min-width:250px;max-height:450px;overflow-y:hidden}.container ul{list-style-type:none;padding:none;margin:none}.checkboxes{max-height:320px;overflow-y:auto}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i3$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i4$1.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i7.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SetFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'grid-set-filter', template: `
      <div class="container">
        <mat-form-field class="w-full">
            <input matInput placeholder="search" [formControl]="search">
            <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <section class="example-section">
            <span class="example-list-section">
                <mat-checkbox class="example-margin"
                            [checked]="allChecked"
                            [indeterminate]="someChecked()"
                            (change)="setAll($event.checked)">
                All Checked
                </mat-checkbox>
            </span>
            <div class="checkboxes">
                <ul>
                <li class="pt-1" *ngFor="let item of uniqueValues">
                    <mat-checkbox [(ngModel)]="item.checked"
                                (ngModelChange)="updateAllChecked()">
                    {{item.label}}
                    </mat-checkbox>
                </li>
                </ul>
            </div>
        </section>
        <div class="flex justify-end">
           <button mat-button color="primary" (click)="resetAll()">Reset</button>
            <button mat-button color="warn" (click)="updateFilter()">Apply</button>
        </div>
      </div>
    `, styles: [".container{padding:8px;min-width:250px;max-height:450px;overflow-y:hidden}.container ul{list-style-type:none;padding:none;margin:none}.checkboxes{max-height:320px;overflow-y:auto}\n"] }]
        }], ctorParameters: function () { return []; } });
class RequestForResourceData {
    constructor(resourceKey, search) {
        this.resourceKey = resourceKey;
        this.search = search;
    }
}
class ReceivingResourceData {
    constructor(resourceKey, data) {
        this.resourceKey = resourceKey;
        this.data = data;
    }
}

// @ts-nocheck
class ColumnSelectorComponent {
    constructor(_matDialogRef, data) {
        this.data = data;
        this.filteredColumns = [];
        this.faCheck = faCheck;
        this.faXmark = faXmark;
        this.matDialogConfig = new MatDialogConfig();
        this._matDialogRef = _matDialogRef;
        this.triggerElementRef = data.trigger;
        this.columnDefs = data.columnDefs;
        this.callback = data.callback;
    }
    ngOnInit() {
        this.searchColumnByString('');
        this.updateMatDialogPosition();
    }
    updateMatDialogPosition() {
        const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
        //(rect.left, rect.right);
        this.matDialogConfig.position = {
            // left: `${rect.left-280}px`,
            right: `${window.innerWidth - rect.right - 20}px`,
            top: `${rect.bottom + 10}px`,
        };
        this.matDialogConfig.width = '370px';
        this.matDialogConfig.minHeight = '300px';
        this._matDialogRef.updateSize(this.matDialogConfig.width, this.matDialogConfig.height);
        this._matDialogRef.updatePosition(this.matDialogConfig.position);
    }
    toggleDisplayValue(column) {
        column.visible = !column.visible;
        this.callback([column.field], column.visible);
    }
    selectAll() {
        this.selectAllBy(true);
    }
    selectNone() {
        this.selectAllBy(false);
    }
    reset() {
        this.selectAllBy(true);
    }
    selectAllBy(flag) {
        this.filteredColumns = this.columnDefs.map((it) => {
            it.visible = flag;
            return it;
        });
        this.callback(this.columnDefs.filter(it => it.field).map((it) => it.field), flag);
    }
    applyFilter(event) {
        let filterValue = event.target.value;
        filterValue = filterValue.trim().toLowerCase();
        this.searchColumnByString(filterValue);
    }
    searchColumnByString(filterValue) {
        this.filteredColumns = this.columnDefs
            .filter((column) => column.headerName.toLowerCase().includes(filterValue));
    }
    clearSearchBox() {
        this.searchColumnInput.nativeElement.value = '';
        this.searchColumnByString('');
    }
    checkColumnInputValue() {
        return this.searchColumnInput?.nativeElement.value ? true : false;
    }
    getCheckedLen() {
        return this.filteredColumns.filter(it => it.visible).length;
    }
}
ColumnSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnSelectorComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ColumnSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ColumnSelectorComponent, selector: "stl-grid-column-selector", viewQueries: [{ propertyName: "searchColumnInput", first: true, predicate: ["SearchColumnInput"], descendants: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <div class=\"headerBox\">\r\n      <div class=\"buttonsBox\">\r\n          <button mat-button color=\"primary\" (click)=\"selectAll()\">\r\n              \u2713 Select All\r\n          </button>\r\n          <button mat-button color=\"primary\" (click)=\"selectNone()\">\r\n              \u00D7 Select None\r\n          </button>\r\n          <button mat-raised-button color=\"warn\" (click)=\"reset()\">\r\n              <span>\u21B6 Reset</span>\r\n          </button>\r\n          \r\n      </div>\r\n      <div class=\"\">\r\n          \r\n          <mat-form-field class=\"w-full\">\r\n              <input\r\n                  #SearchColumnInput\r\n                  appInputFocus\r\n                  matInput\r\n                  placeholder=\"Search...\"\r\n                  autocomplete=\"off\"\r\n                  (keyup)=\"applyFilter($event)\"\r\n              />\r\n              <button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"checkColumnInputValue()\" (click)=\"clearSearchBox()\">\r\n                  <mat-icon>close</mat-icon>\r\n              </button>\r\n          </mat-form-field>\r\n      </div>\r\n      <div class=\"column-numbers\">\r\n          <p>Total: {{columnDefs.length}}</p>\r\n          <p>Displayed: {{getCheckedLen()}}</p>\r\n      </div>\r\n  </div>\r\n  <div class=\"columnsBox\">\r\n      <mat-grid-list cols=\"1\" rowHeight=\"1:0.09\">\r\n          <div *ngFor=\"let column of filteredColumns; let i = index\">\r\n          <mat-grid-tile\r\n              class=\"columnDiv\"\r\n              (click)=\"toggleDisplayValue(column)\"\r\n          >\r\n              <div class=\"span-container\">\r\n                  <span class=\"display-name-container ellipsis\" [matTooltip]='column.headerName'>{{ column.headerName }}</span>\r\n                  <span *ngIf=\"column.visible\">\u2713</span>\r\n              </div>\r\n          </mat-grid-tile>\r\n      </div>\r\n      </mat-grid-list>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin:10px auto;display:flex;flex-direction:column;justify-content:center;padding:5px}button{height:32px;min-height:32px!important;min-width:40px!important;font-size:13px!important;line-height:0px}.headerBox{padding:8px}.buttonsBox{display:flex;align-items:center;margin-bottom:15px}.buttonsBox button{margin-right:5px}.btn{font:13px;cursor:pointer;margin-right:5px;height:30px}.btn-primary{color:#fff!important;background-color:#1abc9c;border:0;border-radius:50px;padding:4px 15px}.btn-primary:hover{background-color:#0a8e74}.btn-secondary{color:#fff!important;background-color:#e74c3c;border:0;border-radius:50px;padding:4px 15px}.btn-secondary:hover{background-color:#c83223!important}.searchBox input{outline:none;border-radius:2px;border:1px solid #ccc;height:30px;font-size:13px;width:95%;padding:10px;box-sizing:border-box;color:#888;box-shadow:inset 0 1px 1px #00000014;max-height:30px}.searchBox input:focus{border:1px solid #66AFE9!important}.columnsBox{display:block;padding:8px;overflow:hidden;background-color:#f8f8f8;max-height:165px;overflow-y:scroll}.columnDiv{color:#3d3d3d;background-color:#fff;cursor:pointer;border:1px solid rgba(0,0,0,.15)}.columnDiv .span-container{width:98%;display:flex;justify-content:space-between;padding:3px}::ng-deep .mat-tooltip{max-width:500px!important;color:#fff!important}.columnDiv:hover{color:#515151!important;background-image:linear-gradient(#ebebeb,#ebebeb)}:host ::ng-deep .column-selector-search-box .mat-form-field-wrapper{margin:0!important;padding:0;width:330px}.column-numbers{display:flex;justify-content:flex-start;gap:15px;margin:2px 5px}.display-name-container{width:90%}.ellipsis{text-overflow:ellipsis!important;overflow:hidden;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3$1.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i4.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "component", type: i8.MatGridList, selector: "mat-grid-list", inputs: ["cols", "gutterSize", "rowHeight"], exportAs: ["matGridList"] }, { kind: "component", type: i8.MatGridTile, selector: "mat-grid-tile", inputs: ["rowspan", "colspan"], exportAs: ["matGridTile"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'stl-grid-column-selector', template: "<div class=\"container\">\r\n  <div class=\"headerBox\">\r\n      <div class=\"buttonsBox\">\r\n          <button mat-button color=\"primary\" (click)=\"selectAll()\">\r\n              \u2713 Select All\r\n          </button>\r\n          <button mat-button color=\"primary\" (click)=\"selectNone()\">\r\n              \u00D7 Select None\r\n          </button>\r\n          <button mat-raised-button color=\"warn\" (click)=\"reset()\">\r\n              <span>\u21B6 Reset</span>\r\n          </button>\r\n          \r\n      </div>\r\n      <div class=\"\">\r\n          \r\n          <mat-form-field class=\"w-full\">\r\n              <input\r\n                  #SearchColumnInput\r\n                  appInputFocus\r\n                  matInput\r\n                  placeholder=\"Search...\"\r\n                  autocomplete=\"off\"\r\n                  (keyup)=\"applyFilter($event)\"\r\n              />\r\n              <button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"checkColumnInputValue()\" (click)=\"clearSearchBox()\">\r\n                  <mat-icon>close</mat-icon>\r\n              </button>\r\n          </mat-form-field>\r\n      </div>\r\n      <div class=\"column-numbers\">\r\n          <p>Total: {{columnDefs.length}}</p>\r\n          <p>Displayed: {{getCheckedLen()}}</p>\r\n      </div>\r\n  </div>\r\n  <div class=\"columnsBox\">\r\n      <mat-grid-list cols=\"1\" rowHeight=\"1:0.09\">\r\n          <div *ngFor=\"let column of filteredColumns; let i = index\">\r\n          <mat-grid-tile\r\n              class=\"columnDiv\"\r\n              (click)=\"toggleDisplayValue(column)\"\r\n          >\r\n              <div class=\"span-container\">\r\n                  <span class=\"display-name-container ellipsis\" [matTooltip]='column.headerName'>{{ column.headerName }}</span>\r\n                  <span *ngIf=\"column.visible\">\u2713</span>\r\n              </div>\r\n          </mat-grid-tile>\r\n      </div>\r\n      </mat-grid-list>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin:10px auto;display:flex;flex-direction:column;justify-content:center;padding:5px}button{height:32px;min-height:32px!important;min-width:40px!important;font-size:13px!important;line-height:0px}.headerBox{padding:8px}.buttonsBox{display:flex;align-items:center;margin-bottom:15px}.buttonsBox button{margin-right:5px}.btn{font:13px;cursor:pointer;margin-right:5px;height:30px}.btn-primary{color:#fff!important;background-color:#1abc9c;border:0;border-radius:50px;padding:4px 15px}.btn-primary:hover{background-color:#0a8e74}.btn-secondary{color:#fff!important;background-color:#e74c3c;border:0;border-radius:50px;padding:4px 15px}.btn-secondary:hover{background-color:#c83223!important}.searchBox input{outline:none;border-radius:2px;border:1px solid #ccc;height:30px;font-size:13px;width:95%;padding:10px;box-sizing:border-box;color:#888;box-shadow:inset 0 1px 1px #00000014;max-height:30px}.searchBox input:focus{border:1px solid #66AFE9!important}.columnsBox{display:block;padding:8px;overflow:hidden;background-color:#f8f8f8;max-height:165px;overflow-y:scroll}.columnDiv{color:#3d3d3d;background-color:#fff;cursor:pointer;border:1px solid rgba(0,0,0,.15)}.columnDiv .span-container{width:98%;display:flex;justify-content:space-between;padding:3px}::ng-deep .mat-tooltip{max-width:500px!important;color:#fff!important}.columnDiv:hover{color:#515151!important;background-image:linear-gradient(#ebebeb,#ebebeb)}:host ::ng-deep .column-selector-search-box .mat-form-field-wrapper{margin:0!important;padding:0;width:330px}.column-numbers{display:flex;justify-content:flex-start;gap:15px;margin:2px 5px}.display-name-container{width:90%}.ellipsis{text-overflow:ellipsis!important;overflow:hidden;white-space:nowrap}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; }, propDecorators: { searchColumnInput: [{
                type: ViewChild,
                args: ['SearchColumnInput']
            }] } });

class StlGridComponent {
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
StlGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.ConstantService }, { token: i2$1.ApiService }, { token: i3$2.ActivatedRoute }, { token: i2$1.EventEmitterService }, { token: i2$1.AlertMessageService }, { token: i2$1.DateTimeService }, { token: i1$1.MatDialog }, { token: i2$1.SidebarService }], target: i0.ɵɵFactoryTarget.Component });
StlGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: StlGridComponent, selector: "stl-grid", inputs: { columnDefs: "columnDefs", defaultColDef: "defaultColDef", defaultColGroupDef: "defaultColGroupDef", rowData: "rowData", model: "model", actionsCol: "actionsCol", pageSize: "pageSize", gridOptions: "gridOptions", rowModelType: "rowModelType", formTitle: "formTitle", title: "title", downLoadPdfEnabled: "downLoadPdfEnabled", downLoadCsvEnabled: "downLoadCsvEnabled", downLoadExcelEnabled: "downLoadExcelEnabled", downLoadJpgEnabled: "downLoadJpgEnabled", showDownLoadButton: "showDownLoadButton", showColumnsButton: "showColumnsButton", showSearchButton: "showSearchButton", toolbarButtons: "toolbarButtons", formTemplate: "formTemplate", toolbarTemplate: "toolbarTemplate", haveAdditionalFormFields: "haveAdditionalFormFields", buttonPermissions: "buttonPermissions", showCreateButton: "showCreateButton", permittedActionsPrefix: "permittedActionsPrefix", strictlyHideOrShowCreateButton: "strictlyHideOrShowCreateButton", formSelector: "formSelector", customFormInfo: "customFormInfo", inputComponents: "inputComponents", tableConfig: "tableConfig", showBackButton: "showBackButton", tableName: "tableName", getRowId: "getRowId" }, outputs: { gridReady: "gridReady", selectedIdsEmitter: "selectedIdsEmitter", selectedRowDataEmitter: "selectedRowDataEmitter", createDataEmitter: "createDataEmitter", saveOrCancelEmitter: "saveOrCancelEmitter", backHandler: "backHandler" }, viewQueries: [{ propertyName: "agGrid", first: true, predicate: AgGridAngular, descendants: true }, { propertyName: "stlFormContainer", first: true, predicate: ["stlFormContainer"], descendants: true, read: (TemplateRef) }], ngImport: i0, template: "<div>Hello world</div>", styles: [".back-button:hover{cursor:pointer}.title{position:relative;top:-5px}.header-content{border:1px solid #e2e8f0;border-radius:4px 4px 0 0;border-bottom:none}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'stl-grid', template: "<div>Hello world</div>", styles: [".back-button:hover{cursor:pointer}.title{position:relative;top:-5px}.header-content{border:1px solid #e2e8f0;border-radius:4px 4px 0 0;border-bottom:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.ConstantService }, { type: i2$1.ApiService }, { type: i3$2.ActivatedRoute }, { type: i2$1.EventEmitterService }, { type: i2$1.AlertMessageService }, { type: i2$1.DateTimeService }, { type: i1$1.MatDialog }, { type: i2$1.SidebarService }]; }, propDecorators: { columnDefs: [{
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
function getCrudUrl(routingKey, apiType, operationType, id) {
    return buildUrl(routingKey, apiType, operationType) + (id ? `/${id}` : '');
}

//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
class StlGridModule {
}
StlGridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StlGridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, declarations: [SetFilterComponent,
        CellRendererComponent,
        ActionComponent,
        //StlGridComponent,
        ColumnSelectorComponent], imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        AgGridModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule], exports: [SetFilterComponent,
        CellRendererComponent,
        ActionComponent] });
StlGridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        AgGridModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SetFilterComponent,
                        CellRendererComponent,
                        ActionComponent,
                        //StlGridComponent,
                        ColumnSelectorComponent
                    ],
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        AgGridModule,
                        MatCheckboxModule,
                        MatDialogModule,
                        MatIconModule,
                        MatMenuModule,
                        MatSnackBarModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatTooltipModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatGridListModule,
                        //FontAwesomeModule
                    ],
                    exports: [
                        SetFilterComponent,
                        CellRendererComponent,
                        ActionComponent,
                        //StlGridComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ActionComponent, CellRendererComponent, CustomAction, DeleteAction, EditAction, ReceivingResourceData, RequestForResourceData, SetFilterComponent, StlGridComponent, StlGridModule, actionColHelper, getCrudUrl, toSnakeCase, toSnakeCaseModel, toTitleCase, toTitleCaseModel };
//# sourceMappingURL=streamstech-ui-sdk-grid.mjs.map
