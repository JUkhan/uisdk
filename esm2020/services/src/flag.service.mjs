import { Injectable } from '@angular/core';
import { StateController } from './state';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
export class FlagService extends StateController {
    constructor() {
        super({
            survey: {
                formId: '',
                stateName: SurveyStateName.formDataViw
            }
        });
        this.surveyFormId$ = this.select(state => state.survey.formId);
        this.surveyFormDataViw$ = this.select(state => state.survey.stateName).pipe(map(it => it === SurveyStateName.formDataViw));
        this.surveyMapView$ = this.select(state => state.survey.stateName).pipe(map(it => it === SurveyStateName.mapView));
    }
    setSurveyFormId(formId) {
        this.emit({ survey: { stateName: this.state.survey.stateName, formId } });
    }
    setSurveyStateName(stateName) {
        this.emit({ survey: { formId: this.state.survey.formId, stateName } });
    }
}
FlagService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlagService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlagService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
export var SurveyStateName;
(function (SurveyStateName) {
    SurveyStateName[SurveyStateName["formDataViw"] = 0] = "formDataViw";
    SurveyStateName[SurveyStateName["mapView"] = 1] = "mapView";
})(SurveyStateName || (SurveyStateName = {}));
;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL3NlcnZpY2VzL3NyYy9mbGFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRzNCLE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBMEI7SUFJdkQ7UUFDSSxLQUFLLENBQUM7WUFDRixNQUFNLEVBQUM7Z0JBQ0gsTUFBTSxFQUFDLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFLGVBQWUsQ0FBQyxXQUFXO2FBQ3pDO1NBQ0osQ0FBQyxDQUFDO1FBVFAsa0JBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxFQUFFLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxFQUFFLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQSxFQUFFLENBQUEsRUFBRSxLQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hILG1CQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsRUFBRSxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUEsRUFBRSxDQUFBLEVBQUUsS0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQVF4RyxDQUFDO0lBQ0QsZUFBZSxDQUFDLE1BQWM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxTQUEwQjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsRUFBQyxDQUFDLENBQUM7SUFDckUsQ0FBQzs7eUdBakJRLFdBQVc7NkdBQVgsV0FBVyxjQURFLE1BQU07NEZBQ25CLFdBQVc7a0JBRHZCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDOztBQW9CakMsTUFBTSxDQUFOLElBQVksZUFBcUM7QUFBakQsV0FBWSxlQUFlO0lBQUMsbUVBQVcsQ0FBQTtJQUFFLDJEQUFPLENBQUE7QUFBQSxDQUFDLEVBQXJDLGVBQWUsS0FBZixlQUFlLFFBQXNCO0FBQUEsQ0FBQztBQU9qRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGF0ZUNvbnRyb2xsZXIgfSBmcm9tICcuL3N0YXRlJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBGbGFnU2VydmljZSBleHRlbmRzIFN0YXRlQ29udHJvbGxlcjxGbGFnU3RhdGU+e1xyXG4gICAgc3VydmV5Rm9ybUlkJCA9IHRoaXMuc2VsZWN0KHN0YXRlPT5zdGF0ZS5zdXJ2ZXkuZm9ybUlkKTtcclxuICAgIHN1cnZleUZvcm1EYXRhVml3JCA9IHRoaXMuc2VsZWN0KHN0YXRlPT5zdGF0ZS5zdXJ2ZXkuc3RhdGVOYW1lKS5waXBlKG1hcChpdD0+aXQ9PT1TdXJ2ZXlTdGF0ZU5hbWUuZm9ybURhdGFWaXcpKTtcclxuICAgIHN1cnZleU1hcFZpZXckID0gdGhpcy5zZWxlY3Qoc3RhdGU9PnN0YXRlLnN1cnZleS5zdGF0ZU5hbWUpLnBpcGUobWFwKGl0PT5pdD09PVN1cnZleVN0YXRlTmFtZS5tYXBWaWV3KSk7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgc3VydmV5OntcclxuICAgICAgICAgICAgICAgIGZvcm1JZDonJyxcclxuICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogU3VydmV5U3RhdGVOYW1lLmZvcm1EYXRhVml3XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFN1cnZleUZvcm1JZChmb3JtSWQ6IHN0cmluZyk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5lbWl0KHtzdXJ2ZXk6e3N0YXRlTmFtZTp0aGlzLnN0YXRlLnN1cnZleS5zdGF0ZU5hbWUsIGZvcm1JZH19KTtcclxuICAgIH1cclxuICAgIHNldFN1cnZleVN0YXRlTmFtZShzdGF0ZU5hbWU6IFN1cnZleVN0YXRlTmFtZSk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5lbWl0KHtzdXJ2ZXk6e2Zvcm1JZDp0aGlzLnN0YXRlLnN1cnZleS5mb3JtSWQsIHN0YXRlTmFtZX19KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZW51bSBTdXJ2ZXlTdGF0ZU5hbWV7Zm9ybURhdGFWaXcsIG1hcFZpZXd9O1xyXG5leHBvcnQgdHlwZSBTdXJ2ZXk9e1xyXG4gICAgZm9ybUlkOiBzdHJpbmc7XHJcbiAgICBzdGF0ZU5hbWU6IFN1cnZleVN0YXRlTmFtZTtcclxufTtcclxuZXhwb3J0IGludGVyZmFjZSBGbGFnU3RhdGV7XHJcbiAgICBzdXJ2ZXk6IFN1cnZleTtcclxufTtcclxuIl19