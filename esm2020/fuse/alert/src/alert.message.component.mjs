import { Component, Inject } from '@angular/core';
import { FuseAlertModule } from './alert.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "./alert.component";
export class AlertMessageComponent {
    constructor(data) {
        this.data = data;
    }
    ngOnInit() {
    }
}
AlertMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageComponent, deps: [{ token: MAT_SNACK_BAR_DATA }], target: i0.ɵɵFactoryTarget.Component });
AlertMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AlertMessageComponent, isStandalone: true, selector: "app-alert-message", ngImport: i0, template: `
            <fuse-alert [type]="data.type">
                <span fuseAlertTitle>{{data.messageTitle}}</span>
                {{data.messageBody}}
            </fuse-alert>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FuseAlertModule }, { kind: "component", type: i1.FuseAlertComponent, selector: "fuse-alert", inputs: ["appearance", "dismissed", "dismissible", "name", "showIcon", "type"], outputs: ["dismissedChanged"], exportAs: ["fuseAlert"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-alert-message',
                    standalone: true,
                    imports: [FuseAlertModule],
                    template: `
            <fuse-alert [type]="data.type">
                <span fuseAlertTitle>{{data.messageTitle}}</span>
                {{data.messageBody}}
            </fuse-alert>
  `
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQubWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvZnVzZS9hbGVydC9zcmMvYWxlcnQubWVzc2FnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRWhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFhakUsTUFBTSxPQUFPLHFCQUFxQjtJQUU5QixZQUErQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztJQUFJLENBQUM7SUFFN0QsUUFBUTtJQUNSLENBQUM7O21IQUxRLHFCQUFxQixrQkFFVixrQkFBa0I7dUdBRjdCLHFCQUFxQiw2RUFQcEI7Ozs7O0dBS1gsMkRBTlcsZUFBZTs0RkFRaEIscUJBQXFCO2tCQVhqQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7R0FLWDtpQkFDRjs7MEJBR2dCLE1BQU07MkJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZ1c2VBbGVydE1vZHVsZSB9IGZyb20gJy4vYWxlcnQubW9kdWxlJ1xyXG5cclxuaW1wb3J0IHsgTUFUX1NOQUNLX0JBUl9EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtYWxlcnQtbWVzc2FnZScsXHJcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gICAgaW1wb3J0czogW0Z1c2VBbGVydE1vZHVsZV0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICA8ZnVzZS1hbGVydCBbdHlwZV09XCJkYXRhLnR5cGVcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGZ1c2VBbGVydFRpdGxlPnt7ZGF0YS5tZXNzYWdlVGl0bGV9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHt7ZGF0YS5tZXNzYWdlQm9keX19XHJcbiAgICAgICAgICAgIDwvZnVzZS1hbGVydD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbGVydE1lc3NhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoTUFUX1NOQUNLX0JBUl9EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbn0iXX0=