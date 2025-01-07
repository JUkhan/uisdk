import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class ConstantService {
    constructor() {
        this.permittedAction$ = new BehaviorSubject([]);
    }
}
ConstantService.OperationType = {
    INSERT: 'insert',
    UPDATE: 'update',
    DELETE: 'delete',
    GET: 'get',
    GETALL: 'getall',
    FILTEREDGETALL: 'GetAllWithFilter',
};
ConstantService.ApiType = {
    CRUD: 'crud',
    CONFIG: 'config',
    DYNAMIC_CONFIG: 'DynamicConfig',
};
ConstantService.DateFormat = {
    DATEFORMAT_DD_MM_YYYY: 'DD/MM/YYYY',
    DATETIMEFORMAT_DD_MM_YYYY: 'DD/MM/YYYY HH:mm:ss',
    DATETIMEFORMAT_DD_MM_YYYY_AM: 'DD/MM/YYYY hh:mm:ss A',
    DATETIMEFORMAT_YYYY_MM_DD_FullTime: 'YYYY-MM-DDTHH:mm:ss',
    YEAR_ONLY: 2,
    MONTH_ONLY: 1,
    FULL_DATE: 0,
};
ConstantService.Message = {
    SUCCESSFUL_TITLE: 'Success',
    SAVED_SUCCESSFUL: 'Saved Successfully',
    DELETE_SUCCESSFUL: 'Deleted Successfully',
    DELETE_TITLE: 'Delete',
    CANCEL_SUCCESSFUL: 'Canceled Successfully',
    DELETE_SUCCESSFUL_TITLE: 'Confirm Delete',
    DELETE_SUCCESSFUL_MESSAGE: 'Are you sure you want to delete?',
    SAVED_FAIL_TITLE: 'Error',
    SAVED_FAIL: 'The Operation is failed',
    NO_ADMIN_MENU: 'You do not have any permission',
    AUTH_ERROR: 'Wrong username or password',
    CANCEL_WARNING: 'Are you sure you want to cancel? All your entered data will be lost.',
    DELETE_CONFIRMATION_MESSAGE: 'Are you sure you want to delete?',
    CONFIRM_CANCEL: 'Are you sure you want to cancel?',
    DATA_ELEMENT_DUPLICATE_WARNING: 'Data element value or name can not be duplicate',
    DATA_ELEMENT_EMPTY_WARNING: 'Data element value or name can not be empty',
    MENTOR_REMOVE_SUCCESS_MESSAGE: 'Mentor(s) Removed Successfully',
    INCOMPLETE_TASK_TITLE: 'Incomplete Task',
    INCOMPLETE_TASK_WARNING_MESSAGE: 'You have an incomplete task. Do you really want to leave?',
    MAX_MIN_VALIDATION_WARNING: 'Max value should be equal or greater than Min value',
    SURVEY_FORM_PUBLISH_WITH_NO_QUESTION_WARNING: 'Survey form should have at least one question to publish.',
    NOT_PROVIDE_ATTRIBUTE_WARNING: 'You might not provide attribute for a question',
    NOT_PROVIDE_ATTRIBUTE_TO_ALL_QUESTIONS: `You didn't provide attribute to all the questions`,
    CLONE_SUCCESSFUL: 'Cloned Successfully',
    FORM_PUBLISH_SUCCESSFUL: 'Form Published Successfully',
    SURVEY_DATA_UPLOAD_STARTED: 'Excel data is being uploaded',
    SELECT_A_FILE: 'Please select a file',
};
ConstantService.Gender = {
    MALE: 'Male',
    FEMALE: 'Female',
};
ConstantService.SurveyImageDownloadEndpoint = {
    IMAGE_LOCATION: 'Upload/Media/',
};
ConstantService.LINKED_ITEM_TYPE = {
    HOUSE_HOLD: 'HOUSE_HOLD',
    HOUSE_HOLD_MEMBER: 'HOUSE_HOLD_MEMBER',
    TRAINER: 'TRAINER',
    SERVICE_POINT: 'SERVICE_POINT',
    STAKEHOLDER: 'STAKEHOLDER',
};
ConstantService.FileLocations = {
    IMAGE_PATH: 'Upload/Media/',
};
ConstantService.OPTIONS_TYPE_QUESTIONS = [
    'radio',
    'checkbox',
    'dropdown',
];
ConstantService.Endpoints = {
    SAVE_DRAFT_SURVEY_FORM: 'DraftSurveyForm/SaveDraftSurveyFormQuestions',
};
ConstantService.FormLoaderTitle = {
    ADD_DATA: 'Add Data',
    EDIT_DATA: 'Edit Data',
};
ConstantService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConstantService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConstantService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConstantService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConstantService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
var LinkedItemTypeName;
(function (LinkedItemTypeName) {
    LinkedItemTypeName["SURVEY_QUESTION"] = "Survey Question";
    LinkedItemTypeName["GROUP"] = "Group";
    LinkedItemTypeName["STAFF"] = "Staff";
    LinkedItemTypeName["OFFICE"] = "Office";
})(LinkedItemTypeName || (LinkedItemTypeName = {}));

/**
 * Generated bundle index. Do not edit.
 */

export { ConstantService, LinkedItemTypeName };
//# sourceMappingURL=streamstech-ui-sdk-constants.mjs.map
