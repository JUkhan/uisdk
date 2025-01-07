import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class ConstantService {
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
export var LinkedItemTypeName;
(function (LinkedItemTypeName) {
    LinkedItemTypeName["SURVEY_QUESTION"] = "Survey Question";
    LinkedItemTypeName["GROUP"] = "Group";
    LinkedItemTypeName["STAFF"] = "Staff";
    LinkedItemTypeName["OFFICE"] = "Office";
})(LinkedItemTypeName || (LinkedItemTypeName = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvY29uc3RhbnRzL2NvbnN0YW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLdkMsTUFBTSxPQUFPLGVBQWU7SUFINUI7UUFJRSxxQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztLQTZGdEQ7O0FBNUZRLDZCQUFhLEdBQUc7SUFDckIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsR0FBRyxFQUFFLEtBQUs7SUFDVixNQUFNLEVBQUUsUUFBUTtJQUNoQixjQUFjLEVBQUUsa0JBQWtCO0NBQ25DLENBQUM7QUFFSyx1QkFBTyxHQUFHO0lBQ2YsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixjQUFjLEVBQUUsZUFBZTtDQUNoQyxDQUFDO0FBRUssMEJBQVUsR0FBRztJQUNsQixxQkFBcUIsRUFBRSxZQUFZO0lBQ25DLHlCQUF5QixFQUFFLHFCQUFxQjtJQUNoRCw0QkFBNEIsRUFBRSx1QkFBdUI7SUFDckQsa0NBQWtDLEVBQUUscUJBQXFCO0lBQ3pELFNBQVMsRUFBRSxDQUFDO0lBQ1osVUFBVSxFQUFFLENBQUM7SUFDYixTQUFTLEVBQUUsQ0FBQztDQUNiLENBQUM7QUFFSyx1QkFBTyxHQUFHO0lBQ2YsZ0JBQWdCLEVBQUUsU0FBUztJQUMzQixnQkFBZ0IsRUFBRSxvQkFBb0I7SUFDdEMsaUJBQWlCLEVBQUUsc0JBQXNCO0lBQ3pDLFlBQVksRUFBRSxRQUFRO0lBQ3RCLGlCQUFpQixFQUFFLHVCQUF1QjtJQUMxQyx1QkFBdUIsRUFBRSxnQkFBZ0I7SUFDekMseUJBQXlCLEVBQUUsa0NBQWtDO0lBQzdELGdCQUFnQixFQUFFLE9BQU87SUFDekIsVUFBVSxFQUFFLHlCQUF5QjtJQUNyQyxhQUFhLEVBQUUsZ0NBQWdDO0lBQy9DLFVBQVUsRUFBRSw0QkFBNEI7SUFDeEMsY0FBYyxFQUNaLHNFQUFzRTtJQUN4RSwyQkFBMkIsRUFBRSxrQ0FBa0M7SUFDL0QsY0FBYyxFQUFFLGtDQUFrQztJQUNsRCw4QkFBOEIsRUFDNUIsaURBQWlEO0lBQ25ELDBCQUEwQixFQUFFLDZDQUE2QztJQUN6RSw2QkFBNkIsRUFBRSxnQ0FBZ0M7SUFDL0QscUJBQXFCLEVBQUUsaUJBQWlCO0lBQ3hDLCtCQUErQixFQUM3QiwyREFBMkQ7SUFDN0QsMEJBQTBCLEVBQ3hCLHFEQUFxRDtJQUN2RCw0Q0FBNEMsRUFDMUMsMkRBQTJEO0lBQzdELDZCQUE2QixFQUMzQixnREFBZ0Q7SUFDbEQsc0NBQXNDLEVBQUUsbURBQW1EO0lBQzNGLGdCQUFnQixFQUFFLHFCQUFxQjtJQUN2Qyx1QkFBdUIsRUFBRSw2QkFBNkI7SUFDdEQsMEJBQTBCLEVBQUUsOEJBQThCO0lBQzFELGFBQWEsRUFBRSxzQkFBc0I7Q0FDdEMsQ0FBQztBQUVLLHNCQUFNLEdBQUc7SUFDZCxJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFSywyQ0FBMkIsR0FBRztJQUNuQyxjQUFjLEVBQUUsZUFBZTtDQUNoQyxDQUFDO0FBQ0ssZ0NBQWdCLEdBQUc7SUFDeEIsVUFBVSxFQUFFLFlBQVk7SUFDeEIsaUJBQWlCLEVBQUUsbUJBQW1CO0lBQ3RDLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLGFBQWEsRUFBRSxlQUFlO0lBQzlCLFdBQVcsRUFBRSxhQUFhO0NBQzNCLENBQUM7QUFFSyw2QkFBYSxHQUFHO0lBQ3JCLFVBQVUsRUFBRSxlQUFlO0NBQzVCLENBQUM7QUFDYyxzQ0FBc0IsR0FBYTtJQUNqRCxPQUFPO0lBQ1AsVUFBVTtJQUNWLFVBQVU7Q0FDWCxDQUFDO0FBQ2MseUJBQVMsR0FBRztJQUMxQixzQkFBc0IsRUFBRSw4Q0FBOEM7Q0FDdkUsQ0FBQztBQUNLLCtCQUFlLEdBQUc7SUFDdkIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFdBQVc7Q0FDdkIsQ0FBQzs2R0E3RlMsZUFBZTtpSEFBZixlQUFlLGNBRmQsTUFBTTs0RkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7QUFpR0QsTUFBTSxDQUFOLElBQVksa0JBS1g7QUFMRCxXQUFZLGtCQUFrQjtJQUM1Qix5REFBbUMsQ0FBQTtJQUNuQyxxQ0FBZSxDQUFBO0lBQ2YscUNBQWUsQ0FBQTtJQUNmLHVDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFMVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBSzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25zdGFudFNlcnZpY2Uge1xyXG4gIHBlcm1pdHRlZEFjdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XHJcbiAgc3RhdGljIE9wZXJhdGlvblR5cGUgPSB7XHJcbiAgICBJTlNFUlQ6ICdpbnNlcnQnLFxyXG4gICAgVVBEQVRFOiAndXBkYXRlJyxcclxuICAgIERFTEVURTogJ2RlbGV0ZScsXHJcbiAgICBHRVQ6ICdnZXQnLFxyXG4gICAgR0VUQUxMOiAnZ2V0YWxsJyxcclxuICAgIEZJTFRFUkVER0VUQUxMOiAnR2V0QWxsV2l0aEZpbHRlcicsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIEFwaVR5cGUgPSB7XHJcbiAgICBDUlVEOiAnY3J1ZCcsXHJcbiAgICBDT05GSUc6ICdjb25maWcnLFxyXG4gICAgRFlOQU1JQ19DT05GSUc6ICdEeW5hbWljQ29uZmlnJyxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgRGF0ZUZvcm1hdCA9IHtcclxuICAgIERBVEVGT1JNQVRfRERfTU1fWVlZWTogJ0REL01NL1lZWVknLFxyXG4gICAgREFURVRJTUVGT1JNQVRfRERfTU1fWVlZWTogJ0REL01NL1lZWVkgSEg6bW06c3MnLFxyXG4gICAgREFURVRJTUVGT1JNQVRfRERfTU1fWVlZWV9BTTogJ0REL01NL1lZWVkgaGg6bW06c3MgQScsXHJcbiAgICBEQVRFVElNRUZPUk1BVF9ZWVlZX01NX0REX0Z1bGxUaW1lOiAnWVlZWS1NTS1ERFRISDptbTpzcycsXHJcbiAgICBZRUFSX09OTFk6IDIsXHJcbiAgICBNT05USF9PTkxZOiAxLFxyXG4gICAgRlVMTF9EQVRFOiAwLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBNZXNzYWdlID0ge1xyXG4gICAgU1VDQ0VTU0ZVTF9USVRMRTogJ1N1Y2Nlc3MnLFxyXG4gICAgU0FWRURfU1VDQ0VTU0ZVTDogJ1NhdmVkIFN1Y2Nlc3NmdWxseScsXHJcbiAgICBERUxFVEVfU1VDQ0VTU0ZVTDogJ0RlbGV0ZWQgU3VjY2Vzc2Z1bGx5JyxcclxuICAgIERFTEVURV9USVRMRTogJ0RlbGV0ZScsXHJcbiAgICBDQU5DRUxfU1VDQ0VTU0ZVTDogJ0NhbmNlbGVkIFN1Y2Nlc3NmdWxseScsXHJcbiAgICBERUxFVEVfU1VDQ0VTU0ZVTF9USVRMRTogJ0NvbmZpcm0gRGVsZXRlJyxcclxuICAgIERFTEVURV9TVUNDRVNTRlVMX01FU1NBR0U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlPycsXHJcbiAgICBTQVZFRF9GQUlMX1RJVExFOiAnRXJyb3InLFxyXG4gICAgU0FWRURfRkFJTDogJ1RoZSBPcGVyYXRpb24gaXMgZmFpbGVkJyxcclxuICAgIE5PX0FETUlOX01FTlU6ICdZb3UgZG8gbm90IGhhdmUgYW55IHBlcm1pc3Npb24nLFxyXG4gICAgQVVUSF9FUlJPUjogJ1dyb25nIHVzZXJuYW1lIG9yIHBhc3N3b3JkJyxcclxuICAgIENBTkNFTF9XQVJOSU5HOlxyXG4gICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbD8gQWxsIHlvdXIgZW50ZXJlZCBkYXRhIHdpbGwgYmUgbG9zdC4nLFxyXG4gICAgREVMRVRFX0NPTkZJUk1BVElPTl9NRVNTQUdFOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZT8nLFxyXG4gICAgQ09ORklSTV9DQU5DRUw6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsPycsXHJcbiAgICBEQVRBX0VMRU1FTlRfRFVQTElDQVRFX1dBUk5JTkc6XHJcbiAgICAgICdEYXRhIGVsZW1lbnQgdmFsdWUgb3IgbmFtZSBjYW4gbm90IGJlIGR1cGxpY2F0ZScsXHJcbiAgICBEQVRBX0VMRU1FTlRfRU1QVFlfV0FSTklORzogJ0RhdGEgZWxlbWVudCB2YWx1ZSBvciBuYW1lIGNhbiBub3QgYmUgZW1wdHknLFxyXG4gICAgTUVOVE9SX1JFTU9WRV9TVUNDRVNTX01FU1NBR0U6ICdNZW50b3IocykgUmVtb3ZlZCBTdWNjZXNzZnVsbHknLFxyXG4gICAgSU5DT01QTEVURV9UQVNLX1RJVExFOiAnSW5jb21wbGV0ZSBUYXNrJyxcclxuICAgIElOQ09NUExFVEVfVEFTS19XQVJOSU5HX01FU1NBR0U6XHJcbiAgICAgICdZb3UgaGF2ZSBhbiBpbmNvbXBsZXRlIHRhc2suIERvIHlvdSByZWFsbHkgd2FudCB0byBsZWF2ZT8nLFxyXG4gICAgTUFYX01JTl9WQUxJREFUSU9OX1dBUk5JTkc6XHJcbiAgICAgICdNYXggdmFsdWUgc2hvdWxkIGJlIGVxdWFsIG9yIGdyZWF0ZXIgdGhhbiBNaW4gdmFsdWUnLFxyXG4gICAgU1VSVkVZX0ZPUk1fUFVCTElTSF9XSVRIX05PX1FVRVNUSU9OX1dBUk5JTkc6XHJcbiAgICAgICdTdXJ2ZXkgZm9ybSBzaG91bGQgaGF2ZSBhdCBsZWFzdCBvbmUgcXVlc3Rpb24gdG8gcHVibGlzaC4nLFxyXG4gICAgTk9UX1BST1ZJREVfQVRUUklCVVRFX1dBUk5JTkc6XHJcbiAgICAgICdZb3UgbWlnaHQgbm90IHByb3ZpZGUgYXR0cmlidXRlIGZvciBhIHF1ZXN0aW9uJyxcclxuICAgIE5PVF9QUk9WSURFX0FUVFJJQlVURV9UT19BTExfUVVFU1RJT05TOiBgWW91IGRpZG4ndCBwcm92aWRlIGF0dHJpYnV0ZSB0byBhbGwgdGhlIHF1ZXN0aW9uc2AsXHJcbiAgICBDTE9ORV9TVUNDRVNTRlVMOiAnQ2xvbmVkIFN1Y2Nlc3NmdWxseScsXHJcbiAgICBGT1JNX1BVQkxJU0hfU1VDQ0VTU0ZVTDogJ0Zvcm0gUHVibGlzaGVkIFN1Y2Nlc3NmdWxseScsXHJcbiAgICBTVVJWRVlfREFUQV9VUExPQURfU1RBUlRFRDogJ0V4Y2VsIGRhdGEgaXMgYmVpbmcgdXBsb2FkZWQnLFxyXG4gICAgU0VMRUNUX0FfRklMRTogJ1BsZWFzZSBzZWxlY3QgYSBmaWxlJyxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgR2VuZGVyID0ge1xyXG4gICAgTUFMRTogJ01hbGUnLFxyXG4gICAgRkVNQUxFOiAnRmVtYWxlJyxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgU3VydmV5SW1hZ2VEb3dubG9hZEVuZHBvaW50ID0ge1xyXG4gICAgSU1BR0VfTE9DQVRJT046ICdVcGxvYWQvTWVkaWEvJyxcclxuICB9O1xyXG4gIHN0YXRpYyBMSU5LRURfSVRFTV9UWVBFID0ge1xyXG4gICAgSE9VU0VfSE9MRDogJ0hPVVNFX0hPTEQnLFxyXG4gICAgSE9VU0VfSE9MRF9NRU1CRVI6ICdIT1VTRV9IT0xEX01FTUJFUicsXHJcbiAgICBUUkFJTkVSOiAnVFJBSU5FUicsXHJcbiAgICBTRVJWSUNFX1BPSU5UOiAnU0VSVklDRV9QT0lOVCcsXHJcbiAgICBTVEFLRUhPTERFUjogJ1NUQUtFSE9MREVSJyxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgRmlsZUxvY2F0aW9ucyA9IHtcclxuICAgIElNQUdFX1BBVEg6ICdVcGxvYWQvTWVkaWEvJyxcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBPUFRJT05TX1RZUEVfUVVFU1RJT05TOiBzdHJpbmdbXSA9IFtcclxuICAgICdyYWRpbycsXHJcbiAgICAnY2hlY2tib3gnLFxyXG4gICAgJ2Ryb3Bkb3duJyxcclxuICBdO1xyXG4gIHN0YXRpYyByZWFkb25seSBFbmRwb2ludHMgPSB7XHJcbiAgICBTQVZFX0RSQUZUX1NVUlZFWV9GT1JNOiAnRHJhZnRTdXJ2ZXlGb3JtL1NhdmVEcmFmdFN1cnZleUZvcm1RdWVzdGlvbnMnLFxyXG4gIH07XHJcbiAgc3RhdGljIEZvcm1Mb2FkZXJUaXRsZSA9IHtcclxuICAgIEFERF9EQVRBOiAnQWRkIERhdGEnLFxyXG4gICAgRURJVF9EQVRBOiAnRWRpdCBEYXRhJyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBMaW5rZWRJdGVtVHlwZU5hbWUge1xyXG4gIFNVUlZFWV9RVUVTVElPTiA9ICdTdXJ2ZXkgUXVlc3Rpb24nLFxyXG4gIEdST1VQID0gJ0dyb3VwJyxcclxuICBTVEFGRiA9ICdTdGFmZicsXHJcbiAgT0ZGSUNFID0gJ09mZmljZScsXHJcbn1cclxuIl19