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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsS0FBSyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFVdEIsWUFBWSxlQUFnQztRQVJuQyxhQUFRLEdBQVUsTUFBTSxDQUFBO1FBR3hCLGFBQVEsR0FBWSxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBQ2pDLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUE7UUFLbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN4QztJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxPQUFPLEdBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUcsS0FBSyxDQUFBO1FBRS9FLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BFLENBQUE7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUE7U0FDMUM7YUFBSTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUNyQjtJQUNILENBQUM7Q0FDRixDQUFBOztZQTFCOEIsZUFBZTs7QUFUbkM7SUFBUixLQUFLLEVBQUU7OzBDQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzs2Q0FBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7OzZDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTs4QkFBVSxRQUFROzZDQUFpQjtBQUNqQztJQUFULE1BQU0sRUFBRTs4QkFBZ0IsWUFBWTttREFBK0I7QUFOekQsV0FBVztJQUR2QixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7cUNBV04sZUFBZTtHQVZqQyxXQUFXLENBb0N2QjtTQXBDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCwgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdmRm9ybURhdGEnfSlcbmV4cG9ydCBjbGFzcyBuZ2ZGb3JtRGF0YSB7XG4gIEBJbnB1dCgpIGZpbGVzICE6IEZpbGVbXVxuICBASW5wdXQoKSBwb3N0TmFtZTpzdHJpbmcgPSBcImZpbGVcIlxuICBASW5wdXQoKSBmaWxlTmFtZSAhOiBzdHJpbmcvL2ZvcmNlIGZpbGUgbmFtZVxuXG4gIEBJbnB1dCgpIEZvcm1EYXRhOkZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgQE91dHB1dCgpIEZvcm1EYXRhQ2hhbmdlOkV2ZW50RW1pdHRlcjxGb3JtRGF0YT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBkaWZmZXI6SXRlcmFibGVEaWZmZXI8e30+XG5cbiAgY29uc3RydWN0b3IoSXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpe1xuICAgIHRoaXMuZGlmZmVyID0gSXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpXG4gIH1cblxuICBuZ0RvQ2hlY2soKXtcbiAgICB2YXIgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYoIHRoaXMuZmlsZXMgKTtcblxuICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLmJ1aWxkRm9ybURhdGEoKSwgMClcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKCl7XG4gICAgY29uc3QgaXNBcnJheSA9IHR5cGVvZih0aGlzLmZpbGVzKT09PSdvYmplY3QnICYmIHRoaXMuZmlsZXMuY29uc3RydWN0b3I9PT1BcnJheVxuXG4gICAgaWYoIGlzQXJyYXkgKXtcbiAgICAgIHRoaXMuRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGVzIHx8IFtdXG4gICAgICBmaWxlcy5mb3JFYWNoKGZpbGU9PlxuICAgICAgICB0aGlzLkZvcm1EYXRhLmFwcGVuZCh0aGlzLnBvc3ROYW1lLCBmaWxlLCB0aGlzLmZpbGVOYW1lfHxmaWxlLm5hbWUpXG4gICAgICApXG4gICAgICB0aGlzLkZvcm1EYXRhQ2hhbmdlLmVtaXQoIHRoaXMuRm9ybURhdGEgKVxuICAgIH1lbHNle1xuICAgICAgZGVsZXRlIHRoaXMuRm9ybURhdGFcbiAgICB9XG4gIH1cbn0iXX0=