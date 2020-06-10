import { Directive, EventEmitter, Output, Input } from '@angular/core';
import * as i0 from "@angular/core";
var ngfUploadStatus = /** @class */ (function () {
    function ngfUploadStatus() {
        this.percent = 0;
        this.percentChange = new EventEmitter();
    }
    ngfUploadStatus.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.httpEvent && changes.httpEvent.currentValue) {
            var event_1 = changes.httpEvent.currentValue;
            if (event_1.loaded && event_1.total) {
                setTimeout(function () {
                    _this.percent = Math.round(100 * event_1.loaded / event_1.total);
                    _this.percentChange.emit(_this.percent);
                }, 0);
            }
        }
    };
    ngfUploadStatus.ɵfac = function ngfUploadStatus_Factory(t) { return new (t || ngfUploadStatus)(); };
    ngfUploadStatus.ɵdir = i0.ɵɵdefineDirective({ type: ngfUploadStatus, selectors: [["ngfUploadStatus"]], inputs: { percent: "percent", httpEvent: "httpEvent" }, outputs: { percentChange: "percentChange" }, features: [i0.ɵɵNgOnChangesFeature] });
    return ngfUploadStatus;
}());
export { ngfUploadStatus };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFdkU7SUFBQTtRQUVXLFlBQU8sR0FBVSxDQUFDLENBQUE7UUFDakIsa0JBQWEsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtLQWNsRTtJQVhDLHFDQUFXLEdBQVgsVUFBYSxPQUFPO1FBQXBCLGlCQVVDO1FBVEMsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3ZELElBQU0sT0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBO1lBQzVDLElBQUksT0FBSyxDQUFDLE1BQU0sSUFBSSxPQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFLLENBQUMsTUFBTSxHQUFHLE9BQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBRSxDQUFBO2dCQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDTjtTQUNGO0lBQ0gsQ0FBQztrRkFmVSxlQUFlO3dEQUFmLGVBQWU7MEJBSDVCO0NBbUJDLEFBakJELElBaUJDO1NBaEJZLGVBQWU7a0RBQWYsZUFBZTtjQUQzQixTQUFTO2VBQUMsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7O2tCQUVyQyxLQUFLOztrQkFDTCxNQUFNOztrQkFDTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdmVXBsb2FkU3RhdHVzJ30pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZVcGxvYWRTdGF0dXMge1xyXG4gIEBJbnB1dCgpIHBlcmNlbnQ6bnVtYmVyID0gMFxyXG4gIEBPdXRwdXQoKSBwZXJjZW50Q2hhbmdlOkV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgQElucHV0KCkgaHR0cEV2ZW50ICE6IEV2ZW50XHJcblxyXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzICl7XHJcbiAgICBpZiggY2hhbmdlcy5odHRwRXZlbnQgJiYgY2hhbmdlcy5odHRwRXZlbnQuY3VycmVudFZhbHVlICl7XHJcbiAgICAgIGNvbnN0IGV2ZW50ID0gY2hhbmdlcy5odHRwRXZlbnQuY3VycmVudFZhbHVlXHJcbiAgICAgIGlmIChldmVudC5sb2FkZWQgJiYgZXZlbnQudG90YWwpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICB0aGlzLnBlcmNlbnQgPSBNYXRoLnJvdW5kKDEwMCAqIGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKTtcclxuICAgICAgICAgIHRoaXMucGVyY2VudENoYW5nZS5lbWl0KCB0aGlzLnBlcmNlbnQgKVxyXG4gICAgICAgIH0sIDApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXX0=