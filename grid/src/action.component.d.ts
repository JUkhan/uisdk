import { ConstantService } from '@streamstech/ui-sdk/constants';
import { Action } from '@streamstech/ui-sdk/services';
import * as i0 from "@angular/core";
export declare class ActionComponent {
    private constant;
    suppressCustomButtons: boolean;
    params?: any;
    constructor(constant: ConstantService);
    agInit(params: any): void;
    customActionHandler(btnInfo: {
        actionName: string;
    }): void;
    editRowData(): void;
    deleteRowData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionComponent, "grid-actions", never, { "suppressCustomButtons": "suppressCustomButtons"; }, {}, never, never, false, never>;
}
export declare class EditAction<T extends object> implements Action {
    type: any;
    data: T;
    constructor(type: any, data: T);
}
export declare class DeleteAction<T extends object> implements Action {
    type: any;
    data: T;
    constructor(type: any, data: T);
}
export declare class CustomAction<T extends object> implements Action {
    type: any;
    data: T;
    constructor(type: any, data: T);
}
