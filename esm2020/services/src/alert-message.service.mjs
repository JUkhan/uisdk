import { Injectable } from '@angular/core';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import { AlertMessageComponent } from '@streamstech/ui-sdk/fuse/alert';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class AlertMessageService {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
    }
    showSuccess() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showError() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: ConstantService.Message.SAVED_FAIL_TITLE,
                messageBody: ConstantService.Message.SAVED_FAIL,
            },
        });
    }
    showGivenSuccessMessage(msg) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: msg,
            },
        });
    }
    showSuccessMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.SAVED_SUCCESSFUL,
            },
        });
    }
    showCancelMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.CANCEL_SUCCESSFUL,
            },
        });
    }
    showDeleteMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.DELETE_SUCCESSFUL,
            },
        });
    }
    successMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: message,
            },
        });
    }
    showErrorNotification() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody: 'The operation has failed due to the presence of child entities associated with this office type.',
            },
        });
    }
    showWarning() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showInfo() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'info',
                messageTitle: 'Information',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showErrorMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody: message,
            },
        });
    }
    showWarningMessage(message) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: message,
            },
        });
    }
}
AlertMessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, deps: [{ token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
AlertMessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AlertMessageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzL3NyYy9hbGVydC1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUE7OztBQUtwRSxNQUFNLE9BQU8sbUJBQW1CO0lBRTVCLFlBQW9CLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBSSxDQUFDO0lBRS9DLFdBQVc7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO1lBQ3BELFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSTtZQUNsQixrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFlBQVksRUFBRSxTQUFTO2dCQUN2QixXQUFXLEVBQUUsNkJBQTZCO2FBQzdDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO1lBQ3BELFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSTtZQUNsQixrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxPQUFPO2dCQUNiLFlBQVksRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDLGdCQUFnQjtnQkFDdEQsV0FBVyxFQUFFLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVTth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QUFDLENBQUM7SUFDUCxDQUFDOztpSEExSlEsbUJBQW1CO3FIQUFuQixtQkFBbUIsY0FGaEIsTUFBTTs0RkFFVCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcclxuaW1wb3J0IHsgQ29uc3RhbnRTZXJ2aWNlIH0gZnJvbSAnQHN0cmVhbXN0ZWNoL3VpLXNkay9jb25zdGFudHMnO1xyXG5pbXBvcnQge0FsZXJ0TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnQHN0cmVhbXN0ZWNoL3VpLXNkay9mdXNlL2FsZXJ0J1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxlcnRNZXNzYWdlU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyKSB7IH1cclxuXHJcbiAgICBzaG93U3VjY2VzcygpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRpdGxlOiAnU3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogJ1RoZSBPcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Vycm9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KEFsZXJ0TWVzc2FnZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyAqIDEwMDAsXHJcbiAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRpdGxlOiBDb25zdGFudFNlcnZpY2UuTWVzc2FnZS5TQVZFRF9GQUlMX1RJVExFLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUJvZHk6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLlNBVkVEX0ZBSUwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93R2l2ZW5TdWNjZXNzTWVzc2FnZShtc2c6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KEFsZXJ0TWVzc2FnZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyAqIDEwMDAsXHJcbiAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGl0bGU6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLlNVQ0NFU1NGVUxfVElUTEUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogbXNnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2hvd1N1Y2Nlc3NNZXNzYWdlKCkge1xyXG4gICAgICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KEFsZXJ0TWVzc2FnZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyAqIDEwMDAsXHJcbiAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGl0bGU6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLlNVQ0NFU1NGVUxfVElUTEUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogQ29uc3RhbnRTZXJ2aWNlLk1lc3NhZ2UuU0FWRURfU1VDQ0VTU0ZVTCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FuY2VsTWVzc2FnZSgpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRpdGxlOiBDb25zdGFudFNlcnZpY2UuTWVzc2FnZS5TVUNDRVNTRlVMX1RJVExFLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUJvZHk6IENvbnN0YW50U2VydmljZS5NZXNzYWdlLkNBTkNFTF9TVUNDRVNTRlVMLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2hvd0RlbGV0ZU1lc3NhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5fc25hY2tCYXIub3BlbkZyb21Db21wb25lbnQoQWxlcnRNZXNzYWdlQ29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzICogMTAwMCxcclxuICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUaXRsZTogQ29uc3RhbnRTZXJ2aWNlLk1lc3NhZ2UuU1VDQ0VTU0ZVTF9USVRMRSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb2R5OiBDb25zdGFudFNlcnZpY2UuTWVzc2FnZS5ERUxFVEVfU1VDQ0VTU0ZVTCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWNjZXNzTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRpdGxlOiAnU3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogbWVzc2FnZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNob3dFcnJvck5vdGlmaWNhdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUaXRsZTogJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb2R5OlxyXG4gICAgICAgICAgICAgICAgICAgICdUaGUgb3BlcmF0aW9uIGhhcyBmYWlsZWQgZHVlIHRvIHRoZSBwcmVzZW5jZSBvZiBjaGlsZCBlbnRpdGllcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBvZmZpY2UgdHlwZS4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dXYXJuaW5nKCkge1xyXG4gICAgICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KEFsZXJ0TWVzc2FnZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyAqIDEwMDAsXHJcbiAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGl0bGU6ICdXYXJuaW5nJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb2R5OiAnVGhlIE9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNob3dJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuX3NuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KEFsZXJ0TWVzc2FnZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyAqIDEwMDAsXHJcbiAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGl0bGU6ICdJbmZvcm1hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogJ1RoZSBPcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDQgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUaXRsZTogJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb2R5OiBtZXNzYWdlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dXYXJuaW5nTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zbmFja0Jhci5vcGVuRnJvbUNvbXBvbmVudChBbGVydE1lc3NhZ2VDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDMgKiAxMDAwLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRpdGxlOiAnV2FybmluZycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm9keTogbWVzc2FnZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=