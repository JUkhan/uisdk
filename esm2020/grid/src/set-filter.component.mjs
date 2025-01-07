//@ts-nocheck
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs';
import { action$, dispatch } from '@streamstech/ui-sdk/services';
import { toSnakeCase } from './case-conversion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/checkbox";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/forms";
export class SetFilterComponent {
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
    `, isInline: true, styles: [".container{padding:8px;min-width:250px;max-height:450px;overflow-y:hidden}.container ul{list-style-type:none;padding:none;margin:none}.checkboxes{max-height:320px;overflow-y:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i4.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i7.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
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
export class RequestForResourceData {
    constructor(resourceKey, search) {
        this.resourceKey = resourceKey;
        this.search = search;
    }
}
export class ReceivingResourceData {
    constructor(resourceKey, data) {
        this.resourceKey = resourceKey;
        this.data = data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvZ3JpZC9zcmMvc2V0LWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsYUFBYTtBQUNiLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRyxPQUFPLEVBQVUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7O0FBdURoRCxNQUFNLE9BQU8sa0JBQWtCO0lBUTNCO1FBTkEsU0FBSSxHQUFXLEtBQUssQ0FBQztRQUVyQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFdBQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUl2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQVc7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUM7UUFDckIsSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFDO1lBQ2hGLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztTQUM5RDtRQUNELElBQUksU0FBUyxHQUFHLFdB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Q3pFOzs7Ozs7aUJBTVM7SUFDYixDQUFDOztnSEF4R1Esa0JBQWtCO29HQUFsQixrQkFBa0IsdURBbERqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStCVDs0RkFtQlEsa0JBQWtCO2tCQXBEOUIsU0FBUzsrQkFDSSxpQkFBaUIsWUFDakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0ErQlQ7O0FBb0lMLE1BQU0sT0FBTyxzQkFBc0I7SUFFL0IsWUFBbUIsV0FBbUIsRUFBUyxNQUFjO1FBQTFDLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7Q0FDckU7QUFDRCxNQUFNLE9BQU8scUJBQXFCO0lBRTlCLFlBQW1CLFdBQW1CLEVBQVMsSUFBcUI7UUFBakQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFpQjtJQUFJLENBQUM7Q0FDNUUiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy9AdHMtbm9jaGVja1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJRmlsdGVyQW5ndWxhckNvbXAgfSBmcm9tICdhZy1ncmlkLWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBJRG9lc0ZpbHRlclBhc3NQYXJhbXMsIElGaWx0ZXJQYXJhbXMgfSBmcm9tICdhZy1ncmlkLWNvbW11bml0eSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJ0BzdHJlYW1zdGVjaC91aS1zZGsvc2VydmljZXMnO1xyXG5pbXBvcnQgeyBBY3Rpb24sIGFjdGlvbiQsIGRpc3BhdGNoIH0gZnJvbSAnQHN0cmVhbXN0ZWNoL3VpLXNkay9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IHRvU25ha2VDYXNlIH0gZnJvbSAnLi9jYXNlLWNvbnZlcnNpb24nO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdncmlkLXNldC1maWx0ZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctZnVsbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJzZWFyY2hcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRTdWZmaXg+c2VhcmNoPC9tYXQtaWNvbj5cclxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZXhhbXBsZS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhhbXBsZS1saXN0LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2hlY2tib3ggY2xhc3M9XCJleGFtcGxlLW1hcmdpblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJhbGxDaGVja2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNvbWVDaGVja2VkKClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJzZXRBbGwoJGV2ZW50LmNoZWNrZWQpXCI+XHJcbiAgICAgICAgICAgICAgICBBbGwgQ2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94ZXNcIj5cclxuICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInB0LTFcIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB1bmlxdWVWYWx1ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94IFsobmdNb2RlbCldPVwiaXRlbS5jaGVja2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVBbGxDaGVja2VkKClcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwicmVzZXRBbGwoKVwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cIndhcm5cIiAoY2xpY2spPVwidXBkYXRlRmlsdGVyKClcIj5BcHBseTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAuY29udGFpbmVye1xyXG4gICAgICAgICAgICBwYWRkaW5nOjhweDtcclxuICAgICAgICAgICAgbWluLXdpZHRoOjI1MHB4O1xyXG4gICAgICAgICAgICBtYXgtaGVpZ2h0OjQ1MHB4O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OmhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAuY29udGFpbmVyIHVsIHtcclxuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICAgICAgcGFkZGluZzogbm9uZTtcclxuICAgICAgICBtYXJnaW46bm9uZTtcclxuICAgIH1cclxuICAgIC5jaGVja2JveGVze1xyXG4gICAgICAgIG1heC1oZWlnaHQ6MzIwcHg7XHJcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBJRmlsdGVyQW5ndWxhckNvbXAsIE9uRGVzdHJveSB7XHJcbiAgICBwYXJhbXMhOiBJRmlsdGVyUGFyYW1zO1xyXG4gICAgeWVhcjogc3RyaW5nID0gJ0FsbCc7XHJcbiAgICB1bmlxdWVWYWx1ZXMhOiBSZXNvdXJjZU1vZGVsW107XHJcbiAgICBhbGxDaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzZWFyY2ggPSBuZXcgRm9ybUNvbnRyb2woJycpO1xyXG4gICAgc3ViITogU3Vic2NyaXB0aW9uO1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvL3ByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICBsZXQgcmVzb3VyY2VLZXk9bnVsbDtcclxuICAgICAgICBpZihwYXJhbXMuY29sRGVmLmNlbGxSZW5kZXJlclBhcmFtcyAmJiBwYXJhbXMuY29sRGVmLmNlbGxSZW5kZXJlclBhcmFtcy5yZXNvdXJjZUtleSl7XHJcbiAgICAgICAgICAgIHJlc291cmNlS2V5ID0gcGFyYW1zLmNvbERlZi5jZWxsUmVuZGVyZXJQYXJhbXMucmVzb3VyY2VLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YWJsZU5hbWUgPSB0b1NuYWtlQ2FzZShwYXJhbXMudGFibGVOYW1lKTtcclxuICAgICAgICBpZiAodGFibGVOYW1lID09PSAndXNlcicpIHtcclxuICAgICAgICAgICAgdGFibGVOYW1lID0gYFwiJHt0YWJsZU5hbWV9XCJgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gdG9TbmFrZUNhc2UocGFyYW1zLmNvbHVtbk5hbWUpO1xyXG4gICAgICAgIGlmICghKHBhcmFtcy50YWJsZU5hbWUgJiYgcGFyYW1zLmNvbHVtbk5hbWUpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuc2VhcmNoLnZhbHVlQ2hhbmdlcy5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMjApLFxyXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICBzdGFydFdpdGgoJycpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2VLZXkpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5ldyBSZXF1ZXN0Rm9yUmVzb3VyY2VEYXRhKHJlc291cmNlS2V5LCB2YWwpKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodHlwZW9mIHBhcmFtcy5kYXRhQ2FsbGJhY2sgPT09J2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGF0YUNhbGxiYWNrKGNvbHVtbk5hbWUsIHZhbCkuc3Vic2NyaWJlKHJlcz0+e1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnVuaXF1ZVZhbHVlcyA9IHJlczsgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbHVtblZhbHVlcyh0YWJsZU5hbWUsIGNvbHVtbk5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVzb3VyY2VLZXkpIHtcclxuICAgICAgICAgICAgYWN0aW9uJC5pc0EoUmVjZWl2aW5nUmVzb3VyY2VEYXRhKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLCBmaWx0ZXIocmVxID0+IHJlcS5yZXNvdXJjZUtleSA9PT0gcmVzb3VyY2VLZXkpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy51bmlxdWVWYWx1ZXMgPSByZXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFsbENoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbGxDaGVja2VkID0gdGhpcy51bmlxdWVWYWx1ZXMgIT0gbnVsbCAmJiB0aGlzLnVuaXF1ZVZhbHVlcy5ldmVyeSh0ID0+IHQuY2hlY2tlZCk7XHJcbiAgICB9XHJcbiAgICBzZXRBbGwoY29tcGxldGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbGxDaGVja2VkID0gY29tcGxldGVkO1xyXG4gICAgICAgIGlmICh0aGlzLnVuaXF1ZVZhbHVlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51bmlxdWVWYWx1ZXMuZm9yRWFjaCh0ID0+ICh0LmNoZWNrZWQgPSBjb21wbGV0ZWQpKTtcclxuICAgIH1cclxuICAgIHNvbWVDaGVja2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnVuaXF1ZVZhbHVlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy51bmlxdWVWYWx1ZXMuZmluZCh0ID0+IHQuY2hlY2tlZCkgJiYgIXRoaXMuYWxsQ2hlY2tlZDtcclxuICAgIH1cclxuICAgIGlzRmlsdGVyQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZVZhbHVlcy5maWx0ZXIodCA9PiB0LmNoZWNrZWQpLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZG9lc0ZpbHRlclBhc3MocGFyYW1zOiBJRG9lc0ZpbHRlclBhc3NQYXJhbXMpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjaGVja2VkTGlzdCA9IHRoaXMudW5pcXVlVmFsdWVzLmZpbHRlcih0ID0+IHQuY2hlY2tlZCkubWFwKGl0ID0+IGl0LnZhbHVlKTtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLnBhcmFtcy5jb2xEZWYuZmllbGQgYXMgYW55O1xyXG4gICAgICAgIGlmIChjaGVja2VkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrZWRMaXN0LmluY2x1ZGVzKHBhcmFtcy5kYXRhW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb2RlbCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlVmFsdWVzLmZpbHRlcih0ID0+IHQuY2hlY2tlZCkubWFwKGl0ID0+IGl0LnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlbChtb2RlbDogYW55KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlsdGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmZpbHRlckNoYW5nZWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcmVzZXRBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gucGF0Y2hWYWx1ZSgnJyk7XHJcbiAgICAgICAgdGhpcy5zZXRBbGwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKCk7XHJcbiAgICB9XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldENvbHVtblZhbHVlcyh0YWJsZU5hbWU6IHN0cmluZywgY29sdW1uTmFtZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIC8qdGhpcy5hcGlTZXJ2aWNlLmdldChgVGFibGUvR2V0Q29sdW1uVW5pcXVlVmFsdWVzP3RhYmxlTmFtZT0ke3RhYmxlTmFtZX0mY29sdW1uTmFtZT0ke2NvbHVtbk5hbWV9JnNlYXJjaD0ke3NlYXJjaH1gKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pcXVlVmFsdWVzID0gcmVzLmRhdGEubWFwKChlbDogUmVzb3VyY2VNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmxhYmVsID0gZWwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vaW50ZXJmYWNlIEl0ZW0geyB2YWx1ZTogc3RyaW5nOyBjaGVja2VkOiBib29sZWFuIH1cclxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZU1vZGVsIHtcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBsYWJlbDogYW55O1xyXG4gICAgY2hlY2tlZDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdEZvclJlc291cmNlRGF0YSBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICB0eXBlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVzb3VyY2VLZXk6IHN0cmluZywgcHVibGljIHNlYXJjaDogc3RyaW5nKSB7IH1cclxufVxyXG5leHBvcnQgY2xhc3MgUmVjZWl2aW5nUmVzb3VyY2VEYXRhIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICAgIHR5cGU6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZXNvdXJjZUtleTogc3RyaW5nLCBwdWJsaWMgZGF0YTogUmVzb3VyY2VNb2RlbFtdKSB7IH1cclxufVxyXG4iXX0=