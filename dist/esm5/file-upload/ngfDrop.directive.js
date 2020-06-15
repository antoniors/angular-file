import { __decorate, __extends, __metadata } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ngf } from "./ngf.directive";
var ngfDrop = /** @class */ (function (_super) {
    __extends(ngfDrop, _super);
    function ngfDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fileOver = new EventEmitter();
        _this.validDrag = false;
        _this.validDragChange = new EventEmitter();
        _this.invalidDrag = false;
        _this.invalidDragChange = new EventEmitter();
        _this.dragFilesChange = new EventEmitter();
        return _this;
    }
    ngfDrop.prototype.onDrop = function (event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        this.closeDrags();
        var files = this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    };
    ngfDrop.prototype.handleFiles = function (files) {
        this.fileOver.emit(false); //turn-off dragover
        _super.prototype.handleFiles.call(this, files);
    };
    ngfDrop.prototype.onDragOver = function (event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        var transfer = this.eventToTransfer(event);
        var files = this.eventToFiles(event);
        var jsonFiles = this.filesToWriteableObject(files);
        this.dragFilesChange.emit(this.dragFiles = jsonFiles);
        if (files.length) {
            this.validDrag = this.isFilesValid(files);
        }
        else {
            //Safari, IE11 & some browsers do NOT tell you about dragged files until dropped. Always consider a valid drag
            this.validDrag = true;
        }
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = !this.validDrag;
        this.invalidDragChange.emit(this.invalidDrag);
        transfer.dropEffect = 'copy'; //change cursor and such
        this.stopEvent(event);
        this.fileOver.emit(true);
    };
    ngfDrop.prototype.closeDrags = function () {
        delete this.validDrag;
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = false;
        this.invalidDragChange.emit(this.invalidDrag);
        delete this.dragFiles;
        this.dragFilesChange.emit(this.dragFiles);
    };
    ngfDrop.prototype.onDragLeave = function (event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        this.closeDrags();
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this.stopEvent(event);
        this.fileOver.emit(false);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfDrop.prototype, "fileOver", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ngfDrop.prototype, "validDrag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfDrop.prototype, "validDragChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ngfDrop.prototype, "invalidDrag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfDrop.prototype, "invalidDragChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ngfDrop.prototype, "dragFiles", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfDrop.prototype, "dragFilesChange", void 0);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ngfDrop.prototype, "onDrop", null);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ngfDrop.prototype, "onDragOver", null);
    __decorate([
        HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", Object)
    ], ngfDrop.prototype, "onDragLeave", null);
    ngfDrop = __decorate([
        Directive({
            selector: "[ngfDrop]",
            exportAs: "ngfDrop"
        })
    ], ngfDrop);
    return ngfDrop;
}(ngf));
export { ngfDrop };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZEcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUM1QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFZLE1BQU0saUJBQWlCLENBQUE7QUFNL0M7SUFBNkIsMkJBQUc7SUFBaEM7UUFBQSxxRUEyRkM7UUExRlcsY0FBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVMsR0FBVyxLQUFLLENBQUE7UUFDeEIscUJBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxpQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNsQix1QkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUc1RCxxQkFBZSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFBOztJQWlGekUsQ0FBQztJQTlFQyx3QkFBTSxHQUFOLFVBQU8sS0FBVztRQUNoQixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU07U0FDUDtRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXBDLElBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFDLE9BQU07UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksS0FBWTtRQUN0QixJQUFJ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QVIsS0FBSyxFQUFFOzs4Q0FBd0I7SUFDdEI7UUFBVCxNQUFNLEVBQUU7a0NBQWlCLFlBQVk7b0RBQWlDO0lBR3ZFO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDcEIsS0FBSzs7eUNBYWpCO0lBUUQ7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzs2Q0E0QnJCO0lBWUQ7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzs4Q0FnQnRCO0lBMUZVLE9BQU87UUFKbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztPQUNXLE9BQU8sQ0EyRm5CO0lBQUQsY0FBQztDQUFBLEFBM0ZELENBQTZCLEdBQUcsR0EyRi9CO1NBM0ZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBuZ2YsIGRyYWdNZXRhIH0gZnJvbSBcIi4vbmdmLmRpcmVjdGl2ZVwiXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbbmdmRHJvcF1cIixcclxuICBleHBvcnRBczogXCJuZ2ZEcm9wXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIG5nZkRyb3AgZXh0ZW5kcyBuZ2Yge1xyXG4gIEBPdXRwdXQoKSBmaWxlT3ZlcjpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQElucHV0KCkgdmFsaWREcmFnOmJvb2xlYW4gPSBmYWxzZVxyXG4gIEBPdXRwdXQoKSB2YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dCgpIGludmFsaWREcmFnID0gZmFsc2VcclxuICBAT3V0cHV0KCkgaW52YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dCgpIGRyYWdGaWxlcyAhOiBkcmFnTWV0YVtdXHJcbiAgQE91dHB1dCgpIGRyYWdGaWxlc0NoYW5nZTpFdmVudEVtaXR0ZXI8ZHJhZ01ldGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgb25Ecm9wKGV2ZW50OkV2ZW50KTp2b2lkIHtcclxuICAgIGlmKHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XHJcbiAgICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbG9zZURyYWdzKClcclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXHJcblxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcclxuICB9XHJcblxyXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpLy90dXJuLW9mZiBkcmFnb3ZlclxyXG4gICAgc3VwZXIuaGFuZGxlRmlsZXMoZmlsZXMpXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXHJcbiAgb25EcmFnT3ZlcihldmVudDpFdmVudCk6dm9pZCB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyYW5zZmVyID0gdGhpcy5ldmVudFRvVHJhbnNmZXIoZXZlbnQpXHJcblxyXG4gICAgbGV0IGZpbGVzID0gdGhpcy5ldmVudFRvRmlsZXMoZXZlbnQpXHJcblxyXG4gICAgbGV0IGpzb25GaWxlcyA9IHRoaXMuZmlsZXNUb1dyaXRlYWJsZU9iamVjdChmaWxlcylcclxuICAgIHRoaXMuZHJhZ0ZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZHJhZ0ZpbGVzPWpzb25GaWxlcyApXHJcblxyXG4gICAgaWYoIGZpbGVzLmxlbmd0aCApe1xyXG4gICAgICB0aGlzLnZhbGlkRHJhZyA9IHRoaXMuaXNGaWxlc1ZhbGlkKGZpbGVzKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIC8vU2FmYXJpLCBJRTExICYgc29tZSBicm93c2VycyBkbyBOT1QgdGVsbCB5b3UgYWJvdXQgZHJhZ2dlZCBmaWxlcyB1bnRpbCBkcm9wcGVkLiBBbHdheXMgY29uc2lkZXIgYSB2YWxpZCBkcmFnXHJcbiAgICAgIHRoaXMudmFsaWREcmFnID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy52YWxpZERyYWcpXHJcblxyXG4gICAgdGhpcy5pbnZhbGlkRHJhZyA9ICF0aGlzLnZhbGlkRHJhZ1xyXG4gICAgdGhpcy5pbnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMuaW52YWxpZERyYWcpXHJcblxyXG4gICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5Jy8vY2hhbmdlIGN1cnNvciBhbmQgc3VjaFxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpXHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQodHJ1ZSlcclxuICB9XHJcblxyXG4gIGNsb3NlRHJhZ3MoKXtcclxuICAgIGRlbGV0ZSB0aGlzLnZhbGlkRHJhZ1xyXG4gICAgdGhpcy52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLnZhbGlkRHJhZylcclxuICAgIHRoaXMuaW52YWxpZERyYWcgPSBmYWxzZVxyXG4gICAgdGhpcy5pbnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMuaW52YWxpZERyYWcpXHJcbiAgICBkZWxldGUgdGhpcy5kcmFnRmlsZXNcclxuICAgIHRoaXMuZHJhZ0ZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZHJhZ0ZpbGVzIClcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgb25EcmFnTGVhdmUoZXZlbnQ6RXZlbnQpOmFueSB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmNsb3NlRHJhZ3MoKVxyXG5cclxuICAgIGlmICgodGhpcyBhcyBhbnkpLmVsZW1lbnQpIHtcclxuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQgPT09ICh0aGlzIGFzIGFueSkuZWxlbWVudFswXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuZmlsZU92ZXIuZW1pdChmYWxzZSk7XHJcbiAgfVxyXG59Il19