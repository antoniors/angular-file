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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUE1QjtRQUNXLFlBQU8sR0FBVSxDQUFDLENBQUE7UUFDakIsa0JBQWEsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQWNuRSxDQUFDO0lBWEMsV0FBVyxDQUFFLE9BQU87UUFDbEIsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBO1lBQzVDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixVQUFVLENBQUMsR0FBRSxFQUFFO29CQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQTtnQkFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ047U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBO0FBZlU7SUFBUixLQUFLLEVBQUU7O2dEQUFtQjtBQUNqQjtJQUFULE1BQU0sRUFBRTs4QkFBZSxZQUFZO3NEQUE2QjtBQUN4RDtJQUFSLEtBQUssRUFBRTs4QkFBYyxLQUFLO2tEQUFBO0FBSGhCLGVBQWU7SUFEM0IsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDLENBQUM7R0FDNUIsZUFBZSxDQWdCM0I7U0FoQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nZlVwbG9hZFN0YXR1cyd9KVxyXG5leHBvcnQgY2xhc3MgbmdmVXBsb2FkU3RhdHVzIHtcclxuICBASW5wdXQoKSBwZXJjZW50Om51bWJlciA9IDBcclxuICBAT3V0cHV0KCkgcGVyY2VudENoYW5nZTpFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG4gIEBJbnB1dCgpIGh0dHBFdmVudCAhOiBFdmVudFxyXG5cclxuICBuZ09uQ2hhbmdlcyggY2hhbmdlcyApe1xyXG4gICAgaWYoIGNoYW5nZXMuaHR0cEV2ZW50ICYmIGNoYW5nZXMuaHR0cEV2ZW50LmN1cnJlbnRWYWx1ZSApe1xyXG4gICAgICBjb25zdCBldmVudCA9IGNoYW5nZXMuaHR0cEV2ZW50LmN1cnJlbnRWYWx1ZVxyXG4gICAgICBpZiAoZXZlbnQubG9hZGVkICYmIGV2ZW50LnRvdGFsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgdGhpcy5wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiBldmVudC5sb2FkZWQgLyBldmVudC50b3RhbCk7XHJcbiAgICAgICAgICB0aGlzLnBlcmNlbnRDaGFuZ2UuZW1pdCggdGhpcy5wZXJjZW50IClcclxuICAgICAgICB9LCAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59Il19