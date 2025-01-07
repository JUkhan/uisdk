import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export class FuseAlertService {
    /**
     * Constructor
     */
    constructor() {
        this._onDismiss = new ReplaySubject(1);
        this._onShow = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for onDismiss
     */
    get onDismiss() {
        return this._onDismiss.asObservable();
    }
    /**
     * Getter for onShow
     */
    get onShow() {
        return this._onShow.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Dismiss the alert
     *
     * @param name
     */
    dismiss(name) {
        // Return if the name is not provided
        if (!name) {
            return;
        }
        // Execute the observable
        this._onDismiss.next(name);
    }
    /**
     * Show the dismissed alert
     *
     * @param name
     */
    show(name) {
        // Return if the name is not provided
        if (!name) {
            return;
        }
        // Execute the observable
        this._onShow.next(name);
    }
}
FuseAlertService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseAlertService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FuseAlertService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseAlertService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseAlertService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9mdXNlL2FsZXJ0L3NyYy9hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLakQsTUFBTSxPQUFPLGdCQUFnQjtJQUt6Qjs7T0FFRztJQUNIO1FBTmlCLGVBQVUsR0FBMEIsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakUsWUFBTyxHQUEwQixJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQU8vRSxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLGNBQWM7SUFDZCx3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxJQUFJLFNBQVM7UUFFVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxNQUFNO1FBRU4sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLElBQVk7UUFFaEIscUNBQXFDO1FBQ3JDLElBQUssQ0FBQyxJQUFJLEVBQ1Y7WUFDSSxPQUFPO1NBQ1Y7UUFFRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsSUFBWTtRQUViLHFDQUFxQztRQUNyQyxJQUFLLENBQUMsSUFBSSxFQUNWO1lBQ0ksT0FBTztTQUNWO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7OzhHQXBFUSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQUZiLE1BQU07NEZBRVQsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGdXNlQWxlcnRTZXJ2aWNlXHJcbntcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX29uRGlzbWlzczogUmVwbGF5U3ViamVjdDxzdHJpbmc+ID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigxKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX29uU2hvdzogUmVwbGF5U3ViamVjdDxzdHJpbmc+ID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigxKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQCBBY2Nlc3NvcnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0ZXIgZm9yIG9uRGlzbWlzc1xyXG4gICAgICovXHJcbiAgICBnZXQgb25EaXNtaXNzKCk6IE9ic2VydmFibGU8YW55PlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vbkRpc21pc3MuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0ZXIgZm9yIG9uU2hvd1xyXG4gICAgICovXHJcbiAgICBnZXQgb25TaG93KCk6IE9ic2VydmFibGU8YW55PlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vblNob3cuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNtaXNzIHRoZSBhbGVydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKi9cclxuICAgIGRpc21pc3MobmFtZTogc3RyaW5nKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8vIFJldHVybiBpZiB0aGUgbmFtZSBpcyBub3QgcHJvdmlkZWRcclxuICAgICAgICBpZiAoICFuYW1lIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIG9ic2VydmFibGVcclxuICAgICAgICB0aGlzLl9vbkRpc21pc3MubmV4dChuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIGRpc21pc3NlZCBhbGVydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKi9cclxuICAgIHNob3cobmFtZTogc3RyaW5nKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8vIFJldHVybiBpZiB0aGUgbmFtZSBpcyBub3QgcHJvdmlkZWRcclxuICAgICAgICBpZiAoICFuYW1lIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIG9ic2VydmFibGVcclxuICAgICAgICB0aGlzLl9vblNob3cubmV4dChuYW1lKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19