import { Injectable } from '@angular/core';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
//import moment from 'moment';
const moment = {};
export class DateTimeService {
    constructor(http) {
        this.http = http;
    }
    formatDate(date) {
        return moment(date).format(ConstantService.DateFormat.DATEFORMAT_DD_MM_YYYY);
    }
    formatDateTime(date) {
        return moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
    }
    formatDateWithTime(date) {
        const formattedDate = moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
        return formattedDate;
    }
    isInvalidDate(date) {
        // try to use moment to check the valid date
        return date === '0001-01-01T00:00:00' || !date;
    }
}
DateTimeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DateTimeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateTimeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvc2VydmljZXMvc3JjL2RhdGUtdGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUFDaEUsOEJBQThCO0FBQzlCLE1BQU0sTUFBTSxHQUFLLEVBQUUsQ0FBQztBQUlwQixNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6QyxVQUFVLENBQUMsSUFBUztRQUNsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBUztRQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxJQUFTO1FBQzFCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBUztRQUNyQiw0Q0FBNEM7UUFDNUMsT0FBTyxJQUFJLEtBQUsscUJBQXFCLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQzs7NkdBakJVLGVBQWU7aUhBQWYsZUFBZSxjQUZkLE1BQU07NEZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50U2VydmljZSB9IGZyb20gJ0BzdHJlYW1zdGVjaC91aS1zZGsvY29uc3RhbnRzJztcclxuLy9pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmNvbnN0IG1vbWVudDphbnk9e307XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgZm9ybWF0RGF0ZShkYXRlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoQ29uc3RhbnRTZXJ2aWNlLkRhdGVGb3JtYXQuREFURUZPUk1BVF9ERF9NTV9ZWVlZKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdERhdGVUaW1lKGRhdGU6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdChDb25zdGFudFNlcnZpY2UuRGF0ZUZvcm1hdC5EQVRFVElNRUZPUk1BVF9ERF9NTV9ZWVlZKTtcclxuICB9XHJcbiAgZm9ybWF0RGF0ZVdpdGhUaW1lKGRhdGU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbW9tZW50KGRhdGUpLmZvcm1hdChDb25zdGFudFNlcnZpY2UuRGF0ZUZvcm1hdC5EQVRFVElNRUZPUk1BVF9ERF9NTV9ZWVlZKTtcclxuICAgIHJldHVybiBmb3JtYXR0ZWREYXRlO1xyXG4gIH1cclxuICBpc0ludmFsaWREYXRlKGRhdGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gdHJ5IHRvIHVzZSBtb21lbnQgdG8gY2hlY2sgdGhlIHZhbGlkIGRhdGVcclxuICAgIHJldHVybiBkYXRlID09PSAnMDAwMS0wMS0wMVQwMDowMDowMCcgfHwgIWRhdGU7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=