import { __decorate, __metadata } from "tslib";
import { IterableDiffer, IterableDiffers, Directive, EventEmitter, Output, Input } from '@angular/core';
let ngfFormData = class ngfFormData {
    constructor(IterableDiffers) {
        this.postName = "file";
        this.FormData = new FormData();
        this.FormDataChange = new EventEmitter();
        this.differ = IterableDiffers.find([]).create();
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.files);
        if (changes) {
            setTimeout(() => this.buildFormData(), 0);
        }
    }
    buildFormData() {
        const isArray = typeof (this.files) === 'object' && this.files.constructor === Array;
        if (isArray) {
            this.FormData = new FormData();
            const files = this.files || [];
            files.forEach(file => this.FormData.append(this.postName, file, this.fileName || file.name));
            this.FormDataChange.emit(this.FormData);
        }
        else {
            delete this.FormData;
        }
    }
};
ngfFormData.ctorParameters = () => [
    { type: IterableDiffers }
];
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
export { ngfFormData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsS0FBSyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFVdEIsWUFBWSxlQUFnQztRQVJuQyxhQUFRLEdBQVUsTUFBTSxDQUFBO1FBR3hCLGFBQVEsR0FBWSxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBQ2pDLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUE7UUFLbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN4QztJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxPQUFPLEdBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUcsS0FBSyxDQUFBO1FBRS9FLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BFLENBQUE7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUE7U0FDMUM7YUFBSTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUNyQjtJQUNILENBQUM7Q0FDRixDQUFBOztZQTFCOEIsZUFBZTs7QUFUbkM7SUFBUixLQUFLLEVBQUU7OzBDQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzs2Q0FBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7OzZDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTs4QkFBVSxRQUFROzZDQUFpQjtBQUNqQztJQUFULE1BQU0sRUFBRTs4QkFBZ0IsWUFBWTttREFBK0I7QUFOekQsV0FBVztJQUR2QixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7cUNBV04sZUFBZTtHQVZqQyxXQUFXLENBb0N2QjtTQXBDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJdGVyYWJsZURpZmZlcixcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LCBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ZGb3JtRGF0YSd9KVxyXG5leHBvcnQgY2xhc3MgbmdmRm9ybURhdGEge1xyXG4gIEBJbnB1dCgpIGZpbGVzICE6IEZpbGVbXVxyXG4gIEBJbnB1dCgpIHBvc3ROYW1lOnN0cmluZyA9IFwiZmlsZVwiXHJcbiAgQElucHV0KCkgZmlsZU5hbWUgITogc3RyaW5nLy9mb3JjZSBmaWxlIG5hbWVcclxuXHJcbiAgQElucHV0KCkgRm9ybURhdGE6Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxyXG4gIEBPdXRwdXQoKSBGb3JtRGF0YUNoYW5nZTpFdmVudEVtaXR0ZXI8Rm9ybURhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIGRpZmZlcjpJdGVyYWJsZURpZmZlcjx7fT5cclxuXHJcbiAgY29uc3RydWN0b3IoSXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpe1xyXG4gICAgdGhpcy5kaWZmZXIgPSBJdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKClcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpe1xyXG4gICAgdmFyIGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKCB0aGlzLmZpbGVzICk7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5idWlsZEZvcm1EYXRhKCksIDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZEZvcm1EYXRhKCl7XHJcbiAgICBjb25zdCBpc0FycmF5ID0gdHlwZW9mKHRoaXMuZmlsZXMpPT09J29iamVjdCcgJiYgdGhpcy5maWxlcy5jb25zdHJ1Y3Rvcj09PUFycmF5XHJcblxyXG4gICAgaWYoIGlzQXJyYXkgKXtcclxuICAgICAgdGhpcy5Gb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXHJcbiAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlcyB8fCBbXVxyXG4gICAgICBmaWxlcy5mb3JFYWNoKGZpbGU9PlxyXG4gICAgICAgIHRoaXMuRm9ybURhdGEuYXBwZW5kKHRoaXMucG9zdE5hbWUsIGZpbGUsIHRoaXMuZmlsZU5hbWV8fGZpbGUubmFtZSlcclxuICAgICAgKVxyXG4gICAgICB0aGlzLkZvcm1EYXRhQ2hhbmdlLmVtaXQoIHRoaXMuRm9ybURhdGEgKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLkZvcm1EYXRhXHJcbiAgICB9XHJcbiAgfVxyXG59Il19