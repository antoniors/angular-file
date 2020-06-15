import { __decorate, __metadata } from "tslib";
import { Directive, EventEmitter, Output, Input } from '@angular/core';
let ngfUploadStatus = class ngfUploadStatus {
    constructor() {
        this.percent = 0;
        this.percentChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.httpEvent && changes.httpEvent.currentValue) {
            const event = changes.httpEvent.currentValue;
            if (event.loaded && event.total) {
                setTimeout(() => {
                    this.percent = Math.round(100 * event.loaded / event.total);
                    this.percentChange.emit(this.percent);
                }, 0);
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], ngfUploadStatus.prototype, "percent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ngfUploadStatus.prototype, "percentChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Event)
], ngfUploadStatus.prototype, "httpEvent", void 0);
ngfUploadStatus = __decorate([
    Directive({ selector: 'ngfUploadStatus' })
], ngfUploadStatus);
export { ngfUploadStatus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUE1QjtRQUNXLFlBQU8sR0FBVSxDQUFDLENBQUE7UUFDakIsa0JBQWEsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQWNuRSxDQUFDO0lBWEMsV0FBVyxDQUFFLE9BQU87UUFDbEIsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBO1lBQzVDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixVQUFVLENBQUMsR0FBRSxFQUFFO29CQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQTtnQkFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ047U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBO0FBZlU7SUFBUixLQUFLLEVBQUU7O2dEQUFtQjtBQUNqQjtJQUFULE1BQU0sRUFBRTs4QkFBZSxZQUFZO3NEQUE2QjtBQUN4RDtJQUFSLEtBQUssRUFBRTs4QkFBYyxLQUFLO2tEQUFBO0FBSGhCLGVBQWU7SUFEM0IsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDLENBQUM7R0FDNUIsZUFBZSxDQWdCM0I7U0FoQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdmVXBsb2FkU3RhdHVzJ30pXG5leHBvcnQgY2xhc3MgbmdmVXBsb2FkU3RhdHVzIHtcbiAgQElucHV0KCkgcGVyY2VudDpudW1iZXIgPSAwXG4gIEBPdXRwdXQoKSBwZXJjZW50Q2hhbmdlOkV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIEBJbnB1dCgpIGh0dHBFdmVudCAhOiBFdmVudFxuXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzICl7XG4gICAgaWYoIGNoYW5nZXMuaHR0cEV2ZW50ICYmIGNoYW5nZXMuaHR0cEV2ZW50LmN1cnJlbnRWYWx1ZSApe1xuICAgICAgY29uc3QgZXZlbnQgPSBjaGFuZ2VzLmh0dHBFdmVudC5jdXJyZW50VmFsdWVcbiAgICAgIGlmIChldmVudC5sb2FkZWQgJiYgZXZlbnQudG90YWwpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgIHRoaXMucGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xuICAgICAgICAgIHRoaXMucGVyY2VudENoYW5nZS5lbWl0KCB0aGlzLnBlcmNlbnQgKVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==