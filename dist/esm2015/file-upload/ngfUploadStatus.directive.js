import { Directive, EventEmitter, Output, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ngfUploadStatus {
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
}
ngfUploadStatus.ɵfac = function ngfUploadStatus_Factory(t) { return new (t || ngfUploadStatus)(); };
ngfUploadStatus.ɵdir = i0.ɵɵdefineDirective({ type: ngfUploadStatus, selectors: [["ngfUploadStatus"]], inputs: { percent: "percent", httpEvent: "httpEvent" }, outputs: { percentChange: "percentChange" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfUploadStatus, [{
        type: Directive,
        args: [{ selector: 'ngfUploadStatus' }]
    }], null, { percent: [{
            type: Input
        }], percentChange: [{
            type: Output
        }], httpEvent: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHdkUsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFVyxZQUFPLEdBQVUsQ0FBQyxDQUFBO1FBQ2pCLGtCQUFhLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUE7S0FjbEU7SUFYQyxXQUFXLENBQUUsT0FBTztRQUNsQixJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDdkQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUE7WUFDNUMsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLFVBQVUsQ0FBQyxHQUFFLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFBO2dCQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDTjtTQUNGO0lBQ0gsQ0FBQzs7OEVBZlUsZUFBZTtvREFBZixlQUFlO2tEQUFmLGVBQWU7Y0FEM0IsU0FBUztlQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDOztrQkFFckMsS0FBSzs7a0JBQ0wsTUFBTTs7a0JBQ04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nZlVwbG9hZFN0YXR1cyd9KVxyXG5leHBvcnQgY2xhc3MgbmdmVXBsb2FkU3RhdHVzIHtcclxuICBASW5wdXQoKSBwZXJjZW50Om51bWJlciA9IDBcclxuICBAT3V0cHV0KCkgcGVyY2VudENoYW5nZTpFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG4gIEBJbnB1dCgpIGh0dHBFdmVudCAhOiBFdmVudFxyXG5cclxuICBuZ09uQ2hhbmdlcyggY2hhbmdlcyApe1xyXG4gICAgaWYoIGNoYW5nZXMuaHR0cEV2ZW50ICYmIGNoYW5nZXMuaHR0cEV2ZW50LmN1cnJlbnRWYWx1ZSApe1xyXG4gICAgICBjb25zdCBldmVudCA9IGNoYW5nZXMuaHR0cEV2ZW50LmN1cnJlbnRWYWx1ZVxyXG4gICAgICBpZiAoZXZlbnQubG9hZGVkICYmIGV2ZW50LnRvdGFsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgdGhpcy5wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiBldmVudC5sb2FkZWQgLyBldmVudC50b3RhbCk7XHJcbiAgICAgICAgICB0aGlzLnBlcmNlbnRDaGFuZ2UuZW1pdCggdGhpcy5wZXJjZW50IClcclxuICAgICAgICB9LCAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59Il19