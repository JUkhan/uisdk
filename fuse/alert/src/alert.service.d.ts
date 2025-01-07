import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FuseAlertService {
    private readonly _onDismiss;
    private readonly _onShow;
    /**
     * Constructor
     */
    constructor();
    /**
     * Getter for onDismiss
     */
    get onDismiss(): Observable<any>;
    /**
     * Getter for onShow
     */
    get onShow(): Observable<any>;
    /**
     * Dismiss the alert
     *
     * @param name
     */
    dismiss(name: string): void;
    /**
     * Show the dismissed alert
     *
     * @param name
     */
    show(name: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FuseAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FuseAlertService>;
}
