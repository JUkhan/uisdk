import { IsActiveMatchOptions } from '@angular/router';
import * as i0 from "@angular/core";
export declare class FuseUtilsService {
    /**
     * Constructor
     */
    constructor();
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
     */
    get exactMatchOptions(): IsActiveMatchOptions;
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
     */
    get subsetMatchOptions(): IsActiveMatchOptions;
    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FuseUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FuseUtilsService>;
}
