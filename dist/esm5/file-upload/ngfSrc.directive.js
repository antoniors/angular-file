import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
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
    ngfSrc.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input('ngfSrc'),
        __metadata("design:type", Object)
    ], ngfSrc.prototype, "file", void 0);
    ngfSrc = __decorate([
        Directive({ selector: '[ngfSrc]' }),
        __metadata("design:paramtypes", [ElementRef])
    ], ngfSrc);
    return ngfSrc;
}());
export { ngfSrc };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU3JjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNyYy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RDO0lBR0UsZ0JBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRTlDLDRCQUFXLEdBQVgsVUFBWSxRQUFhO1FBQXpCLGlCQUtDO1FBSkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNQLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUc7UUFBdkMsQ0FBdUMsQ0FDeEMsQ0FBQTtJQUNILENBQUM7O2dCQVA4QixVQUFVOztJQUZ4QjtRQUFoQixLQUFLLENBQUMsUUFBUSxDQUFDOzt3Q0FBVTtJQURmLE1BQU07UUFEbEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO3lDQUlILFVBQVU7T0FIOUIsTUFBTSxDQVdsQjtJQUFELGFBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBkYXRhVXJsIH0gZnJvbSAnLi9maWxlVG9vbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nZlNyY10nIH0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZTcmMge1xyXG4gIEBJbnB1dCgnbmdmU3JjJykgZmlsZTogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBFbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IGFueSkge1xyXG4gICAgZGF0YVVybCh0aGlzLmZpbGUpXHJcbiAgICAudGhlbihzcmM9PlxyXG4gICAgICB0aGlzLkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBzcmNcclxuICAgIClcclxuICB9XHJcbn1cclxuIl19