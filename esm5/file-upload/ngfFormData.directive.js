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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsS0FBSyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCO0lBVUUscUJBQVksZUFBZ0M7UUFSbkMsYUFBUSxHQUFVLE1BQU0sQ0FBQTtRQUd4QixhQUFRLEdBQVksSUFBSSxRQUFRLEVBQUUsQ0FBQTtRQUNqQyxtQkFBYyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBS2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUFBLGlCQU1DO1FBTEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLGNBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDeEM7SUFDSCxDQUFDO0lBRUQsbUNBQWEsR0FBYjtRQUFBLGlCQWFDO1FBWkMsSUFBTSxPQUFPLEdBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUcsS0FBSyxDQUFBO1FBRS9FLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQzlCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNoQixPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFuRSxDQUFtRSxDQUNwRSxDQUFBO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFBO1NBQzFDO2FBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDckI7SUFDSCxDQUFDOztnQkF6QjRCLGVBQWU7O0lBVG5DO1FBQVIsS0FBSyxFQUFFOzs4Q0FBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7aURBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOztpREFBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7a0NBQVUsUUFBUTtpREFBaUI7SUFDakM7UUFBVCxNQUFNLEVBQUU7a0NBQWdCLFlBQVk7dURBQStCO0lBTnpELFdBQVc7UUFEdkIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDO3lDQVdOLGVBQWU7T0FWakMsV0FBVyxDQW9DdkI7SUFBRCxrQkFBQztDQUFBLEFBcENELElBb0NDO1NBcENZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LCBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ZGb3JtRGF0YSd9KVxuZXhwb3J0IGNsYXNzIG5nZkZvcm1EYXRhIHtcbiAgQElucHV0KCkgZmlsZXMgITogRmlsZVtdXG4gIEBJbnB1dCgpIHBvc3ROYW1lOnN0cmluZyA9IFwiZmlsZVwiXG4gIEBJbnB1dCgpIGZpbGVOYW1lICE6IHN0cmluZy8vZm9yY2UgZmlsZSBuYW1lXG5cbiAgQElucHV0KCkgRm9ybURhdGE6Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICBAT3V0cHV0KCkgRm9ybURhdGFDaGFuZ2U6RXZlbnRFbWl0dGVyPEZvcm1EYXRhPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGRpZmZlcjpJdGVyYWJsZURpZmZlcjx7fT5cblxuICBjb25zdHJ1Y3RvcihJdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyl7XG4gICAgdGhpcy5kaWZmZXIgPSBJdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKClcbiAgfVxuXG4gIG5nRG9DaGVjaygpe1xuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZiggdGhpcy5maWxlcyApO1xuXG4gICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuYnVpbGRGb3JtRGF0YSgpLCAwKVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkRm9ybURhdGEoKXtcbiAgICBjb25zdCBpc0FycmF5ID0gdHlwZW9mKHRoaXMuZmlsZXMpPT09J29iamVjdCcgJiYgdGhpcy5maWxlcy5jb25zdHJ1Y3Rvcj09PUFycmF5XG5cbiAgICBpZiggaXNBcnJheSApe1xuICAgICAgdGhpcy5Gb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgICBjb25zdCBmaWxlcyA9IHRoaXMuZmlsZXMgfHwgW11cbiAgICAgIGZpbGVzLmZvckVhY2goZmlsZT0+XG4gICAgICAgIHRoaXMuRm9ybURhdGEuYXBwZW5kKHRoaXMucG9zdE5hbWUsIGZpbGUsIHRoaXMuZmlsZU5hbWV8fGZpbGUubmFtZSlcbiAgICAgIClcbiAgICAgIHRoaXMuRm9ybURhdGFDaGFuZ2UuZW1pdCggdGhpcy5Gb3JtRGF0YSApXG4gICAgfWVsc2V7XG4gICAgICBkZWxldGUgdGhpcy5Gb3JtRGF0YVxuICAgIH1cbiAgfVxufSJdfQ==