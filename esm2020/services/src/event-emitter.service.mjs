import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class EventEmitterService {
    constructor() {
        this.clickEventEmitter = new EventEmitter();
    }
    emitClickEvent(res) {
        this.clickEventEmitter.emit(res);
    }
    getClickEventEmitter() {
        return this.clickEventEmitter;
    }
}
EventEmitterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EventEmitterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EventEmitterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZW1pdHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzL3NyYy9ldmVudC1lbWl0dGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBS3pELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUI7UUFEQSxzQkFBaUIsR0FBQyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQzdCLENBQUM7SUFDakIsY0FBYyxDQUFDLEdBQVE7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7O2lIQVRVLG1CQUFtQjtxSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07NEZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyU2VydmljZSB7XHJcblxyXG4gIGNsaWNrRXZlbnRFbWl0dGVyPW5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgZW1pdENsaWNrRXZlbnQocmVzOiBhbnkpOiB2b2lke1xyXG4gICAgdGhpcy5jbGlja0V2ZW50RW1pdHRlci5lbWl0KHJlcyk7XHJcbiAgfVxyXG4gIGdldENsaWNrRXZlbnRFbWl0dGVyKCk6IEV2ZW50RW1pdHRlcjxvYmplY3Q+IHtcclxuICAgIHJldHVybiB0aGlzLmNsaWNrRXZlbnRFbWl0dGVyO1xyXG4gIH1cclxufVxyXG4iXX0=