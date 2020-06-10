import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
import * as i0 from "@angular/core";
export class ngfSrc {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => this.ElementRef.nativeElement.src = src);
    }
}
ngfSrc.ɵfac = function ngfSrc_Factory(t) { return new (t || ngfSrc)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ngfSrc.ɵdir = i0.ɵɵdefineDirective({ type: ngfSrc, selectors: [["", "ngfSrc", ""]], inputs: { file: ["ngfSrc", "file"] }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfSrc, [{
        type: Directive,
        args: [{ selector: '[ngfSrc]' }]
    }], function () { return [{ type: i0.ElementRef }]; }, { file: [{
            type: Input,
            args: ['ngfSrc']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU3JjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNyYy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBR3RDLE1BQU0sT0FBTyxNQUFNO0lBR2pCLFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxRQUFhO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUEsRUFBRSxDQUNULElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQ3hDLENBQUE7SUFDSCxDQUFDOzs0REFWVSxNQUFNOzJDQUFOLE1BQU07a0RBQU4sTUFBTTtjQURsQixTQUFTO2VBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFOztrQkFFaEMsS0FBSzttQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBkYXRhVXJsIH0gZnJvbSAnLi9maWxlVG9vbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nZlNyY10nIH0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZTcmMge1xyXG4gIEBJbnB1dCgnbmdmU3JjJykgZmlsZTogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBFbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IGFueSkge1xyXG4gICAgZGF0YVVybCh0aGlzLmZpbGUpXHJcbiAgICAudGhlbihzcmM9PlxyXG4gICAgICB0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBzcmNcclxuICAgIClcclxuICB9XHJcbn1cclxuIl19