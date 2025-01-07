import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, NgModule } from '@angular/core';
import { Uid } from 'sequential-workflow-designer';
import * as i1 from 'sequential-workflow-designer-angular';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import * as i2 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

class WorkFlowComponent {
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
        var _a;
        this.isValid = (_a = this.designer) === null || _a === void 0 ? void 0 : _a.isValid();
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

class WorkFlowModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { WorkFlowComponent, WorkFlowModule };
//# sourceMappingURL=streamstech-ui-sdk-work-flow.mjs.map
