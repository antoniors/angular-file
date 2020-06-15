import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
let ngfBackground = class ngfBackground {
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
};
ngfBackground.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input('ngfBackground'),
    __metadata("design:type", Object)
], ngfBackground.prototype, "file", void 0);
ngfBackground = __decorate([
    Directive({ selector: '[ngfBackground]' }),
    __metadata("design:paramtypes", [ElementRef])
], ngfBackground);
export { ngfBackground };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmQmFja2dyb3VuZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZCYWNrZ3JvdW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHdEMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUd4QixZQUFtQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO0lBQUUsQ0FBQztJQUUzQyxXQUFXLENBQUUsUUFBWTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQixJQUFJLENBQUMsR0FBRyxDQUFBLEVBQUU7WUFDVCxNQUFNLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFBO1FBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUE7O1lBVCtCLFVBQVU7O0FBRmhCO0lBQXZCLEtBQUssQ0FBQyxlQUFlLENBQUM7OzJDQUFTO0FBRHJCLGFBQWE7SUFEekIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDLENBQUM7cUNBSVQsVUFBVTtHQUg3QixhQUFhLENBWXpCO1NBWlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZGF0YVVybCB9IGZyb20gJy4vZmlsZVRvb2xzJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nZkJhY2tncm91bmRdJ30pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZCYWNrZ3JvdW5kIHtcclxuICBASW5wdXQoJ25nZkJhY2tncm91bmQnKSBmaWxlOmFueVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgRWxlbWVudFJlZjpFbGVtZW50UmVmKXt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCBfY2hhbmdlczphbnkgKXtcclxuICAgIGRhdGFVcmwodGhpcy5maWxlKVxyXG4gICAgLnRoZW4oc3JjPT57XHJcbiAgICAgIGNvbnN0IHVybFN0cmluZyA9ICd1cmwoXFwnJyArIChzcmMgfHwgJycpICsgJ1xcJyknXHJcbiAgICAgIHRoaXMuRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHVybFN0cmluZ1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19