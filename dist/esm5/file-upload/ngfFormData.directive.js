import { IterableDiffers, Directive, EventEmitter, Output, Input } from '@angular/core';
import * as i0 from "@angular/core";
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
    ngfFormData.ɵfac = function ngfFormData_Factory(t) { return new (t || ngfFormData)(i0.ɵɵdirectiveInject(i0.IterableDiffers)); };
    ngfFormData.ɵdir = i0.ɵɵdefineDirective({ type: ngfFormData, selectors: [["ngfFormData"]], inputs: { files: "files", postName: "postName", fileName: "fileName", FormData: "FormData" }, outputs: { FormDataChange: "FormDataChange" } });
    return ngfFormData;
}());
export { ngfFormData };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfFormData, [{
        type: Directive,
        args: [{ selector: 'ngfFormData' }]
    }], function () { return [{ type: i0.IterableDiffers }]; }, { files: [{
            type: Input
        }], postName: [{
            type: Input
        }], fileName: [{
            type: Input
        }], FormData: [{
            type: Input
        }], FormDataChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUFFLFlBQVksRUFDdkIsTUFBTSxFQUFFLEtBQUssRUFDZCxNQUFNLGVBQWUsQ0FBQzs7QUFFdkI7SUFXRSxxQkFBWSxlQUFnQztRQVJuQyxhQUFRLEdBQVUsTUFBTSxDQUFBO1FBR3hCLGFBQVEsR0FBWSxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBQ2pDLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUE7UUFLbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQUEsaUJBTUM7UUFMQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7UUFFN0MsSUFBSSxPQUFPLEVBQUU7WUFDWCxVQUFVLENBQUMsY0FBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN4QztJQUNILENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQUEsaUJBYUM7UUFaQyxJQUFNLE9BQU8sR0FBRyxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBRyxLQUFLLENBQUE7UUFFL0UsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7WUFDOUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUE7WUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2hCLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQW5FLENBQW1FLENBQ3BFLENBQUE7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUE7U0FDMUM7YUFBSTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUNyQjtJQUNILENBQUM7MEVBbkNVLFdBQVc7b0RBQVgsV0FBVztzQkFSeEI7Q0E0Q0MsQUFyQ0QsSUFxQ0M7U0FwQ1ksV0FBVztrREFBWCxXQUFXO2NBRHZCLFNBQVM7ZUFBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUM7O2tCQUVqQyxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFFTCxLQUFLOztrQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJdGVyYWJsZURpZmZlcixcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LCBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ZGb3JtRGF0YSd9KVxyXG5leHBvcnQgY2xhc3MgbmdmRm9ybURhdGEge1xyXG4gIEBJbnB1dCgpIGZpbGVzICE6IEZpbGVbXVxyXG4gIEBJbnB1dCgpIHBvc3ROYW1lOnN0cmluZyA9IFwiZmlsZVwiXHJcbiAgQElucHV0KCkgZmlsZU5hbWUgITogc3RyaW5nLy9mb3JjZSBmaWxlIG5hbWVcclxuXHJcbiAgQElucHV0KCkgRm9ybURhdGE6Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxyXG4gIEBPdXRwdXQoKSBGb3JtRGF0YUNoYW5nZTpFdmVudEVtaXR0ZXI8Rm9ybURhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIGRpZmZlcjpJdGVyYWJsZURpZmZlcjx7fT5cclxuXHJcbiAgY29uc3RydWN0b3IoSXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpe1xyXG4gICAgdGhpcy5kaWZmZXIgPSBJdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKClcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpe1xyXG4gICAgdmFyIGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKCB0aGlzLmZpbGVzICk7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5idWlsZEZvcm1EYXRhKCksIDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZEZvcm1EYXRhKCl7XHJcbiAgICBjb25zdCBpc0FycmF5ID0gdHlwZW9mKHRoaXMuZmlsZXMpPT09J29iamVjdCcgJiYgdGhpcy5maWxlcy5jb25zdHJ1Y3Rvcj09PUFycmF5XHJcblxyXG4gICAgaWYoIGlzQXJyYXkgKXtcclxuICAgICAgdGhpcy5Gb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXHJcbiAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlcyB8fCBbXVxyXG4gICAgICBmaWxlcy5mb3JFYWNoKGZpbGU9PlxyXG4gICAgICAgIHRoaXMuRm9ybURhdGEuYXBwZW5kKHRoaXMucG9zdE5hbWUsIGZpbGUsIHRoaXMuZmlsZU5hbWV8fGZpbGUubmFtZSlcclxuICAgICAgKVxyXG4gICAgICB0aGlzLkZvcm1EYXRhQ2hhbmdlLmVtaXQoIHRoaXMuRm9ybURhdGEgKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLkZvcm1EYXRhXHJcbiAgICB9XHJcbiAgfVxyXG59Il19