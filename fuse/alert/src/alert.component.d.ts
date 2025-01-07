import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { FuseAlertAppearance, FuseAlertType } from './alert.types';
import { FuseAlertService } from './alert.service';
import { FuseUtilsService } from '@streamstech/ui-sdk/fuse/services';
import * as i0 from "@angular/core";
export declare class FuseAlertComponent implements OnChanges, OnInit, OnDestroy {
    private _changeDetectorRef;
    private _fuseAlertService;
    private _fuseUtilsService;
    static ngAcceptInputType_dismissible: BooleanInput;
    static ngAcceptInputType_dismissed: BooleanInput;
    static ngAcceptInputType_showIcon: BooleanInput;
    appearance: FuseAlertAppearance;
    dismissed: boolean;
    dismissible: boolean;
    name: string;
    showIcon: boolean;
    type: FuseAlertType;
    readonly dismissedChanged: EventEmitter<boolean>;
    private _unsubscribeAll;
    /**
     * Constructor
     */
    constructor(_changeDetectorRef: ChangeDetectorRef, _fuseAlertService: FuseAlertService, _fuseUtilsService: FuseUtilsService);
    /**
     * Host binding for component classes
     */
    get classList(): any;
    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Dismiss the alert
     */
    dismiss(): void;
    /**
     * Show the dismissed alert
     */
    show(): void;
    /**
     * Dismiss/show the alert
     *
     * @param dismissed
     * @private
     */
    private _toggleDismiss;
    static ɵfac: i0.ɵɵFactoryDeclaration<FuseAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FuseAlertComponent, "fuse-alert", ["fuseAlert"], { "appearance": "appearance"; "dismissed": "dismissed"; "dismissible": "dismissible"; "name": "name"; "showIcon": "showIcon"; "type": "type"; }, { "dismissedChanged": "dismissedChanged"; }, never, ["[fuseAlertIcon]", "[fuseAlertTitle]", "*"], false, never>;
}
