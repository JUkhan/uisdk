var _SidebarService_drawer, _SidebarService_sidebarContainerRef;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs';
import { action$, dispatch } from './state';
import * as i0 from "@angular/core";
export class SidebarService {
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
        return action$.isA(DataPassThroughSidebar).pipe(filter(it => it.type === key), map(it => it.data));
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
export class SidebarWidth {
    constructor(width) {
        this.width = width;
    }
}
export class DataPassThroughSidebar {
    constructor(data, type) {
        this.data = data;
        this.type = type;
    }
}
export class SidebarBackdrop {
    constructor(isBackdropOn) {
        this.isBackdropOn = isBackdropOn;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzL3NyYy9zaWRlYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQVUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFNcEQsTUFBTSxPQUFPLGNBQWM7SUFIM0I7UUFJRSx5Q0FBcUI7UUFDckIsc0RBQXdDO0tBMEN6QztJQXpDQyxJQUFJLE1BQU07UUFDUixPQUFPLHVCQUFBLElBQUksOEJBQVEsQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxtQkFBbUI7UUFDckIsT0FBTyx1QkFBQSxJQUFJLDJDQUFxQixDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLFlBQVksQ0FBQyxLQUFhO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFJLFlBQVksQ0FBQyxLQUFjO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxTQUFTLENBQUMsTUFBa0IsRUFBRSxTQUEyQjtRQUN2RCxJQUFJLENBQUMsdUJBQUEsSUFBSSw4QkFBUSxFQUFFO1lBQ2pCLHVCQUFBLElBQUksMEJBQVcsTUFBTSxNQUFBLENBQUM7WUFDdEIsdUJBQUEsSUFBSSx1Q0FBd0IsU0FBUyxNQUFBLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxPQUFPLENBQUMsSUFBUyxFQUFFLEdBQUcsR0FBQyxFQUFFO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxHQUFDLEVBQUU7UUFDWixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQSxFQUFFLENBQUEsRUFBRSxDQUFDLElBQUksS0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFBLEVBQUUsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBQ0QsU0FBUztRQUNQLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0Qsb0NBQW9DLENBQ2xDLGFBQTBDO1FBRTFDLHVCQUFBLElBQUksMkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsdUJBQUEsSUFBSSwyQ0FBcUIsQ0FBQyxlQUFlLENBQU0sYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZGLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OzRHQTNDVSxjQUFjO2dIQUFkLGNBQWMsY0FGYixNQUFNOzRGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COztBQStDRCxNQUFNLE9BQU8sWUFBWTtJQUV2QixZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFJLENBQUM7Q0FDdEM7QUFDRCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQW1CLElBQVMsRUFBUyxJQUFTO1FBQTNCLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUksQ0FBQztDQUNwRDtBQUVELE1BQU0sT0FBTyxlQUFlO0lBRTFCLFlBQW1CLFlBQXFCO1FBQXJCLGlCQUFZLEdBQVosWUFBWSxDQUFTO0lBQUksQ0FBQztDQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBY3Rpb24sIGFjdGlvbiQsIGRpc3BhdGNoIH0gZnJvbSAnLi9zdGF0ZSc7XHJcblxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lkZWJhclNlcnZpY2Uge1xyXG4gICNkcmF3ZXIhOiBNYXRTaWRlbmF2O1xyXG4gICNzaWRlYmFyQ29udGFpbmVyUmVmITogVmlld0NvbnRhaW5lclJlZjtcclxuICBnZXQgZHJhd2VyKCk6IE1hdFNpZGVuYXYge1xyXG4gICAgcmV0dXJuIHRoaXMuI2RyYXdlcjtcclxuICB9XHJcbiAgZ2V0IHNpZGViYXJDb250YWluZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XHJcbiAgICByZXR1cm4gdGhpcy4jc2lkZWJhckNvbnRhaW5lclJlZjtcclxuICB9XHJcbiAgc2V0IHNpZGViYXJXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcbiAgICBkaXNwYXRjaChuZXcgU2lkZWJhcldpZHRoKHdpZHRoKSk7XHJcbiAgfVxyXG4gIHNldCBpc0JhY2tkcm9wT24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICBkaXNwYXRjaChuZXcgU2lkZWJhckJhY2tkcm9wKHZhbHVlKSk7XHJcbiAgfVxyXG4gIGFkZERyYXdlcihkcmF3ZXI6IE1hdFNpZGVuYXYsIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLiNkcmF3ZXIpIHtcclxuICAgICAgdGhpcy4jZHJhd2VyID0gZHJhd2VyO1xyXG4gICAgICB0aGlzLiNzaWRlYmFyQ29udGFpbmVyUmVmID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG4gIH1cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXIub3BlbigpO1xyXG4gIH1cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlKCk7XHJcbiAgfVxyXG4gIHNldERhdGEoZGF0YTogYW55LCBrZXk9JycpOiB2b2lkIHtcclxuICAgIGRpc3BhdGNoKG5ldyBEYXRhUGFzc1Rocm91Z2hTaWRlYmFyKGRhdGEsIGtleSkpO1xyXG4gIH1cclxuICBnZXREYXRhKGtleT0nJyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gYWN0aW9uJC5pc0EoRGF0YVBhc3NUaHJvdWdoU2lkZWJhcikucGlwZShmaWx0ZXIoaXQ9Pml0LnR5cGU9PT1rZXkpLCBtYXAoaXQ9Pml0LmRhdGEpKTtcclxuICB9XHJcbiAgY2xlYXJEYXRhKCk6IHZvaWR7XHJcbiAgICBkaXNwYXRjaCgnY2xlYXJEYXRhJyk7XHJcbiAgfVxyXG4gIG9wZW5UYWJsZVNpZGViYXJXaXRoRHluYW1pY0NvbXBvbmVudChcclxuICAgIGNvbXBvbmVudERhdGE6IER5bmFtaWNTaWRlYmFyQ29tcG9uZW50RGF0YVxyXG4gICk6IHZvaWQge1xyXG4gICAgdGhpcy4jc2lkZWJhckNvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgY29uc3QgcmVmID0gdGhpcy4jc2lkZWJhckNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQ8YW55Pihjb21wb25lbnREYXRhLmNvbXBvbmVudFJlZik7XHJcbiAgICByZWYuaW5zdGFuY2UuZGF0YSA9IGNvbXBvbmVudERhdGEucm93RGF0YTtcclxuICAgIHRoaXMub3BlbigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGViYXJXaWR0aCBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgdHlwZTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aDogbnVtYmVyKSB7IH1cclxufVxyXG5leHBvcnQgY2xhc3MgRGF0YVBhc3NUaHJvdWdoU2lkZWJhciBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6IGFueSwgcHVibGljIHR5cGU6IGFueSkgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyQmFja2Ryb3AgaW1wbGVtZW50cyBBY3Rpb24ge1xyXG4gIHR5cGU6IGFueTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaXNCYWNrZHJvcE9uOiBib29sZWFuKSB7IH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNTaWRlYmFyQ29tcG9uZW50RGF0YSB7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgcm93RGF0YTogYW55O1xyXG59XHJcbiJdfQ==