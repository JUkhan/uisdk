import { Component, Input } from '@angular/core';
//import { FuseConfirmationService } from '@streamstech/ui-sdk/fuse/services';
import { dispatch } from '@streamstech/ui-sdk/services';
import * as i0 from "@angular/core";
import * as i1 from "@streamstech/ui-sdk/constants";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/tooltip";
export class ActionComponent {
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
export class EditAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
export class DeleteAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
export class CustomAction {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9ncmlkL3NyYy9hY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELDhFQUE4RTtBQUM5RSxPQUFPLEVBQVUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7OztBQTZCaEUsTUFBTSxPQUFPLGVBQWU7SUFHeEI7SUFDSSw0REFBNEQ7SUFDcEQsUUFBeUI7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFKNUIsMEJBQXFCLEdBQUMsS0FBSyxDQUFDO0lBSy9CLENBQUM7SUFDUCxNQUFNLENBQUMsTUFBVztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxPQUE2QjtRQUM3QyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBQ0QsYUFBYTtRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUU7WUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBeUJLO1NBQ1I7SUFDTCxDQUFDOzs2R0FoRFEsZUFBZTtpR0FBZixlQUFlLGdIQVhkOzs7Ozs7Ozs7R0FTWDs0RkFFVSxlQUFlO2tCQTNCM0IsU0FBUzsrQkFDSSxjQUFjLFlBZWQ7Ozs7Ozs7OztHQVNYO3NHQUdVLHFCQUFxQjtzQkFBN0IsS0FBSzs7QUFrRFYsTUFBTSxPQUFPLFVBQVU7SUFDbkIsWUFBbUIsSUFBUyxFQUFTLElBQU87UUFBekIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLFNBQUksR0FBSixJQUFJLENBQUc7SUFBRSxDQUFDO0NBQ2xEO0FBQ0QsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBbUIsSUFBUyxFQUFTLElBQU87UUFBekIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLFNBQUksR0FBSixJQUFJLENBQUc7SUFBRSxDQUFDO0NBQ2xEO0FBQ0QsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBbUIsSUFBUyxFQUFTLElBQU87UUFBekIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLFNBQUksR0FBSixJQUFJLENBQUc7SUFBRSxDQUFDO0NBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudFNlcnZpY2UgfSBmcm9tICdAc3RyZWFtc3RlY2gvdWktc2RrL2NvbnN0YW50cyc7XHJcbi8vaW1wb3J0IHsgRnVzZUNvbmZpcm1hdGlvblNlcnZpY2UgfSBmcm9tICdAc3RyZWFtc3RlY2gvdWktc2RrL2Z1c2Uvc2VydmljZXMnO1xyXG5pbXBvcnQgeyBBY3Rpb24sIGRpc3BhdGNoIH0gZnJvbSAnQHN0cmVhbXN0ZWNoL3VpLXNkay9zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ3JpZC1hY3Rpb25zJyxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAubWF0LWljb24ge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgcGFkZGluZzogMnB4IDVweDtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5tYXQtaWNvbjpob3ZlcntcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cInBhcmFtcz8uaGFzRWRpdFBlcm1pc3Npb25cIiAoY2xpY2spPVwiZWRpdFJvd0RhdGEoKVwiIG1hdFRvb2x0aXA9XCJlZGl0XCI+ZWRpdDwvbWF0LWljb24+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9XCJwYXJhbXM/Lmhhc0RlbGV0ZVBlcm1pc3Npb25cIiAoY2xpY2spPVwiZGVsZXRlUm93RGF0YSgpXCIgbWF0VG9vbHRpcD1cImRlbGV0ZVwiPmRlbGV0ZTwvbWF0LWljb24+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN1cHByZXNzQ3VzdG9tQnV0dG9uc1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgICpuZ0Zvcj1cImxldCBidG4gb2YgcGFyYW1zPy5jdXN0b21CdXR0b25zXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiAgKGNsaWNrKT1cImN1c3RvbUFjdGlvbkhhbmRsZXIoYnRuKVwiIFttYXRUb29sdGlwXT1cImJ0bi50b29sdGlwXCI+e3tidG4uaWNvbn19PC9tYXQtaWNvbj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInBhcmFtcy5idXR0b25UZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhcmFtcy5idXR0b25UZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF0YTpwYXJhbXMuZGF0YX1cIj48L25nLWNvbnRhaW5lcj5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aW9uQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIHN1cHByZXNzQ3VzdG9tQnV0dG9ucz1mYWxzZTtcclxuICAgIHB1YmxpYyBwYXJhbXM/OiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvL3ByaXZhdGUgX2Z1c2VDb25maXJtYXRpb25TZXJ2aWNlOiBGdXNlQ29uZmlybWF0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbnN0YW50OiBDb25zdGFudFNlcnZpY2VcclxuICAgICAgICApe31cclxuICAgIGFnSW5pdChwYXJhbXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG4gICAgY3VzdG9tQWN0aW9uSGFuZGxlcihidG5JbmZvOiB7YWN0aW9uTmFtZTogc3RyaW5nfSk6IHZvaWR7XHJcbiAgICAgICAgZGlzcGF0Y2gobmV3IEN1c3RvbUFjdGlvbihidG5JbmZvLmFjdGlvbk5hbWUsIHRoaXMucGFyYW1zPy5kYXRhKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYnRuSW5mby5hY3Rpb25OYW1lLCB0aGlzLnBhcmFtcz8uZGF0YSk7XHJcbiAgICB9XHJcbiAgICBlZGl0Um93RGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbXM/LmNydWRFZGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zPy5jcnVkRWRpdCh0aGlzLnBhcmFtcz8uZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlUm93RGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbXM/LmNydWREZWxldGUpIHtcclxuICAgICAgICAgICAgLyp0aGlzLl9mdXNlQ29uZmlybWF0aW9uU2VydmljZS5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBDb25zdGFudFNlcnZpY2UuTWVzc2FnZS5ERUxFVEVfU1VDQ0VTU0ZVTF9USVRMRSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLkRFTEVURV9TVUNDRVNTRlVMX01FU1NBR0UsXHJcbiAgICAgICAgICAgICAgICAvLyBtZXNzYWdlOiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzICR7dGhpcy5yb3cubW9kZWx9P2AsXHJcbiAgICAgICAgICAgICAgICBpY29uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnaGVyb2ljb25zX291dGxpbmU6ZXhjbGFtYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2FybicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdZZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3dhcm4nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGlzbWlzc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ2NvbmZpcm1lZCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcz8uY3J1ZERlbGV0ZSh0aGlzLnBhcmFtcz8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdEFjdGlvbjxUIGV4dGVuZHMgb2JqZWN0PiBpbXBsZW1lbnRzIEFjdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBhbnksIHB1YmxpYyBkYXRhOiBUKXt9XHJcbn1cclxuZXhwb3J0IGNsYXNzIERlbGV0ZUFjdGlvbjxUIGV4dGVuZHMgb2JqZWN0PiBpbXBsZW1lbnRzIEFjdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBhbnksIHB1YmxpYyBkYXRhOiBUKXt9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUFjdGlvbjxUIGV4dGVuZHMgb2JqZWN0PiBpbXBsZW1lbnRzIEFjdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBhbnksIHB1YmxpYyBkYXRhOiBUKXt9XHJcbn1cclxuIl19