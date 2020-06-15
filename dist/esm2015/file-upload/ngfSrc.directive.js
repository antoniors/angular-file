import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
let ngfSrc = class ngfSrc {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => this.ElementRef.nativeElement.src = src);
    }
};
ngfSrc.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input('ngfSrc'),
    __metadata("design:type", Object)
], ngfSrc.prototype, "file", void 0);
ngfSrc = __decorate([
    Directive({ selector: '[ngfSrc]' }),
    __metadata("design:paramtypes", [ElementRef])
], ngfSrc);
export { ngfSrc };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU3JjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNyYy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RDLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUFHakIsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFOUMsV0FBVyxDQUFDLFFBQWE7UUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLENBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FDeEMsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBOztZQVJnQyxVQUFVOztBQUZ4QjtJQUFoQixLQUFLLENBQUMsUUFBUSxDQUFDOztvQ0FBVTtBQURmLE1BQU07SUFEbEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO3FDQUlILFVBQVU7R0FIOUIsTUFBTSxDQVdsQjtTQVhZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGRhdGFVcmwgfSBmcm9tICcuL2ZpbGVUb29scyc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdmU3JjXScgfSlcclxuZXhwb3J0IGNsYXNzIG5nZlNyYyB7XHJcbiAgQElucHV0KCduZ2ZTcmMnKSBmaWxlOiBhbnlcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhfY2hhbmdlczogYW55KSB7XHJcbiAgICBkYXRhVXJsKHRoaXMuZmlsZSlcclxuICAgIC50aGVuKHNyYz0+XHJcbiAgICAgIHRoaXMuRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHNyY1xyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXX0=