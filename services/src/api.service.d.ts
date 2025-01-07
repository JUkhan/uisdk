import { Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
type ApiOptions = {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
};
type DeleteApiOptions = ApiOptions & {
    body?: any | null;
};
export declare class ApiService {
    private http;
    private env;
    constructor(http: HttpClient, env: any);
    get<T>(url: string, options?: ApiOptions): Observable<T>;
    post<T>(url: string, payload?: any, options?: ApiOptions): Observable<T>;
    delete<T>(url: string, options?: DeleteApiOptions): Observable<T>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApiService>;
}
export {};
