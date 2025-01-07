// @ts-nocheck
import { Component, ViewChild, Inject } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialogConfig, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/tooltip";
import * as i8 from "@angular/material/grid-list";
export class ColumnSelectorComponent {
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
ColumnSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnSelectorComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ColumnSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ColumnSelectorComponent, selector: "stl-grid-column-selector", viewQueries: [{ propertyName: "searchColumnInput", first: true, predicate: ["SearchColumnInput"], descendants: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <div class=\"headerBox\">\r\n      <div class=\"buttonsBox\">\r\n          <button mat-button color=\"primary\" (click)=\"selectAll()\">\r\n              \u2713 Select All\r\n          </button>\r\n          <button mat-button color=\"primary\" (click)=\"selectNone()\">\r\n              \u00D7 Select None\r\n          </button>\r\n          <button mat-raised-button color=\"warn\" (click)=\"reset()\">\r\n              <span>\u21B6 Reset</span>\r\n          </button>\r\n          \r\n      </div>\r\n      <div class=\"\">\r\n          \r\n          <mat-form-field class=\"w-full\">\r\n              <input\r\n                  #SearchColumnInput\r\n                  appInputFocus\r\n                  matInput\r\n                  placeholder=\"Search...\"\r\n                  autocomplete=\"off\"\r\n                  (keyup)=\"applyFilter($event)\"\r\n              />\r\n              <button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"checkColumnInputValue()\" (click)=\"clearSearchBox()\">\r\n                  <mat-icon>close</mat-icon>\r\n              </button>\r\n          </mat-form-field>\r\n      </div>\r\n      <div class=\"column-numbers\">\r\n          <p>Total: {{columnDefs.length}}</p>\r\n          <p>Displayed: {{getCheckedLen()}}</p>\r\n      </div>\r\n  </div>\r\n  <div class=\"columnsBox\">\r\n      <mat-grid-list cols=\"1\" rowHeight=\"1:0.09\">\r\n          <div *ngFor=\"let column of filteredColumns; let i = index\">\r\n          <mat-grid-tile\r\n              class=\"columnDiv\"\r\n              (click)=\"toggleDisplayValue(column)\"\r\n          >\r\n              <div class=\"span-container\">\r\n                  <span class=\"display-name-container ellipsis\" [matTooltip]='column.headerName'>{{ column.headerName }}</span>\r\n                  <span *ngIf=\"column.visible\">\u2713</span>\r\n              </div>\r\n          </mat-grid-tile>\r\n      </div>\r\n      </mat-grid-list>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin:10px auto;display:flex;flex-direction:column;justify-content:center;padding:5px}button{height:32px;min-height:32px!important;min-width:40px!important;font-size:13px!important;line-height:0px}.headerBox{padding:8px}.buttonsBox{display:flex;align-items:center;margin-bottom:15px}.buttonsBox button{margin-right:5px}.btn{font:13px;cursor:pointer;margin-right:5px;height:30px}.btn-primary{color:#fff!important;background-color:#1abc9c;border:0;border-radius:50px;padding:4px 15px}.btn-primary:hover{background-color:#0a8e74}.btn-secondary{color:#fff!important;background-color:#e74c3c;border:0;border-radius:50px;padding:4px 15px}.btn-secondary:hover{background-color:#c83223!important}.searchBox input{outline:none;border-radius:2px;border:1px solid #ccc;height:30px;font-size:13px;width:95%;padding:10px;box-sizing:border-box;color:#888;box-shadow:inset 0 1px 1px #00000014;max-height:30px}.searchBox input:focus{border:1px solid #66AFE9!important}.columnsBox{display:block;padding:8px;overflow:hidden;background-color:#f8f8f8;max-height:165px;overflow-y:scroll}.columnDiv{color:#3d3d3d;background-color:#fff;cursor:pointer;border:1px solid rgba(0,0,0,.15)}.columnDiv .span-container{width:98%;display:flex;justify-content:space-between;padding:3px}::ng-deep .mat-tooltip{max-width:500px!important;color:#fff!important}.columnDiv:hover{color:#515151!important;background-image:linear-gradient(#ebebeb,#ebebeb)}:host ::ng-deep .column-selector-search-box .mat-form-field-wrapper{margin:0!important;padding:0;width:330px}.column-numbers{display:flex;justify-content:flex-start;gap:15px;margin:2px 5px}.display-name-container{width:90%}.ellipsis{text-overflow:ellipsis!important;overflow:hidden;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "component", type: i8.MatGridList, selector: "mat-grid-list", inputs: ["cols", "gutterSize", "rowHeight"], exportAs: ["matGridList"] }, { kind: "component", type: i8.MatGridTile, selector: "mat-grid-tile", inputs: ["rowspan", "colspan"], exportAs: ["matGridTile"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'stl-grid-column-selector', template: "<div class=\"container\">\r\n  <div class=\"headerBox\">\r\n      <div class=\"buttonsBox\">\r\n          <button mat-button color=\"primary\" (click)=\"selectAll()\">\r\n              \u2713 Select All\r\n          </button>\r\n          <button mat-button color=\"primary\" (click)=\"selectNone()\">\r\n              \u00D7 Select None\r\n          </button>\r\n          <button mat-raised-button color=\"warn\" (click)=\"reset()\">\r\n              <span>\u21B6 Reset</span>\r\n          </button>\r\n          \r\n      </div>\r\n      <div class=\"\">\r\n          \r\n          <mat-form-field class=\"w-full\">\r\n              <input\r\n                  #SearchColumnInput\r\n                  appInputFocus\r\n                  matInput\r\n                  placeholder=\"Search...\"\r\n                  autocomplete=\"off\"\r\n                  (keyup)=\"applyFilter($event)\"\r\n              />\r\n              <button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"checkColumnInputValue()\" (click)=\"clearSearchBox()\">\r\n                  <mat-icon>close</mat-icon>\r\n              </button>\r\n          </mat-form-field>\r\n      </div>\r\n      <div class=\"column-numbers\">\r\n          <p>Total: {{columnDefs.length}}</p>\r\n          <p>Displayed: {{getCheckedLen()}}</p>\r\n      </div>\r\n  </div>\r\n  <div class=\"columnsBox\">\r\n      <mat-grid-list cols=\"1\" rowHeight=\"1:0.09\">\r\n          <div *ngFor=\"let column of filteredColumns; let i = index\">\r\n          <mat-grid-tile\r\n              class=\"columnDiv\"\r\n              (click)=\"toggleDisplayValue(column)\"\r\n          >\r\n              <div class=\"span-container\">\r\n                  <span class=\"display-name-container ellipsis\" [matTooltip]='column.headerName'>{{ column.headerName }}</span>\r\n                  <span *ngIf=\"column.visible\">\u2713</span>\r\n              </div>\r\n          </mat-grid-tile>\r\n      </div>\r\n      </mat-grid-list>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin:10px auto;display:flex;flex-direction:column;justify-content:center;padding:5px}button{height:32px;min-height:32px!important;min-width:40px!important;font-size:13px!important;line-height:0px}.headerBox{padding:8px}.buttonsBox{display:flex;align-items:center;margin-bottom:15px}.buttonsBox button{margin-right:5px}.btn{font:13px;cursor:pointer;margin-right:5px;height:30px}.btn-primary{color:#fff!important;background-color:#1abc9c;border:0;border-radius:50px;padding:4px 15px}.btn-primary:hover{background-color:#0a8e74}.btn-secondary{color:#fff!important;background-color:#e74c3c;border:0;border-radius:50px;padding:4px 15px}.btn-secondary:hover{background-color:#c83223!important}.searchBox input{outline:none;border-radius:2px;border:1px solid #ccc;height:30px;font-size:13px;width:95%;padding:10px;box-sizing:border-box;color:#888;box-shadow:inset 0 1px 1px #00000014;max-height:30px}.searchBox input:focus{border:1px solid #66AFE9!important}.columnsBox{display:block;padding:8px;overflow:hidden;background-color:#f8f8f8;max-height:165px;overflow-y:scroll}.columnDiv{color:#3d3d3d;background-color:#fff;cursor:pointer;border:1px solid rgba(0,0,0,.15)}.columnDiv .span-container{width:98%;display:flex;justify-content:space-between;padding:3px}::ng-deep .mat-tooltip{max-width:500px!important;color:#fff!important}.columnDiv:hover{color:#515151!important;background-image:linear-gradient(#ebebeb,#ebebeb)}:host ::ng-deep .column-selector-search-box .mat-form-field-wrapper{margin:0!important;padding:0;width:330px}.column-numbers{display:flex;justify-content:flex-start;gap:15px;margin:2px 5px}.display-name-container{width:90%}.ellipsis{text-overflow:ellipsis!important;overflow:hidden;white-space:nowrap}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; }, propDecorators: { searchColumnInput: [{
                type: ViewChild,
                args: ['SearchColumnInput']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9ncmlkL3NyYy9jb2x1bW4tc2VsZWN0b3IvY29sdW1uLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9ncmlkL3NyYy9jb2x1bW4tc2VsZWN0b3IvY29sdW1uLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsU0FBUyxFQUE2QixTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFckUsT0FBTyxFQUNMLGVBQWUsRUFFZixlQUFlLEdBQ2hCLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7QUFPbEMsTUFBTSxPQUFPLHVCQUF1QjtJQWNsQyxZQUNFLGFBQW9ELEVBQ3BCLElBQUk7UUFBSixTQUFJLEdBQUosSUFBSSxDQUFBO1FBVnRDLG9CQUFlLEdBQVUsRUFBRSxDQUFDO1FBRTVCLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFDbEIsWUFBTyxHQUFHLE9BQU8sQ0FBQztRQUNsQixvQkFBZSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBT3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJ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Q0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxxQkFBcUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDcEUsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQSxFQUFFLENBQUEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM1RCxDQUFDOztxSEF2RlUsdUJBQXVCLDhDQWdCeEIsZUFBZTt5R0FoQmQsdUJBQXVCLHdMQ2hCcEMsczlEQW1EQTs0RkRuQ2EsdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLDBCQUEwQjs7MEJBb0JqQyxNQUFNOzJCQUFDLGVBQWU7NENBWk8saUJBQWlCO3NCQUFoRCxTQUFTO3VCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1ub2NoZWNrXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZhQ2hlY2ssIGZhWG1hcmsgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyBDb2xEZWYgfSBmcm9tICdhZy1ncmlkLWNvbW11bml0eSc7XHJcbmltcG9ydCB7XHJcbiAgTWF0RGlhbG9nQ29uZmlnLFxyXG4gIE1hdERpYWxvZ1JlZixcclxuICBNQVRfRElBTE9HX0RBVEEsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3RsLWdyaWQtY29sdW1uLXNlbGVjdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sdW1uLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb2x1bW4tc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb2x1bW5EZWZzOiBDb2xEZWZbXTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnU2VhcmNoQ29sdW1uSW5wdXQnKSBzZWFyY2hDb2x1bW5JbnB1dCE6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGZpbHRlcmVkQ29sdW1uczogYW55W10gPSBbXTtcclxuXHJcbiAgZmFDaGVjayA9IGZhQ2hlY2s7XHJcbiAgZmFYbWFyayA9IGZhWG1hcms7XHJcbiAgbWF0RGlhbG9nQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XHJcbiAgY2FsbGJhY2s6IChhcnI6IHN0cmluZ1tdLCBmbGFnOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgX21hdERpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbHVtblNlbGVjdG9yQ29tcG9uZW50PjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHRyaWdnZXJFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgX21hdERpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbHVtblNlbGVjdG9yQ29tcG9uZW50PixcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YSkge1xyXG4gICAgdGhpcy5fbWF0RGlhbG9nUmVmID0gX21hdERpYWxvZ1JlZjtcclxuICAgIHRoaXMudHJpZ2dlckVsZW1lbnRSZWYgPSBkYXRhLnRyaWdnZXI7XHJcbiAgICB0aGlzLmNvbHVtbkRlZnMgPSBkYXRhLmNvbHVtbkRlZnM7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gZGF0YS5jYWxsYmFjaztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWFyY2hDb2x1bW5CeVN0cmluZygnJyk7XHJcbiAgICB0aGlzLnVwZGF0ZU1hdERpYWxvZ1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG4gIHVwZGF0ZU1hdERpYWxvZ1Bvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVjdCA9XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgLy8ocmVjdC5sZWZ0LCByZWN0LnJpZ2h0KTtcclxuICAgIHRoaXMubWF0RGlhbG9nQ29uZmlnLnBvc2l0aW9uID0ge1xyXG4gICAgICAgIC8vIGxlZnQ6IGAke3JlY3QubGVmdC0yODB9cHhgLFxyXG4gICAgICAgIHJpZ2h0OiBgJHt3aW5kb3cuaW5uZXJXaWR0aCAtIHJlY3QucmlnaHQgLSAyMH1weGAsXHJcbiAgICAgICAgdG9wOiBgJHtyZWN0LmJvdHRvbSArIDEwfXB4YCxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tYXREaWFsb2dDb25maWcud2lkdGggPSAnMzcwcHgnO1xyXG4gICAgdGhpcy5tYXREaWFsb2dDb25maWcubWluSGVpZ2h0ID0gJzMwMHB4JztcclxuXHJcbiAgICB0aGlzLl9tYXREaWFsb2dSZWYudXBkYXRlU2l6ZShcclxuICAgICAgICB0aGlzLm1hdERpYWxvZ0NvbmZpZy53aWR0aCxcclxuICAgICAgICB0aGlzLm1hdERpYWxvZ0NvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fbWF0RGlhbG9nUmVmLnVwZGF0ZVBvc2l0aW9uKHRoaXMubWF0RGlhbG9nQ29uZmlnLnBvc2l0aW9uKTtcclxufVxyXG4gIHRvZ2dsZURpc3BsYXlWYWx1ZShjb2x1bW46IGFueSk6IHZvaWQge1xyXG4gICAgY29sdW1uLnZpc2libGUgPSAhY29sdW1uLnZpc2libGU7XHJcbiAgICB0aGlzLmNhbGxiYWNrKFtjb2x1bW4uZmllbGRdLCBjb2x1bW4udmlzaWJsZSk7XHJcbiAgfVxyXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0QWxsQnkodHJ1ZSk7XHJcbiAgfVxyXG4gIHNlbGVjdE5vbmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdEFsbEJ5KGZhbHNlKTtcclxuICB9XHJcbiAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdEFsbEJ5KHRydWUpO1xyXG4gIH1cclxuICBzZWxlY3RBbGxCeShmbGFnOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpbHRlcmVkQ29sdW1ucyA9IHRoaXMuY29sdW1uRGVmcy5tYXAoKGl0OiBhbnkpID0+e1xyXG4gICAgICBpdC52aXNpYmxlPWZsYWc7XHJcbiAgICAgIHJldHVybiBpdDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYWxsYmFjayh0aGlzLmNvbHVtbkRlZnMuZmlsdGVyKGl0PT5pdC5maWVsZCkubWFwKChpdDogYW55KT0+aXQuZmllbGQpLCBmbGFnKTtcclxuICB9XHJcbiAgYXBwbHlGaWx0ZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBsZXQgZmlsdGVyVmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIHRoaXMuc2VhcmNoQ29sdW1uQnlTdHJpbmcoZmlsdGVyVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoQ29sdW1uQnlTdHJpbmcoZmlsdGVyVmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5maWx0ZXJlZENvbHVtbnMgPSB0aGlzLmNvbHVtbkRlZnNcclxuICAgIC5maWx0ZXIoKGNvbHVtbjogYW55KSA9PiBjb2x1bW4uaGVhZGVyTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclNlYXJjaEJveCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VhcmNoQ29sdW1uSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5zZWFyY2hDb2x1bW5CeVN0cmluZygnJyk7XHJcbiAgfVxyXG4gIGNoZWNrQ29sdW1uSW5wdXRWYWx1ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaENvbHVtbklucHV0Py5uYXRpdmVFbGVtZW50LnZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRDaGVja2VkTGVuKCk6IG51bWJlcntcclxuICAgIHJldHVybiB0aGlzLmZpbHRlcmVkQ29sdW1ucy5maWx0ZXIoaXQ9Pml0LnZpc2libGUpLmxlbmd0aDtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJoZWFkZXJCb3hcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnNCb3hcIj5cclxuICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic2VsZWN0QWxsKClcIj5cclxuICAgICAgICAgICAgICDinJMgU2VsZWN0IEFsbFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNlbGVjdE5vbmUoKVwiPlxyXG4gICAgICAgICAgICAgIMOXIFNlbGVjdCBOb25lXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJ3YXJuXCIgKGNsaWNrKT1cInJlc2V0KClcIj5cclxuICAgICAgICAgICAgICA8c3Bhbj7ihrYgUmVzZXQ8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIFxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LWZ1bGxcIj5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgI1NlYXJjaENvbHVtbklucHV0XHJcbiAgICAgICAgICAgICAgICAgIGFwcElucHV0Rm9jdXNcclxuICAgICAgICAgICAgICAgICAgbWF0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIlxyXG4gICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAoa2V5dXApPVwiYXBwbHlGaWx0ZXIoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgKm5nSWY9XCJjaGVja0NvbHVtbklucHV0VmFsdWUoKVwiIChjbGljayk9XCJjbGVhclNlYXJjaEJveCgpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbi1udW1iZXJzXCI+XHJcbiAgICAgICAgICA8cD5Ub3RhbDoge3tjb2x1bW5EZWZzLmxlbmd0aH19PC9wPlxyXG4gICAgICAgICAgPHA+RGlzcGxheWVkOiB7e2dldENoZWNrZWRMZW4oKX19PC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiY29sdW1uc0JveFwiPlxyXG4gICAgICA8bWF0LWdyaWQtbGlzdCBjb2xzPVwiMVwiIHJvd0hlaWdodD1cIjE6MC4wOVwiPlxyXG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGZpbHRlcmVkQ29sdW1uczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgPG1hdC1ncmlkLXRpbGVcclxuICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbkRpdlwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZURpc3BsYXlWYWx1ZShjb2x1bW4pXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bhbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXNwbGF5LW5hbWUtY29udGFpbmVyIGVsbGlwc2lzXCIgW21hdFRvb2x0aXBdPSdjb2x1bW4uaGVhZGVyTmFtZSc+e3sgY29sdW1uLmhlYWRlck5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY29sdW1uLnZpc2libGVcIj7inJM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L21hdC1ncmlkLXRpbGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8L21hdC1ncmlkLWxpc3Q+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=