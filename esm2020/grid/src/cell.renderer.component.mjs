import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CellRendererComponent {
    get userStatus() {
        return this.params?.templateName.startsWith('<user-status');
    }
    agInit(params) {
        this.params = params;
    }
}
CellRendererComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellRendererComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CellRendererComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CellRendererComponent, selector: "grid-cell-renderer", ngImport: i0, template: `
    <span *ngIf="userStatus" [ngClass]=" {'label':true,
    'label-danger': params?.data?.activated === false,
    'label-success': params?.data?.activated === true
}">
    {{params?.data?.activated? 'Activated' : 'Not Activated'}}
</span>
  `, isInline: true, styles: [".label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}.label-success{background-color:#5cb85c}.label-danger{background-color:#d9534f}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellRendererComponent, decorators: [{
            type: Component,
            args: [{ selector: 'grid-cell-renderer', template: `
    <span *ngIf="userStatus" [ngClass]=" {'label':true,
    'label-danger': params?.data?.activated === false,
    'label-success': params?.data?.activated === true
}">
    {{params?.data?.activated? 'Activated' : 'Not Activated'}}
</span>
  `, styles: [".label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}.label-success{background-color:#5cb85c}.label-danger{background-color:#d9534f}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdHJlYW1zdGVjaC91aS1zZGsvZ3JpZC9zcmMvY2VsbC5yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBbUMxQyxNQUFNLE9BQU8scUJBQXFCO0lBRTlCLElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBVztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7O21IQVBRLHFCQUFxQjt1R0FBckIscUJBQXFCLDBEQVRwQjs7Ozs7OztHQU9YOzRGQUVVLHFCQUFxQjtrQkFoQ2pDLFNBQVM7K0JBQ0ksb0JBQW9CLFlBc0JwQjs7Ozs7OztHQU9YIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dyaWQtY2VsbC1yZW5kZXJlcicsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAubGFiZWwge1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgcGFkZGluZzogMC4yZW0gMC42ZW0gMC4zZW07XHJcbiAgICBmb250LXNpemU6IDc1JTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuMjVlbTtcclxufVxyXG5cclxuLmxhYmVsLXN1Y2Nlc3N7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWNiODVjO1xyXG59XHJcbi5sYWJlbC1kYW5nZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDk1MzRmO1xyXG59XHJcbiAgICBgXSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8c3BhbiAqbmdJZj1cInVzZXJTdGF0dXNcIiBbbmdDbGFzc109XCIgeydsYWJlbCc6dHJ1ZSxcclxuICAgICdsYWJlbC1kYW5nZXInOiBwYXJhbXM/LmRhdGE/LmFjdGl2YXRlZCA9PT0gZmFsc2UsXHJcbiAgICAnbGFiZWwtc3VjY2Vzcyc6IHBhcmFtcz8uZGF0YT8uYWN0aXZhdGVkID09PSB0cnVlXHJcbn1cIj5cclxuICAgIHt7cGFyYW1zPy5kYXRhPy5hY3RpdmF0ZWQ/ICdBY3RpdmF0ZWQnIDogJ05vdCBBY3RpdmF0ZWQnfX1cclxuPC9zcGFuPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDZWxsUmVuZGVyZXJDb21wb25lbnQge1xyXG4gICAgcHVibGljIHBhcmFtcz86IGFueTtcclxuICAgIGdldCB1c2VyU3RhdHVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtcz8udGVtcGxhdGVOYW1lLnN0YXJ0c1dpdGgoJzx1c2VyLXN0YXR1cycpO1xyXG4gICAgfVxyXG4gICAgYWdJbml0KHBhcmFtczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=