import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { SetFilterComponent } from './set-filter.component';
import { CellRendererComponent } from './cell.renderer.component';
import { ActionComponent } from './action.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnSelectorComponent } from './column-selector/column-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
export class StlGridModule {
}
StlGridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StlGridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, declarations: [SetFilterComponent,
        CellRendererComponent,
        ActionComponent,
        //StlGridComponent,
        ColumnSelectorComponent], imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        AgGridModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule], exports: [SetFilterComponent,
        CellRendererComponent,
        ActionComponent] });
StlGridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        AgGridModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StlGridModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SetFilterComponent,
                        CellRendererComponent,
                        ActionComponent,
                        //StlGridComponent,
                        ColumnSelectorComponent
                    ],
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        AgGridModule,
                        MatCheckboxModule,
                        MatDialogModule,
                        MatIconModule,
                        MatMenuModule,
                        MatSnackBarModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatTooltipModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatGridListModule,
                        //FontAwesomeModule
                    ],
                    exports: [
                        SetFilterComponent,
                        CellRendererComponent,
                        ActionComponent,
                        //StlGridComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvZ3JpZC9zcmMvZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQTtBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUE7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUE7QUFDL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFBO0FBQ3pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFBO0FBQy9ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQTtBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFDaEUsdUVBQXVFO0FBb0N2RSxNQUFNLE9BQU8sYUFBYTs7MkdBQWIsYUFBYTs0R0FBYixhQUFhLGlCQS9CbEIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLHVCQUF1QixhQUd2QixZQUFZO1FBQ1osZUFBZTtRQUNmLGFBQWE7UUFDYixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixhQUFhO1FBQ2IsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGlCQUFpQixhQUlqQixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGVBQWU7NEdBSVYsYUFBYSxZQXhCbEIsWUFBWTtRQUNaLGVBQWU7UUFDZixhQUFhO1FBQ2IsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsYUFBYTtRQUNiLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixpQkFBaUI7NEZBVVosYUFBYTtrQkFqQ3pCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGtCQUFrQjt3QkFDbEIscUJBQXFCO3dCQUNyQixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQU87d0JBQ1YsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQU87d0JBQ1Ysa0JBQWtCO3dCQUNsQixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2Ysa0JBQWtCO3FCQUNyQjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJ1xyXG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnXHJcbmltcG9ydCB7TWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0J1xyXG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCdcclxuaW1wb3J0IHtNYXRHcmlkTGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZ3JpZC1saXN0J1xyXG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQge1NldEZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9zZXQtZmlsdGVyLmNvbXBvbmVudCdcclxuaW1wb3J0IHtDZWxsUmVuZGVyZXJDb21wb25lbnR9IGZyb20gJy4vY2VsbC5yZW5kZXJlci5jb21wb25lbnQnXHJcbmltcG9ydCB7QWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2FjdGlvbi5jb21wb25lbnQnXHJcbmltcG9ydCB7QWdHcmlkTW9kdWxlfSBmcm9tICdhZy1ncmlkLWFuZ3VsYXInXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdGxHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9zdGwtZ3JpZC9zdGwtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbHVtblNlbGVjdG9yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi1zZWxlY3Rvci9jb2x1bW4tc2VsZWN0b3IuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xyXG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XHJcbi8vaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFNldEZpbHRlckNvbXBvbmVudCxcclxuICAgICAgICBDZWxsUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgICAgQWN0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIC8vU3RsR3JpZENvbXBvbmVudCxcclxuICAgICAgICBDb2x1bW5TZWxlY3RvckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHMgICAgIDogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBBZ0dyaWRNb2R1bGUsXHJcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcclxuICAgICAgICBNYXRTbmFja0Jhck1vZHVsZSxcclxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxyXG4gICAgICAgIC8vRm9udEF3ZXNvbWVNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzICAgICA6IFtcclxuICAgICAgICBTZXRGaWx0ZXJDb21wb25lbnQsXHJcbiAgICAgICAgQ2VsbFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICAgIEFjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICAvL1N0bEdyaWRDb21wb25lbnRcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0bEdyaWRNb2R1bGVcclxue1xyXG59XHJcbiJdfQ==