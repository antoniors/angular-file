import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
import * as i0 from "@angular/core";
var ngfBackground = /** @class */ (function () {
    function ngfBackground(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngfBackground.prototype.ngOnChanges = function (_changes) {
        var _this = this;
        dataUrl(this.file)
            .then(function (src) {
            var urlString = 'url(\'' + (src || '') + '\')';
            _this.ElementRef.nativeElement.style.backgroundImage = urlString;
        });
    };
    ngfBackground.ɵfac = function ngfBackground_Factory(t) { return new (t || ngfBackground)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    ngfBackground.ɵdir = i0.ɵɵdefineDirective({ type: ngfBackground, selectors: [["", "ngfBackground", ""]], inputs: { file: ["ngfBackground", "file"] }, features: [i0.ɵɵNgOnChangesFeature] });
    return ngfBackground;
}());
export { ngfBackground };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfBackground, [{
        type: Directive,
        args: [{ selector: '[ngfBackground]' }]
    }], function () { return [{ type: i0.ElementRef }]; }, { file: [{
            type: Input,
            args: ['ngfBackground']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmQmFja2dyb3VuZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZCYWNrZ3JvdW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFdEM7SUFJRSx1QkFBbUIsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztJQUFFLENBQUM7SUFFM0MsbUNBQVcsR0FBWCxVQUFhLFFBQVk7UUFBekIsaUJBTUM7UUFMQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ1AsSUFBTSxTQUFTLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNoRCxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQTtRQUNqRSxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7OEVBWFUsYUFBYTtzREFBYixhQUFhO3dCQUoxQjtDQWdCQyxBQWJELElBYUM7U0FaWSxhQUFhO2tEQUFiLGFBQWE7Y0FEekIsU0FBUztlQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDOztrQkFFckMsS0FBSzttQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBkYXRhVXJsIH0gZnJvbSAnLi9maWxlVG9vbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdmQmFja2dyb3VuZF0nfSlcclxuZXhwb3J0IGNsYXNzIG5nZkJhY2tncm91bmQge1xyXG4gIEBJbnB1dCgnbmdmQmFja2dyb3VuZCcpIGZpbGU6YW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBFbGVtZW50UmVmOkVsZW1lbnRSZWYpe31cclxuXHJcbiAgbmdPbkNoYW5nZXMoIF9jaGFuZ2VzOmFueSApe1xyXG4gICAgZGF0YVVybCh0aGlzLmZpbGUpXHJcbiAgICAudGhlbihzcmM9PntcclxuICAgICAgY29uc3QgdXJsU3RyaW5nID0gJ3VybChcXCcnICsgKHNyYyB8fCAnJykgKyAnXFwnKSdcclxuICAgICAgdGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gdXJsU3RyaW5nXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=