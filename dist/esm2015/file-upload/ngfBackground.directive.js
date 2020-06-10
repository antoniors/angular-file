import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
import * as i0 from "@angular/core";
export class ngfBackground {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => {
            const urlString = 'url(\'' + (src || '') + '\')';
            this.ElementRef.nativeElement.style.backgroundImage = urlString;
        });
    }
}
ngfBackground.ɵfac = function ngfBackground_Factory(t) { return new (t || ngfBackground)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ngfBackground.ɵdir = i0.ɵɵdefineDirective({ type: ngfBackground, selectors: [["", "ngfBackground", ""]], inputs: { file: ["ngfBackground", "file"] }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfBackground, [{
        type: Directive,
        args: [{ selector: '[ngfBackground]' }]
    }], function () { return [{ type: i0.ElementRef }]; }, { file: [{
            type: Input,
            args: ['ngfBackground']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmQmFja2dyb3VuZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZCYWNrZ3JvdW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFHdEMsTUFBTSxPQUFPLGFBQWE7SUFHeEIsWUFBbUIsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztJQUFFLENBQUM7SUFFM0MsV0FBVyxDQUFFLFFBQVk7UUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFO1lBQ1QsTUFBTSxTQUFTLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQTtRQUNqRSxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7OzBFQVhVLGFBQWE7a0RBQWIsYUFBYTtrREFBYixhQUFhO2NBRHpCLFNBQVM7ZUFBQyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBQzs7a0JBRXJDLEtBQUs7bUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZGF0YVVybCB9IGZyb20gJy4vZmlsZVRvb2xzJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nZkJhY2tncm91bmRdJ30pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZCYWNrZ3JvdW5kIHtcclxuICBASW5wdXQoJ25nZkJhY2tncm91bmQnKSBmaWxlOmFueVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgRWxlbWVudFJlZjpFbGVtZW50UmVmKXt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCBfY2hhbmdlczphbnkgKXtcclxuICAgIGRhdGFVcmwodGhpcy5maWxlKVxyXG4gICAgLnRoZW4oc3JjPT57XHJcbiAgICAgIGNvbnN0IHVybFN0cmluZyA9ICd1cmwoXFwnJyArIChzcmMgfHwgJycpICsgJ1xcJyknXHJcbiAgICAgIHRoaXMuRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHVybFN0cmluZ1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19