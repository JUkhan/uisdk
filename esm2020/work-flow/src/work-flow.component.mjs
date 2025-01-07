import { Component, EventEmitter, Output } from '@angular/core';
import { Uid } from 'sequential-workflow-designer';
import * as i0 from "@angular/core";
import * as i1 from "sequential-workflow-designer-angular";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@angular/material/input";
export class WorkFlowComponent {
    constructor() {
        this.onWorkFlowReady = new EventEmitter();
        this.definition = createDefinition();
        this.selectedStepId = null;
        this.isReadonly = false;
        this.isToolboxCollapsed = false;
        this.isEditorCollapsed = false;
        this.toolboxConfiguration = {
            groups: [
                {
                    name: 'Steps',
                    steps: [createStep('Step'), createIfStep('If'), createLoopStep('loop')]
                }
            ]
        };
        this.stepsConfiguration = {
            iconUrlProvider: (componentType) => {
                return componentType === 'switch' ? './assets/icon-if.svg' : componentType === 'container' ? './assets/icon-loop.svg' : './assets/icon-task.svg';
            }
        };
        this.validatorConfiguration = {
        //step: (step: Step) => !!step.name && Number(step.properties['velocity']) >= 0,
        //root: (definition: Definition) => Number(definition.properties['velocity']) >= 0
        };
    }
    ngOnInit() {
        this.updateDefinitionJSON();
        this.onWorkFlowReady.emit(this);
    }
    onDesignerReady(designer) {
        this.designer = designer;
        this.updateIsValid();
        //console.log('designer ready', this.designer);
    }
    onDefinitionChanged(definition) {
        this.definition = definition;
        this.updateIsValid();
        this.updateDefinitionJSON();
        //console.log('definition has changed');
    }
    onSelectedStepIdChanged(stepId) {
        this.selectedStepId = stepId;
    }
    onIsToolboxCollapsedChanged(isCollapsed) {
        this.isToolboxCollapsed = isCollapsed;
    }
    onIsEditorCollapsedChanged(isCollapsed) {
        this.isEditorCollapsed = isCollapsed;
    }
    updateName(step, event, context) {
        step.name = event.target.value;
        context.notifyNameChanged();
    }
    updateProperty(properties, name, event, context) {
        properties[name] = event.target.value;
        context.notifyPropertiesChanged();
    }
    reloadDefinitionClicked() {
        this.definition = createDefinition();
        this.updateDefinitionJSON();
    }
    toggleReadonlyClicked() {
        this.isReadonly = !this.isReadonly;
    }
    toggleSelectedStepClicked() {
        if (this.selectedStepId) {
            this.selectedStepId = null;
        }
        else if (this.definition.sequence.length > 0) {
            this.selectedStepId = this.definition.sequence[0].id;
        }
    }
    toggleToolboxClicked() {
        this.isToolboxCollapsed = !this.isToolboxCollapsed;
    }
    toggleEditorClicked() {
        this.isEditorCollapsed = !this.isEditorCollapsed;
    }
    updateDefinitionJSON() {
        this.definitionJSON = JSON.stringify(this.definition, null, 2);
    }
    updateIsValid() {
        this.isValid = this.designer?.isValid();
    }
}
WorkFlowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
WorkFlowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: WorkFlowComponent, selector: "stl-work-flow", outputs: { onWorkFlowReady: "onWorkFlowReady" }, ngImport: i0, template: "<sqd-designer\r\n  theme=\"light\"\r\n  [undoStackSize]=\"10\"\r\n  [definition]=\"definition\"\r\n  [toolboxConfiguration]=\"toolboxConfiguration\"\r\n  [stepsConfiguration]=\"stepsConfiguration\"\r\n  [validatorConfiguration]=\"validatorConfiguration\"\r\n  [controlBar]=\"true\"\r\n  [selectedStepId]=\"selectedStepId\"\r\n  [isReadonly]=\"isReadonly\"\r\n  [isToolboxCollapsed]=\"isToolboxCollapsed\"\r\n  [isEditorCollapsed]=\"isEditorCollapsed\"\r\n  [areEditorsHidden]=\"false\"\r\n  [rootEditor]=\"rootEditor\"\r\n  [stepEditor]=\"stepEditor\"\r\n  (onReady)=\"onDesignerReady($event)\"\r\n  (onDefinitionChanged)=\"onDefinitionChanged($event)\"\r\n  (onSelectedStepIdChanged)=\"onSelectedStepIdChanged($event)\"\r\n  (onIsToolboxCollapsedChanged)=\"onIsToolboxCollapsedChanged($event)\"\r\n  (onIsEditorCollapsedChanged)=\"onIsEditorCollapsedChanged($event)\"\r\n>\r\n</sqd-designer>\r\n\r\n<ng-template #rootEditor let-editor>\r\n  <p class=\"text-2xl text mt-2\">Root</p>\r\n\r\n  \r\n  <mat-form-field class=\"full-width mt-8\">\r\n    <mat-label>Description</mat-label>\r\n    <textarea\r\n      matInput\r\n      rows=\"2\"\r\n      [value]=\"editor.definition.properties.description||''\"\r\n      [readonly]=\"editor.isReadonly\"\r\n      (input)=\"\r\n        updateProperty(\r\n          editor.definition.properties,\r\n          'description',\r\n          $event,\r\n          editor.context\r\n        )\r\n      \"\r\n    ></textarea>\r\n  </mat-form-field>\r\n\r\n</ng-template>\r\n\r\n<ng-template #stepEditor let-editor>\r\n     <p class=\"text-2xl text mt-2\">Step</p>\r\n      <mat-form-field class=\"full-width mt-8\">\r\n        <mat-label>Name</mat-label>\r\n        <input\r\n          matInput\r\n          type=\"text\"\r\n          [value]=\"editor.step.name\"\r\n          [readonly]=\"editor.isReadonly\"\r\n          (input)=\"updateName(editor.step, $event, editor.context)\"\r\n        />\r\n      </mat-form-field>\r\n     \r\n      <mat-form-field class=\"full-width\">\r\n        <mat-label>Description</mat-label>\r\n        <textarea\r\n          matInput\r\n          rows=\"2\"\r\n          [value]=\"editor.step.properties.description||''\"\r\n          [readonly]=\"editor.isReadonly\"\r\n          (input)=\"\r\n            updateProperty(\r\n              editor.step.properties,\r\n              'description',\r\n              $event,\r\n              editor.context\r\n            )\r\n          \"\r\n        ></textarea>\r\n      </mat-form-field>\r\n    \r\n    </ng-template>\r\n    ", styles: [".full-width{width:100%}.sqd-designer-angular{width:100%;height:500px}.sqd-editor{padding:10px}\n"], dependencies: [{ kind: "component", type: i1.DesignerComponent, selector: "sqd-designer", inputs: ["theme", "undoStackSize", "definition", "stepsConfiguration", "validatorConfiguration", "toolboxConfiguration", "controlBar", "contextMenu", "keyboard", "extensions", "customActionHandler", "isReadonly", "selectedStepId", "uidGenerator", "isToolboxCollapsed", "isEditorCollapsed", "areEditorsHidden", "rootEditor", "stepEditor"], outputs: ["onReady", "onDefinitionChanged", "onSelectedStepIdChanged", "onIsToolboxCollapsedChanged", "onIsEditorCollapsedChanged"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WorkFlowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'stl-work-flow', template: "<sqd-designer\r\n  theme=\"light\"\r\n  [undoStackSize]=\"10\"\r\n  [definition]=\"definition\"\r\n  [toolboxConfiguration]=\"toolboxConfiguration\"\r\n  [stepsConfiguration]=\"stepsConfiguration\"\r\n  [validatorConfiguration]=\"validatorConfiguration\"\r\n  [controlBar]=\"true\"\r\n  [selectedStepId]=\"selectedStepId\"\r\n  [isReadonly]=\"isReadonly\"\r\n  [isToolboxCollapsed]=\"isToolboxCollapsed\"\r\n  [isEditorCollapsed]=\"isEditorCollapsed\"\r\n  [areEditorsHidden]=\"false\"\r\n  [rootEditor]=\"rootEditor\"\r\n  [stepEditor]=\"stepEditor\"\r\n  (onReady)=\"onDesignerReady($event)\"\r\n  (onDefinitionChanged)=\"onDefinitionChanged($event)\"\r\n  (onSelectedStepIdChanged)=\"onSelectedStepIdChanged($event)\"\r\n  (onIsToolboxCollapsedChanged)=\"onIsToolboxCollapsedChanged($event)\"\r\n  (onIsEditorCollapsedChanged)=\"onIsEditorCollapsedChanged($event)\"\r\n>\r\n</sqd-designer>\r\n\r\n<ng-template #rootEditor let-editor>\r\n  <p class=\"text-2xl text mt-2\">Root</p>\r\n\r\n  \r\n  <mat-form-field class=\"full-width mt-8\">\r\n    <mat-label>Description</mat-label>\r\n    <textarea\r\n      matInput\r\n      rows=\"2\"\r\n      [value]=\"editor.definition.properties.description||''\"\r\n      [readonly]=\"editor.isReadonly\"\r\n      (input)=\"\r\n        updateProperty(\r\n          editor.definition.properties,\r\n          'description',\r\n          $event,\r\n          editor.context\r\n        )\r\n      \"\r\n    ></textarea>\r\n  </mat-form-field>\r\n\r\n</ng-template>\r\n\r\n<ng-template #stepEditor let-editor>\r\n     <p class=\"text-2xl text mt-2\">Step</p>\r\n      <mat-form-field class=\"full-width mt-8\">\r\n        <mat-label>Name</mat-label>\r\n        <input\r\n          matInput\r\n          type=\"text\"\r\n          [value]=\"editor.step.name\"\r\n          [readonly]=\"editor.isReadonly\"\r\n          (input)=\"updateName(editor.step, $event, editor.context)\"\r\n        />\r\n      </mat-form-field>\r\n     \r\n      <mat-form-field class=\"full-width\">\r\n        <mat-label>Description</mat-label>\r\n        <textarea\r\n          matInput\r\n          rows=\"2\"\r\n          [value]=\"editor.step.properties.description||''\"\r\n          [readonly]=\"editor.isReadonly\"\r\n          (input)=\"\r\n            updateProperty(\r\n              editor.step.properties,\r\n              'description',\r\n              $event,\r\n              editor.context\r\n            )\r\n          \"\r\n        ></textarea>\r\n      </mat-form-field>\r\n    \r\n    </ng-template>\r\n    ", styles: [".full-width{width:100%}.sqd-designer-angular{width:100%;height:500px}.sqd-editor{padding:10px}\n"] }]
        }], propDecorators: { onWorkFlowReady: [{
                type: Output
            }] } });
function createDefinition() {
    return {
        properties: {
            description: 'What about this work-flow?'
        },
        sequence: [
            createStep('Do Something')
        ],
    };
}
function randomCondition() {
    const a = Math.random() > 0.5 ? 'alfa' : 'beta';
    const b = Math.random() > 0.5 ? '>' : '<';
    const c = Math.round(Math.random() * 100);
    return `${a} ${b} ${c}`;
}
function createLoopStep(name, steps, properties = {}) {
    return {
        id: Uid.next(),
        componentType: 'container',
        type: 'loop',
        name,
        sequence: steps || [],
        properties
    };
}
function createStep(name, properties = {}) {
    return {
        id: Uid.next(),
        componentType: 'task',
        type: 'step',
        name,
        properties
    };
}
function createIfStep(name, trueSteps, falseSteps, properties = {}) {
    return {
        id: Uid.next(),
        componentType: 'switch',
        type: 'if',
        name,
        properties,
        branches: {
            true: trueSteps || [],
            false: falseSteps || []
        }
    };
}
function createParallelStep(name, children) {
    return {
        id: Uid.next(),
        componentType: 'switch',
        type: 'parallel',
        name,
        properties: {
            conditions: {
                'Condition A': randomCondition(),
                'Condition B': randomCondition(),
                'Condition C': randomCondition()
            }
        },
        branches: {
            'Condition A': children ? [children[0]] : [],
            'Condition B': children ? [children[1]] : [],
            'Condition C': children ? [children[2]] : []
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0cmVhbXN0ZWNoL3VpLXNkay93b3JrLWZsb3cvc3JjL3dvcmstZmxvdy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvd29yay1mbG93L3NyYy93b3JrLWZsb3cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFLE9BQU8sRUFLTixHQUFHLEVBTUgsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7QUFRdEMsTUFBTSxPQUFPLGlCQUFpQjtJQUw5QjtRQU9XLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDM0QsZUFBVSxHQUFlLGdCQUFnQixFQUFFLENBQUM7UUFFNUMsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUdqQix5QkFBb0IsR0FBeUI7WUFDNUQsTUFBTSxFQUFFO2dCQUNKO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4RTthQUNGO1NBQ0gsQ0FBQztRQUNjLHVCQUFrQixHQUF1QjtZQUV0RCxlQUFlLEVBQUUsQ0FBQyxhQUFxQixFQUFFLEVBQUU7Z0JBQ3pDLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBLGFBQWEsS0FBSyxXQUFXLENB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dCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcblx0RGVmaW5pdGlvbixcclxuXHREZXNpZ25lcixcclxuXHRSb290RWRpdG9yQ29udGV4dCxcclxuXHRQcm9wZXJ0aWVzLFxyXG5cdFVpZCxcclxuXHRTdGVwLFxyXG5cdFN0ZXBFZGl0b3JDb250ZXh0LFxyXG5cdFN0ZXBzQ29uZmlndXJhdGlvbixcclxuXHRUb29sYm94Q29uZmlndXJhdGlvbixcclxuXHRWYWxpZGF0b3JDb25maWd1cmF0aW9uXHJcbn0gZnJvbSAnc2VxdWVudGlhbC13b3JrZmxvdy1kZXNpZ25lcic7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdGwtd29yay1mbG93JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd29yay1mbG93LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi93b3JrLWZsb3cuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV29ya0Zsb3dDb21wb25lbnQge1xyXG4gIHByaXZhdGUgZGVzaWduZXI/OiBEZXNpZ25lcjtcclxuXHRAT3V0cHV0KCkgb25Xb3JrRmxvd1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxXb3JrRmxvd0NvbXBvbmVudD4oKTtcclxuXHRwdWJsaWMgZGVmaW5pdGlvbjogRGVmaW5pdGlvbiA9IGNyZWF0ZURlZmluaXRpb24oKTtcclxuXHRwdWJsaWMgZGVmaW5pdGlvbkpTT04/OiBzdHJpbmc7XHJcblx0cHVibGljIHNlbGVjdGVkU3RlcElkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuXHRwdWJsaWMgaXNSZWFkb25seSA9IGZhbHNlO1xyXG5cdHB1YmxpYyBpc1Rvb2xib3hDb2xsYXBzZWQgPSBmYWxzZTtcclxuXHRwdWJsaWMgaXNFZGl0b3JDb2xsYXBzZWQgPSBmYWxzZTtcclxuXHRwdWJsaWMgaXNWYWxpZD86IGJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyByZWFkb25seSB0b29sYm94Q29uZmlndXJhdGlvbjogVG9vbGJveENvbmZpZ3VyYXRpb24gPSB7XHJcblx0XHRncm91cHM6IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdTdGVwcycsXHJcbiAgICAgICAgc3RlcHM6IFtjcmVhdGVTdGVwKCdTdGVwJyksIGNyZWF0ZUlmU3RlcCgnSWYnKSwgY3JlYXRlTG9vcFN0ZXAoJ2xvb3AnKV1cclxuICAgICAgfVxyXG4gICAgXVxyXG5cdH07XHJcblx0cHVibGljIHJlYWRvbmx5IHN0ZXBzQ29uZmlndXJhdGlvbjogU3RlcHNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgXHJcbiAgICBpY29uVXJsUHJvdmlkZXI6IChjb21wb25lbnRUeXBlOiBzdHJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIGNvbXBvbmVudFR5cGUgPT09ICdzd2l0Y2gnID8gJy4vYXNzZXRzL2ljb24taWYuc3ZnJyA6Y29tcG9uZW50VHlwZSA9PT0gJ2NvbnRhaW5lcic/Jy4vYXNzZXRzL2ljb24tbG9vcC5zdmcnOiAnLi9hc3NldHMvaWNvbi10YXNrLnN2Zyc7XHJcbiAgICB9XHJcblx0XHRcclxuXHR9O1xyXG5cdHB1YmxpYyByZWFkb25seSB2YWxpZGF0b3JDb25maWd1cmF0aW9uOiBWYWxpZGF0b3JDb25maWd1cmF0aW9uID0ge1xyXG5cdFx0Ly9zdGVwOiAoc3RlcDogU3RlcCkgPT4gISFzdGVwLm5hbWUgJiYgTnVtYmVyKHN0ZXAucHJvcGVydGllc1sndmVsb2NpdHknXSkgPj0gMCxcclxuXHRcdC8vcm9vdDogKGRlZmluaXRpb246IERlZmluaXRpb24pID0+IE51bWJlcihkZWZpbml0aW9uLnByb3BlcnRpZXNbJ3ZlbG9jaXR5J10pID49IDBcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgbmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLnVwZGF0ZURlZmluaXRpb25KU09OKCk7XHJcblx0XHR0aGlzLm9uV29ya0Zsb3dSZWFkeS5lbWl0KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uRGVzaWduZXJSZWFkeShkZXNpZ25lcjogRGVzaWduZXIpIHtcclxuXHRcdHRoaXMuZGVzaWduZXIgPSBkZXNpZ25lcjtcclxuXHRcdHRoaXMudXBkYXRlSXNWYWxpZCgpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZygnZGVzaWduZXIgcmVhZHknLCB0aGlzLmRlc2lnbmVyKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkRlZmluaXRpb25DaGFuZ2VkKGRlZmluaXRpb246IERlZmluaXRpb24pIHtcclxuXHRcdHRoaXMuZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XHJcblx0XHR0aGlzLnVwZGF0ZUlzVmFsaWQoKTtcclxuXHRcdHRoaXMudXBkYXRlRGVmaW5pdGlvbkpTT04oKTtcclxuXHRcdC8vY29uc29sZS5sb2coJ2RlZmluaXRpb24gaGFzIGNoYW5nZWQnKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvblNlbGVjdGVkU3RlcElkQ2hhbmdlZChzdGVwSWQ6IHN0cmluZyB8IG51bGwpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTdGVwSWQgPSBzdGVwSWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Jc1Rvb2xib3hDb2xsYXBzZWRDaGFuZ2VkKGlzQ29sbGFwc2VkOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLmlzVG9vbGJveENvbGxhcHNlZCA9IGlzQ29sbGFwc2VkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uSXNFZGl0b3JDb2xsYXBzZWRDaGFuZ2VkKGlzQ29sbGFwc2VkOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLmlzRWRpdG9yQ29sbGFwc2VkID0gaXNDb2xsYXBzZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlTmFtZShzdGVwOiBTdGVwLCBldmVudDogRXZlbnQsIGNvbnRleHQ6IFN0ZXBFZGl0b3JDb250ZXh0KSB7XHJcblx0XHRzdGVwLm5hbWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cdFx0Y29udGV4dC5ub3RpZnlOYW1lQ2hhbmdlZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZVByb3BlcnR5KHByb3BlcnRpZXM6IFByb3BlcnRpZXMsIG5hbWU6IHN0cmluZywgZXZlbnQ6IEV2ZW50LCBjb250ZXh0OiBSb290RWRpdG9yQ29udGV4dCB8IFN0ZXBFZGl0b3JDb250ZXh0KSB7XHJcblx0XHRwcm9wZXJ0aWVzW25hbWVdID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHRcdGNvbnRleHQubm90aWZ5UHJvcGVydGllc0NoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWxvYWREZWZpbml0aW9uQ2xpY2tlZCgpIHtcclxuXHRcdHRoaXMuZGVmaW5pdGlvbiA9IGNyZWF0ZURlZmluaXRpb24oKTtcclxuXHRcdHRoaXMudXBkYXRlRGVmaW5pdGlvbkpTT04oKTtcclxuICAgXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9nZ2xlUmVhZG9ubHlDbGlja2VkKCkge1xyXG5cdFx0dGhpcy5pc1JlYWRvbmx5ID0gIXRoaXMuaXNSZWFkb25seTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b2dnbGVTZWxlY3RlZFN0ZXBDbGlja2VkKCkge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRTdGVwSWQpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0ZXBJZCA9IG51bGw7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuZGVmaW5pdGlvbi5zZXF1ZW5jZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRTdGVwSWQgPSB0aGlzLmRlZmluaXRpb24uc2VxdWVuY2VbMF0uaWQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9nZ2xlVG9vbGJveENsaWNrZWQoKSB7XHJcblx0XHR0aGlzLmlzVG9vbGJveENvbGxhcHNlZCA9ICF0aGlzLmlzVG9vbGJveENvbGxhcHNlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b2dnbGVFZGl0b3JDbGlja2VkKCkge1xyXG5cdFx0dGhpcy5pc0VkaXRvckNvbGxhcHNlZCA9ICF0aGlzLmlzRWRpdG9yQ29sbGFwc2VkO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVEZWZpbml0aW9uSlNPTigpIHtcclxuXHRcdHRoaXMuZGVmaW5pdGlvbkpTT04gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRlZmluaXRpb24sIG51bGwsIDIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVJc1ZhbGlkKCkge1xyXG5cdFx0dGhpcy5pc1ZhbGlkID0gdGhpcy5kZXNpZ25lcj8uaXNWYWxpZCgpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGVmaW5pdGlvbigpOiBEZWZpbml0aW9uIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cHJvcGVydGllczoge1xyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1doYXQgYWJvdXQgdGhpcyB3b3JrLWZsb3c/J1xyXG5cdFx0fSxcclxuXHRcdHNlcXVlbmNlOiBbXHJcblx0XHRcdGNyZWF0ZVN0ZXAoJ0RvIFNvbWV0aGluZycpXHJcblx0XHRdLFxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUNvbmRpdGlvbigpIHtcclxuXHRjb25zdCBhID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICdhbGZhJyA6ICdiZXRhJztcclxuXHRjb25zdCBiID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICc+JyA6ICc8JztcclxuXHRjb25zdCBjID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKTtcclxuXHRyZXR1cm4gYCR7YX0gJHtifSAke2N9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTG9vcFN0ZXAobmFtZTogc3RyaW5nLCBzdGVwcz86U3RlcFtdLCBwcm9wZXJ0aWVzPXt9KSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGlkOiBVaWQubmV4dCgpLFxyXG5cdFx0Y29tcG9uZW50VHlwZTogJ2NvbnRhaW5lcicsXHJcblx0XHR0eXBlOiAnbG9vcCcsXHJcblx0XHRuYW1lLFxyXG4gICAgc2VxdWVuY2U6IHN0ZXBzIHx8IFtdLFxyXG5cdFx0cHJvcGVydGllc1xyXG5cdH07XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlU3RlcChuYW1lOiBzdHJpbmcsICBwcm9wZXJ0aWVzPXt9KSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGlkOiBVaWQubmV4dCgpLFxyXG5cdFx0Y29tcG9uZW50VHlwZTogJ3Rhc2snLFxyXG5cdFx0dHlwZTogJ3N0ZXAnLFxyXG5cdFx0bmFtZSxcclxuXHRcdHByb3BlcnRpZXNcclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJZlN0ZXAobmFtZTogc3RyaW5nLCB0cnVlU3RlcHM/OiBTdGVwW10sIGZhbHNlU3RlcHM/OiBTdGVwW10sIHByb3BlcnRpZXM9e30pIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0aWQ6IFVpZC5uZXh0KCksXHJcblx0XHRjb21wb25lbnRUeXBlOiAnc3dpdGNoJyxcclxuXHRcdHR5cGU6ICdpZicsXHJcblx0XHRuYW1lLFxyXG5cdFx0cHJvcGVydGllcyxcclxuXHRcdGJyYW5jaGVzOiB7XHJcblx0XHRcdHRydWU6IHRydWVTdGVwcyB8fCBbXSxcclxuXHRcdFx0ZmFsc2U6IGZhbHNlU3RlcHMgfHwgW11cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbGxlbFN0ZXAobmFtZTogc3RyaW5nLCBjaGlsZHJlbj86IGFueVtdKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGlkOiBVaWQubmV4dCgpLFxyXG5cdFx0Y29tcG9uZW50VHlwZTogJ3N3aXRjaCcsXHJcblx0XHR0eXBlOiAncGFyYWxsZWwnLFxyXG5cdFx0bmFtZSxcclxuXHRcdHByb3BlcnRpZXM6IHtcclxuXHRcdFx0Y29uZGl0aW9uczoge1xyXG5cdFx0XHRcdCdDb25kaXRpb24gQSc6IHJhbmRvbUNvbmRpdGlvbigpLFxyXG5cdFx0XHRcdCdDb25kaXRpb24gQic6IHJhbmRvbUNvbmRpdGlvbigpLFxyXG5cdFx0XHRcdCdDb25kaXRpb24gQyc6IHJhbmRvbUNvbmRpdGlvbigpXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRicmFuY2hlczoge1xyXG5cdFx0XHQnQ29uZGl0aW9uIEEnOiBjaGlsZHJlbiA/IFtjaGlsZHJlblswXV0gOiBbXSxcclxuXHRcdFx0J0NvbmRpdGlvbiBCJzogY2hpbGRyZW4gPyBbY2hpbGRyZW5bMV1dIDogW10sXHJcblx0XHRcdCdDb25kaXRpb24gQyc6IGNoaWxkcmVuID8gW2NoaWxkcmVuWzJdXSA6IFtdXHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuIiwiPHNxZC1kZXNpZ25lclxyXG4gIHRoZW1lPVwibGlnaHRcIlxyXG4gIFt1bmRvU3RhY2tTaXplXT1cIjEwXCJcclxuICBbZGVmaW5pdGlvbl09XCJkZWZpbml0aW9uXCJcclxuICBbdG9vbGJveENvbmZpZ3VyYXRpb25dPVwidG9vbGJveENvbmZpZ3VyYXRpb25cIlxyXG4gIFtzdGVwc0NvbmZpZ3VyYXRpb25dPVwic3RlcHNDb25maWd1cmF0aW9uXCJcclxuICBbdmFsaWRhdG9yQ29uZmlndXJhdGlvbl09XCJ2YWxpZGF0b3JDb25maWd1cmF0aW9uXCJcclxuICBbY29udHJvbEJhcl09XCJ0cnVlXCJcclxuICBbc2VsZWN0ZWRTdGVwSWRdPVwic2VsZWN0ZWRTdGVwSWRcIlxyXG4gIFtpc1JlYWRvbmx5XT1cImlzUmVhZG9ubHlcIlxyXG4gIFtpc1Rvb2xib3hDb2xsYXBzZWRdPVwiaXNUb29sYm94Q29sbGFwc2VkXCJcclxuICBbaXNFZGl0b3JDb2xsYXBzZWRdPVwiaXNFZGl0b3JDb2xsYXBzZWRcIlxyXG4gIFthcmVFZGl0b3JzSGlkZGVuXT1cImZhbHNlXCJcclxuICBbcm9vdEVkaXRvcl09XCJyb290RWRpdG9yXCJcclxuICBbc3RlcEVkaXRvcl09XCJzdGVwRWRpdG9yXCJcclxuICAob25SZWFkeSk9XCJvbkRlc2lnbmVyUmVhZHkoJGV2ZW50KVwiXHJcbiAgKG9uRGVmaW5pdGlvbkNoYW5nZWQpPVwib25EZWZpbml0aW9uQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAob25TZWxlY3RlZFN0ZXBJZENoYW5nZWQpPVwib25TZWxlY3RlZFN0ZXBJZENoYW5nZWQoJGV2ZW50KVwiXHJcbiAgKG9uSXNUb29sYm94Q29sbGFwc2VkQ2hhbmdlZCk9XCJvbklzVG9vbGJveENvbGxhcHNlZENoYW5nZWQoJGV2ZW50KVwiXHJcbiAgKG9uSXNFZGl0b3JDb2xsYXBzZWRDaGFuZ2VkKT1cIm9uSXNFZGl0b3JDb2xsYXBzZWRDaGFuZ2VkKCRldmVudClcIlxyXG4+XHJcbjwvc3FkLWRlc2lnbmVyPlxyXG5cclxuPG5nLXRlbXBsYXRlICNyb290RWRpdG9yIGxldC1lZGl0b3I+XHJcbiAgPHAgY2xhc3M9XCJ0ZXh0LTJ4bCB0ZXh0IG10LTJcIj5Sb290PC9wPlxyXG5cclxuICBcclxuICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmdWxsLXdpZHRoIG10LThcIj5cclxuICAgIDxtYXQtbGFiZWw+RGVzY3JpcHRpb248L21hdC1sYWJlbD5cclxuICAgIDx0ZXh0YXJlYVxyXG4gICAgICBtYXRJbnB1dFxyXG4gICAgICByb3dzPVwiMlwiXHJcbiAgICAgIFt2YWx1ZV09XCJlZGl0b3IuZGVmaW5pdGlvbi5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9ufHwnJ1wiXHJcbiAgICAgIFtyZWFkb25seV09XCJlZGl0b3IuaXNSZWFkb25seVwiXHJcbiAgICAgIChpbnB1dCk9XCJcclxuICAgICAgICB1cGRhdGVQcm9wZXJ0eShcclxuICAgICAgICAgIGVkaXRvci5kZWZpbml0aW9uLnByb3BlcnRpZXMsXHJcbiAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgJGV2ZW50LFxyXG4gICAgICAgICAgZWRpdG9yLmNvbnRleHRcclxuICAgICAgICApXHJcbiAgICAgIFwiXHJcbiAgICA+PC90ZXh0YXJlYT5cclxuICA8L21hdC1mb3JtLWZpZWxkPlxyXG5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjc3RlcEVkaXRvciBsZXQtZWRpdG9yPlxyXG4gICAgIDxwIGNsYXNzPVwidGV4dC0yeGwgdGV4dCBtdC0yXCI+U3RlcDwvcD5cclxuICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZnVsbC13aWR0aCBtdC04XCI+XHJcbiAgICAgICAgPG1hdC1sYWJlbD5OYW1lPC9tYXQtbGFiZWw+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBtYXRJbnB1dFxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgW3ZhbHVlXT1cImVkaXRvci5zdGVwLm5hbWVcIlxyXG4gICAgICAgICAgW3JlYWRvbmx5XT1cImVkaXRvci5pc1JlYWRvbmx5XCJcclxuICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVOYW1lKGVkaXRvci5zdGVwLCAkZXZlbnQsIGVkaXRvci5jb250ZXh0KVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICBcclxuICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZnVsbC13aWR0aFwiPlxyXG4gICAgICAgIDxtYXQtbGFiZWw+RGVzY3JpcHRpb248L21hdC1sYWJlbD5cclxuICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgIG1hdElucHV0XHJcbiAgICAgICAgICByb3dzPVwiMlwiXHJcbiAgICAgICAgICBbdmFsdWVdPVwiZWRpdG9yLnN0ZXAucHJvcGVydGllcy5kZXNjcmlwdGlvbnx8JydcIlxyXG4gICAgICAgICAgW3JlYWRvbmx5XT1cImVkaXRvci5pc1JlYWRvbmx5XCJcclxuICAgICAgICAgIChpbnB1dCk9XCJcclxuICAgICAgICAgICAgdXBkYXRlUHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgZWRpdG9yLnN0ZXAucHJvcGVydGllcyxcclxuICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICRldmVudCxcclxuICAgICAgICAgICAgICBlZGl0b3IuY29udGV4dFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgID48L3RleHRhcmVhPlxyXG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgXHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgIl19