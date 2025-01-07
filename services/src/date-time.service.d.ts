import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class DateTimeService {
    private http;
    constructor(http: HttpClient);
    formatDate(date: any): string;
    formatDateTime(date: any): string;
    formatDateWithTime(date: any): string;
    isInvalidDate(date: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateTimeService>;
}
