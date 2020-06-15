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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZEcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUM1QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFZLE1BQU0saUJBQWlCLENBQUE7QUFNL0M7SUFBNkIsMkJBQUc7SUFBaEM7UUFBQSxxRUEyRkM7UUExRlcsY0FBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVMsR0FBVyxLQUFLLENBQUE7UUFDeEIscUJBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxpQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNsQix1QkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUc1RCxxQkFBZSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFBOztJQWlGekUsQ0FBQztJQTlFQyx3QkFBTSxHQUFOLFVBQU8sS0FBVztRQUNoQixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU07U0FDUDtRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXBDLElBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFDLE9BQU07UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksS0FBWTtRQUN0QixJQUFJ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QVIsS0FBSyxFQUFFOzs4Q0FBd0I7SUFDdEI7UUFBVCxNQUFNLEVBQUU7a0NBQWlCLFlBQVk7b0RBQWlDO0lBR3ZFO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDcEIsS0FBSzs7eUNBYWpCO0lBUUQ7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzs2Q0E0QnJCO0lBWUQ7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzs4Q0FnQnRCO0lBMUZVLE9BQU87UUFKbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztPQUNXLE9BQU8sQ0EyRm5CO0lBQUQsY0FBQztDQUFBLEFBM0ZELENBQTZCLEdBQUcsR0EyRi9CO1NBM0ZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbmdmLCBkcmFnTWV0YSB9IGZyb20gXCIuL25nZi5kaXJlY3RpdmVcIlxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW25nZkRyb3BdXCIsXG4gIGV4cG9ydEFzOiBcIm5nZkRyb3BcIlxufSlcbmV4cG9ydCBjbGFzcyBuZ2ZEcm9wIGV4dGVuZHMgbmdmIHtcbiAgQE91dHB1dCgpIGZpbGVPdmVyOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHZhbGlkRHJhZzpib29sZWFuID0gZmFsc2VcbiAgQE91dHB1dCgpIHZhbGlkRHJhZ0NoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBpbnZhbGlkRHJhZyA9IGZhbHNlXG4gIEBPdXRwdXQoKSBpbnZhbGlkRHJhZ0NoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBkcmFnRmlsZXMgITogZHJhZ01ldGFbXVxuICBAT3V0cHV0KCkgZHJhZ0ZpbGVzQ2hhbmdlOkV2ZW50RW1pdHRlcjxkcmFnTWV0YVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBvbkRyb3AoZXZlbnQ6RXZlbnQpOnZvaWQge1xuICAgIGlmKHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlRHJhZ3MoKVxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxuXG4gICAgaWYoIWZpbGVzLmxlbmd0aClyZXR1cm5cblxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKVxuICB9XG5cbiAgaGFuZGxlRmlsZXMoZmlsZXM6RmlsZVtdKXtcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpLy90dXJuLW9mZiBkcmFnb3ZlclxuICAgIHN1cGVyLmhhbmRsZUZpbGVzKGZpbGVzKVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBvbkRyYWdPdmVyKGV2ZW50OkV2ZW50KTp2b2lkIHtcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNmZXIgPSB0aGlzLmV2ZW50VG9UcmFuc2ZlcihldmVudClcblxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxuXG4gICAgbGV0IGpzb25GaWxlcyA9IHRoaXMuZmlsZXNUb1dyaXRlYWJsZU9iamVjdChmaWxlcylcbiAgICB0aGlzLmRyYWdGaWxlc0NoYW5nZS5lbWl0KCB0aGlzLmRyYWdGaWxlcz1qc29uRmlsZXMgKVxuXG4gICAgaWYoIGZpbGVzLmxlbmd0aCApe1xuICAgICAgdGhpcy52YWxpZERyYWcgPSB0aGlzLmlzRmlsZXNWYWxpZChmaWxlcylcbiAgICB9ZWxzZXtcbiAgICAgIC8vU2FmYXJpLCBJRTExICYgc29tZSBicm93c2VycyBkbyBOT1QgdGVsbCB5b3UgYWJvdXQgZHJhZ2dlZCBmaWxlcyB1bnRpbCBkcm9wcGVkLiBBbHdheXMgY29uc2lkZXIgYSB2YWxpZCBkcmFnXG4gICAgICB0aGlzLnZhbGlkRHJhZyA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMudmFsaWREcmFnKVxuXG4gICAgdGhpcy5pbnZhbGlkRHJhZyA9ICF0aGlzLnZhbGlkRHJhZ1xuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxuXG4gICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5Jy8vY2hhbmdlIGN1cnNvciBhbmQgc3VjaFxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KVxuICAgIHRoaXMuZmlsZU92ZXIuZW1pdCh0cnVlKVxuICB9XG5cbiAgY2xvc2VEcmFncygpe1xuICAgIGRlbGV0ZSB0aGlzLnZhbGlkRHJhZ1xuICAgIHRoaXMudmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy52YWxpZERyYWcpXG4gICAgdGhpcy5pbnZhbGlkRHJhZyA9IGZhbHNlXG4gICAgdGhpcy5pbnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMuaW52YWxpZERyYWcpXG4gICAgZGVsZXRlIHRoaXMuZHJhZ0ZpbGVzXG4gICAgdGhpcy5kcmFnRmlsZXNDaGFuZ2UuZW1pdCggdGhpcy5kcmFnRmlsZXMgKVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgb25EcmFnTGVhdmUoZXZlbnQ6RXZlbnQpOmFueSB7XG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcbiAgICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICB0aGlzLmNsb3NlRHJhZ3MoKVxuXG4gICAgaWYgKCh0aGlzIGFzIGFueSkuZWxlbWVudCkge1xuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQgPT09ICh0aGlzIGFzIGFueSkuZWxlbWVudFswXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuZmlsZU92ZXIuZW1pdChmYWxzZSk7XG4gIH1cbn0iXX0=