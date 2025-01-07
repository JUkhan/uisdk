import { NgModule } from '@angular/core';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from './work-flow.component';
import * as i0 from "@angular/core";
export class WorkFlowModule {
}
WorkFlowModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WorkFlowModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowModule, declarations: [WorkFlowComponent], imports: [CommonModule,
        SequentialWorkflowDesignerModule,
        MatFormFieldModule,
        MatInputModule], exports: [WorkFlowComponent] });
WorkFlowModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowModule, imports: [CommonModule,
        SequentialWorkflowDesignerModule,
        MatFormFieldModule,
        MatInputModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        WorkFlowComponent
                    ],
                    imports: [
                        CommonModule,
                        SequentialWorkflowDesignerModule,
                        MatFormFieldModule,
                        MatInputModule
                    ],
                    exports: [
                        WorkFlowComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mbG93Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay93b3JrLWZsb3cvc3JjL3dvcmstZmxvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQWdCMUQsTUFBTSxPQUFPLGNBQWM7OzRHQUFkLGNBQWM7NkdBQWQsY0FBYyxpQkFabkIsaUJBQWlCLGFBR2pCLFlBQVk7UUFDWixnQ0FBZ0M7UUFDaEMsa0JBQWtCO1FBQ2xCLGNBQWMsYUFHZCxpQkFBaUI7NkdBR1osY0FBYyxZQVRuQixZQUFZO1FBQ1osZ0NBQWdDO1FBQ2hDLGtCQUFrQjtRQUNsQixjQUFjOzRGQU1ULGNBQWM7a0JBZDFCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGlCQUFpQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFPO3dCQUNWLFlBQVk7d0JBQ1osZ0NBQWdDO3dCQUNoQyxrQkFBa0I7d0JBQ2xCLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBTzt3QkFDVixpQkFBaUI7cUJBQ3BCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VxdWVudGlhbFdvcmtmbG93RGVzaWduZXJNb2R1bGUgfSBmcm9tICdzZXF1ZW50aWFsLXdvcmtmbG93LWRlc2lnbmVyLWFuZ3VsYXInO1xyXG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBXb3JrRmxvd0NvbXBvbmVudCB9IGZyb20gJy4vd29yay1mbG93LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgV29ya0Zsb3dDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzICAgICA6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgU2VxdWVudGlhbFdvcmtmbG93RGVzaWduZXJNb2R1bGUsXHJcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0cyAgICAgOiBbXHJcbiAgICAgICAgV29ya0Zsb3dDb21wb25lbnRcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFdvcmtGbG93TW9kdWxlXHJcbntcclxuICAgIFxyXG59XHJcbiJdfQ==