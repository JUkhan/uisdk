import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FuseUtilsService {
    /**
     * Constructor
     */
    constructor() {
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
     */
    get exactMatchOptions() {
        return {
            paths: 'exact',
            fragment: 'ignored',
            matrixParams: 'ignored',
            queryParams: 'exact'
        };
    }
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
     */
    get subsetMatchOptions() {
        return {
            paths: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
            queryParams: 'subset'
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';
        for (let i = 0; i < 10; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return name;
    }
}
FuseUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FuseUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay9mdXNlL3NlcnZpY2VzL3NyYy91dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFekI7O09BRUc7SUFDSDtJQUVBLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsY0FBYztJQUNkLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILElBQUksaUJBQWlCO1FBRWpCLE9BQU87WUFDSCxLQUFLLEVBQVMsT0FBTztZQUNyQixRQUFRLEVBQU0sU0FBUztZQUN2QixZQUFZLEVBQUUsU0FBUztZQUN2QixXQUFXLEVBQUcsT0FBTztTQUN4QixDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxrQkFBa0I7UUFFbEIsT0FBTztZQUNILEtBQUssRUFBUyxRQUFRO1lBQ3RCLFFBQVEsRUFBTSxTQUFTO1lBQ3ZCLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLFdBQVcsRUFBRyxRQUFRO1NBQ3pCLENBQUM7SUFDTixDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxTQUFpQixFQUFFO1FBRXhCLE1BQU0sS0FBSyxHQUFHLGdFQUFnRSxDQUFDO1FBQy9FLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQzVCO1lBQ0ksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs4R0EzRFEsZ0JBQWdCO2tIQUFoQixnQkFBZ0IsY0FGYixNQUFNOzRGQUVULGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElzQWN0aXZlTWF0Y2hPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVzZVV0aWxzU2VydmljZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQCBBY2Nlc3NvcnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGVxdWl2YWxlbnQgXCJJc0FjdGl2ZU1hdGNoT3B0aW9uc1wiIG9wdGlvbnMgZm9yIFwiZXhhY3QgPSB0cnVlXCIuXHJcbiAgICAgKi9cclxuICAgIGdldCBleGFjdE1hdGNoT3B0aW9ucygpOiBJc0FjdGl2ZU1hdGNoT3B0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhdGhzICAgICAgIDogJ2V4YWN0JyxcclxuICAgICAgICAgICAgZnJhZ21lbnQgICAgOiAnaWdub3JlZCcsXHJcbiAgICAgICAgICAgIG1hdHJpeFBhcmFtczogJ2lnbm9yZWQnLFxyXG4gICAgICAgICAgICBxdWVyeVBhcmFtcyA6ICdleGFjdCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBlcXVpdmFsZW50IFwiSXNBY3RpdmVNYXRjaE9wdGlvbnNcIiBvcHRpb25zIGZvciBcImV4YWN0ID0gZmFsc2VcIi5cclxuICAgICAqL1xyXG4gICAgZ2V0IHN1YnNldE1hdGNoT3B0aW9ucygpOiBJc0FjdGl2ZU1hdGNoT3B0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhdGhzICAgICAgIDogJ3N1YnNldCcsXHJcbiAgICAgICAgICAgIGZyYWdtZW50ICAgIDogJ2lnbm9yZWQnLFxyXG4gICAgICAgICAgICBtYXRyaXhQYXJhbXM6ICdpZ25vcmVkJyxcclxuICAgICAgICAgICAgcXVlcnlQYXJhbXMgOiAnc3Vic2V0J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSByYW5kb20gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHJhbmRvbUlkKGxlbmd0aDogbnVtYmVyID0gMTApOiBzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgMTA7IGkrKyApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==