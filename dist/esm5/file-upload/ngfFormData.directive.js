import { __decorate, __metadata } from "tslib";
import { IterableDiffer, IterableDiffers, Directive, EventEmitter, Output, Input } from '@angular/core';
var ngfFormData = /** @class */ (function () {
    function ngfFormData(IterableDiffers) {
        this.postName = "file";
        this.FormData = new FormData();
        this.FormDataChange = new EventEmitter();
        this.differ = IterableDiffers.find([]).create();
    }
    ngfFormData.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.files);
        if (changes) {
            setTimeout(function () { return _this.buildFormData(); }, 0);
        }
    };
    ngfFormData.prototype.buildFormData = function () {
        var _this = this;
        var isArray = typeof (this.files) === 'object' && this.files.constructor === Array;
        if (isArray) {
            this.FormData = new FormData();
            var files = this.files || [];
            files.forEach(function (file) {
                return _this.FormData.append(_this.postName, file, _this.fileName || file.name);
            });
            this.FormDataChange.emit(this.FormData);
        }
        else {
            delete this.FormData;
        }
    };
    ngfFormData.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ngfFormData.prototype, "files", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ngfFormData.prototype, "postName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ngfFormData.prototype, "fileName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormData)
    ], ngfFormData.prototype, "FormData", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfFormData.prototype, "FormDataChange", void 0);
    ngfFormData = __decorate([
        Directive({ selector: 'ngfFormData' }),
        __metadata("design:paramtypes", [IterableDiffers])
    ], ngfFormData);
    return ngfFormData;
}());
export { ngfFormData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsS0FBSyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCO0lBVUUscUJBQVksZUFBZ0M7UUFSbkMsYUFBUSxHQUFVLE1BQU0sQ0FBQTtRQUd4QixhQUFRLEdBQVksSUFBSSxRQUFRLEVBQUUsQ0FBQTtRQUNqQyxtQkFBYyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBS2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUFBLGlCQU1DO1FBTEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLGNBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDeEM7SUFDSCxDQUFDO0lBRUQsbUNBQWEsR0FBYjtRQUFBLGlCQWFDO1FBWkMsSUFBTSxPQUFPLEdBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUcsS0FBSyxDQUFBO1FBRS9FLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQzlCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNoQixPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFuRSxDQUFtRSxDQUNwRSxDQUFBO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFBO1NBQzFDO2FBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDckI7SUFDSCxDQUFDOztnQkF6QjRCLGVBQWU7O0lBVG5DO1FBQVIsS0FBSyxFQUFFOzs4Q0FBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7aURBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOztpREFBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7a0NBQVUsUUFBUTtpREFBaUI7SUFDakM7UUFBVCxNQUFNLEVBQUU7a0NBQWdCLFlBQVk7dURBQStCO0lBTnpELFdBQVc7UUFEdkIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDO3lDQVdOLGVBQWU7T0FWakMsV0FBVyxDQW9DdkI7SUFBRCxrQkFBQztDQUFBLEFBcENELElBb0NDO1NBcENZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEl0ZXJhYmxlRGlmZmVyLFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsIElucHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nZkZvcm1EYXRhJ30pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZGb3JtRGF0YSB7XHJcbiAgQElucHV0KCkgZmlsZXMgITogRmlsZVtdXHJcbiAgQElucHV0KCkgcG9zdE5hbWU6c3RyaW5nID0gXCJmaWxlXCJcclxuICBASW5wdXQoKSBmaWxlTmFtZSAhOiBzdHJpbmcvL2ZvcmNlIGZpbGUgbmFtZVxyXG5cclxuICBASW5wdXQoKSBGb3JtRGF0YTpGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXHJcbiAgQE91dHB1dCgpIEZvcm1EYXRhQ2hhbmdlOkV2ZW50RW1pdHRlcjxGb3JtRGF0YT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgZGlmZmVyOkl0ZXJhYmxlRGlmZmVyPHt9PlxyXG5cclxuICBjb25zdHJ1Y3RvcihJdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyl7XHJcbiAgICB0aGlzLmRpZmZlciA9IEl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKVxyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCl7XHJcbiAgICB2YXIgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYoIHRoaXMuZmlsZXMgKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLmJ1aWxkRm9ybURhdGEoKSwgMClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkRm9ybURhdGEoKXtcclxuICAgIGNvbnN0IGlzQXJyYXkgPSB0eXBlb2YodGhpcy5maWxlcyk9PT0nb2JqZWN0JyAmJiB0aGlzLmZpbGVzLmNvbnN0cnVjdG9yPT09QXJyYXlcclxuXHJcbiAgICBpZiggaXNBcnJheSApe1xyXG4gICAgICB0aGlzLkZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGVzIHx8IFtdXHJcbiAgICAgIGZpbGVzLmZvckVhY2goZmlsZT0+XHJcbiAgICAgICAgdGhpcy5Gb3JtRGF0YS5hcHBlbmQodGhpcy5wb3N0TmFtZSwgZmlsZSwgdGhpcy5maWxlTmFtZXx8ZmlsZS5uYW1lKVxyXG4gICAgICApXHJcbiAgICAgIHRoaXMuRm9ybURhdGFDaGFuZ2UuZW1pdCggdGhpcy5Gb3JtRGF0YSApXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGVsZXRlIHRoaXMuRm9ybURhdGFcclxuICAgIH1cclxuICB9XHJcbn0iXX0=