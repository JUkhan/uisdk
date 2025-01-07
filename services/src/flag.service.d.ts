import { StateController } from './state';
import * as i0 from "@angular/core";
export declare class FlagService extends StateController<FlagState> {
    surveyFormId$: import("rxjs").Observable<string>;
    surveyFormDataViw$: import("rxjs").Observable<boolean>;
    surveyMapView$: import("rxjs").Observable<boolean>;
    constructor();
    setSurveyFormId(formId: string): void;
    setSurveyStateName(stateName: SurveyStateName): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlagService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlagService>;
}
export declare enum SurveyStateName {
    formDataViw = 0,
    mapView = 1
}
export type Survey = {
    formId: string;
    stateName: SurveyStateName;
};
export interface FlagState {
    survey: Survey;
}
