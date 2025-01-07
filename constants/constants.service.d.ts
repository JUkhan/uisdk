import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ConstantService {
    permittedAction$: BehaviorSubject<string[]>;
    static OperationType: {
        INSERT: string;
        UPDATE: string;
        DELETE: string;
        GET: string;
        GETALL: string;
        FILTEREDGETALL: string;
    };
    static ApiType: {
        CRUD: string;
        CONFIG: string;
        DYNAMIC_CONFIG: string;
    };
    static DateFormat: {
        DATEFORMAT_DD_MM_YYYY: string;
        DATETIMEFORMAT_DD_MM_YYYY: string;
        DATETIMEFORMAT_DD_MM_YYYY_AM: string;
        DATETIMEFORMAT_YYYY_MM_DD_FullTime: string;
        YEAR_ONLY: number;
        MONTH_ONLY: number;
        FULL_DATE: number;
    };
    static Message: {
        SUCCESSFUL_TITLE: string;
        SAVED_SUCCESSFUL: string;
        DELETE_SUCCESSFUL: string;
        DELETE_TITLE: string;
        CANCEL_SUCCESSFUL: string;
        DELETE_SUCCESSFUL_TITLE: string;
        DELETE_SUCCESSFUL_MESSAGE: string;
        SAVED_FAIL_TITLE: string;
        SAVED_FAIL: string;
        NO_ADMIN_MENU: string;
        AUTH_ERROR: string;
        CANCEL_WARNING: string;
        DELETE_CONFIRMATION_MESSAGE: string;
        CONFIRM_CANCEL: string;
        DATA_ELEMENT_DUPLICATE_WARNING: string;
        DATA_ELEMENT_EMPTY_WARNING: string;
        MENTOR_REMOVE_SUCCESS_MESSAGE: string;
        INCOMPLETE_TASK_TITLE: string;
        INCOMPLETE_TASK_WARNING_MESSAGE: string;
        MAX_MIN_VALIDATION_WARNING: string;
        SURVEY_FORM_PUBLISH_WITH_NO_QUESTION_WARNING: string;
        NOT_PROVIDE_ATTRIBUTE_WARNING: string;
        NOT_PROVIDE_ATTRIBUTE_TO_ALL_QUESTIONS: string;
        CLONE_SUCCESSFUL: string;
        FORM_PUBLISH_SUCCESSFUL: string;
        SURVEY_DATA_UPLOAD_STARTED: string;
        SELECT_A_FILE: string;
    };
    static Gender: {
        MALE: string;
        FEMALE: string;
    };
    static SurveyImageDownloadEndpoint: {
        IMAGE_LOCATION: string;
    };
    static LINKED_ITEM_TYPE: {
        HOUSE_HOLD: string;
        HOUSE_HOLD_MEMBER: string;
        TRAINER: string;
        SERVICE_POINT: string;
        STAKEHOLDER: string;
    };
    static FileLocations: {
        IMAGE_PATH: string;
    };
    static readonly OPTIONS_TYPE_QUESTIONS: string[];
    static readonly Endpoints: {
        SAVE_DRAFT_SURVEY_FORM: string;
    };
    static FormLoaderTitle: {
        ADD_DATA: string;
        EDIT_DATA: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ConstantService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConstantService>;
}
export declare enum LinkedItemTypeName {
    SURVEY_QUESTION = "Survey Question",
    GROUP = "Group",
    STAFF = "Staff",
    OFFICE = "Office"
}
