import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class EventEmitterService {
    clickEventEmitter: EventEmitter<object>;
    constructor();
    emitClickEvent(res: any): void;
    getClickEventEmitter(): EventEmitter<object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventEmitterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventEmitterService>;
}
