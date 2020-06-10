import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
import * as i0 from "@angular/core";
var ngfSrc = /** @class */ (function () {
    function ngfSrc(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngfSrc.prototype.ngOnChanges = function (_changes) {
        var _this = this;
        dataUrl(this.file)
            .then(function (src) {
            return _this.ElementRef.nativeElement.src = src;
        });
    };
    ngfSrc.ɵfac = function ngfSrc_Factory(t) { return new (t || ngfSrc)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    ngfSrc.ɵdir = i0.ɵɵdefineDirective({ type: ngfSrc, selectors: [["", "ngfSrc", ""]], inputs: { file: ["ngfSrc", "file"] }, features: [i0.ɵɵNgOnChangesFeature] });
    return ngfSrc;
}());
export { ngfSrc };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfSrc, [{
        type: Directive,
        args: [{ selector: '[ngfSrc]' }]
    }], function () { return [{ type: i0.ElementRef }]; }, { file: [{
            type: Input,
            args: ['ngfSrc']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU3JjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNyYy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXRDO0lBSUUsZ0JBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRTlDLDRCQUFXLEdBQVgsVUFBWSxRQUFhO1FBQXpCLGlCQUtDO1FBSkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNQLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUc7UUFBdkMsQ0FBdUMsQ0FDeEMsQ0FBQTtJQUNILENBQUM7Z0VBVlUsTUFBTTsrQ0FBTixNQUFNO2lCQUpuQjtDQWVDLEFBWkQsSUFZQztTQVhZLE1BQU07a0RBQU4sTUFBTTtjQURsQixTQUFTO2VBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFOztrQkFFaEMsS0FBSzttQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBkYXRhVXJsIH0gZnJvbSAnLi9maWxlVG9vbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nZlNyY10nIH0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZTcmMge1xyXG4gIEBJbnB1dCgnbmdmU3JjJykgZmlsZTogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBFbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IGFueSkge1xyXG4gICAgZGF0YVVybCh0aGlzLmZpbGUpXHJcbiAgICAudGhlbihzcmM9PlxyXG4gICAgICB0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBzcmNcclxuICAgIClcclxuICB9XHJcbn1cclxuIl19