import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
export declare class AlertMessageService {
    private _snackBar;
    constructor(_snackBar: MatSnackBar);
    showSuccess(): void;
    showError(): void;
    showGivenSuccessMessage(msg: string): void;
    showSuccessMessage(): void;
    showCancelMessage(): void;
    showDeleteMessage(): void;
    successMessage(message: string): void;
    showErrorNotification(): void;
    showWarning(): void;
    showInfo(): void;
    showErrorMessage(message: string): void;
    showWarningMessage(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertMessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AlertMessageService>;
}
