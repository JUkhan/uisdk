import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiService {
    constructor(http, env) {
        this.http = http;
        this.env = env;
    }
    get(url, options) {
        return this.http.get(this.getUrl(url), options);
    }
    post(url, payload, options) {
        return this.http.post(this.getUrl(url), payload, options);
    }
    delete(url, options) {
        return this.http.delete(this.getUrl(url), options);
    }
    getUrl(url) {
        return this.env.apiBaseUrl + url;
    }
}
ApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, deps: [{ token: i1.HttpClient }, { token: 'env' }], target: i0.ɵɵFactoryTarget.Injectable });
ApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['env']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvc2VydmljZXMvc3JjL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFzQ25ELE1BQU0sT0FBTyxVQUFVO0lBRW5CLFlBQW9CLElBQWdCLEVBQTBCLEdBQVE7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUEwQixRQUFHLEdBQUgsR0FBRyxDQUFLO0lBRXRFLENBQUM7SUFFRCxHQUFHLENBQUksR0FBVyxFQUFFLE9BQW9CO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBSSxDQUFJLEdBQVcsRUFBRSxPQUFhLEVBQUUsT0FBb0I7UUFDcEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsTUFBTSxDQUFJLEdBQVcsRUFBRSxPQUEwQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNPLE1BQU0sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDO0lBQ25DLENBQUM7O3dHQW5CUSxVQUFVLDRDQUU0QixLQUFLOzRHQUYzQyxVQUFVLGNBRlAsTUFBTTs0RkFFVCxVQUFVO2tCQUh0QixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7MEJBRzJDLE1BQU07MkJBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgICBIdHRwQ2xpZW50LFxyXG4gICAgSHR0cENvbnRleHQsXHJcbiAgICBIdHRwSGVhZGVycyxcclxuICAgIEh0dHBQYXJhbXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxudHlwZSBBcGlPcHRpb25zID0ge1xyXG4gICAgaGVhZGVycz86XHJcbiAgICAgICAgfCBIdHRwSGVhZGVyc1xyXG4gICAgICAgIHwge1xyXG4gICAgICAgIFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gICAgfTtcclxuICAgIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcclxuICAgIG9ic2VydmU/OiAnYm9keSc7XHJcbiAgICBwYXJhbXM/OlxyXG4gICAgICAgIHwgSHR0cFBhcmFtc1xyXG4gICAgICAgIHwge1xyXG4gICAgICAgIFtwYXJhbTogc3RyaW5nXTpcclxuICAgICAgICAgICAgfCBzdHJpbmdcclxuICAgICAgICAgICAgfCBudW1iZXJcclxuICAgICAgICAgICAgfCBib29sZWFuXHJcbiAgICAgICAgICAgIHwgUmVhZG9ubHlBcnJheTxzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuPjtcclxuICAgIH07XHJcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47XHJcbiAgICByZXNwb25zZVR5cGU/OiAnanNvbic7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBEZWxldGVBcGlPcHRpb25zID0gQXBpT3B0aW9ucyAmIHtcclxuICAgIGJvZHk/OiBhbnkgfCBudWxsO1xyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgIEBJbmplY3QoJ2VudicpIHByaXZhdGUgZW52OiBhbnkpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQ8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBBcGlPcHRpb25zKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VD4odGhpcy5nZXRVcmwodXJsKSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdDxUPih1cmw6IHN0cmluZywgcGF5bG9hZD86IGFueSwgb3B0aW9ucz86IEFwaU9wdGlvbnMpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odGhpcy5nZXRVcmwodXJsKSwgcGF5bG9hZCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlPFQ+KHVybDogc3RyaW5nLCBvcHRpb25zPzogRGVsZXRlQXBpT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPFQ+KHRoaXMuZ2V0VXJsKHVybCksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52LmFwaUJhc2VVcmwrdXJsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==