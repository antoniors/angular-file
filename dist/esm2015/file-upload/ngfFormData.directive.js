import { IterableDiffers, Directive, EventEmitter, Output, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ngfFormData {
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
}
ngfFormData.ɵfac = function ngfFormData_Factory(t) { return new (t || ngfFormData)(i0.ɵɵdirectiveInject(i0.IterableDiffers)); };
ngfFormData.ɵdir = i0.ɵɵdefineDirective({ type: ngfFormData, selectors: [["ngfFormData"]], inputs: { files: "files", postName: "postName", fileName: "fileName", FormData: "FormData" }, outputs: { FormDataChange: "FormDataChange" } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1maWxlLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvbmdmRm9ybURhdGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUFFLFlBQVksRUFDdkIsTUFBTSxFQUFFLEtBQUssRUFDZCxNQUFNLGVBQWUsQ0FBQzs7QUFHdkIsTUFBTSxPQUFPLFdBQVc7SUFVdEIsWUFBWSxlQUFnQztRQVJuQyxhQUFRLEdBQVUsTUFBTSxDQUFBO1FBR3hCLGFBQVEsR0FBWSxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBQ2pDLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUE7UUFLbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN4QztJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxPQUFPLEdBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUcsS0FBSyxDQUFBO1FBRS9FLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BFLENBQUE7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUE7U0FDMUM7YUFBSTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUNyQjtJQUNILENBQUM7O3NFQW5DVSxXQUFXO2dEQUFYLFdBQVc7a0RBQVgsV0FBVztjQUR2QixTQUFTO2VBQUMsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDOztrQkFFakMsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBRUwsS0FBSzs7a0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSXRlcmFibGVEaWZmZXIsXHJcbiAgSXRlcmFibGVEaWZmZXJzLFxyXG4gIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCwgSW5wdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdmRm9ybURhdGEnfSlcclxuZXhwb3J0IGNsYXNzIG5nZkZvcm1EYXRhIHtcclxuICBASW5wdXQoKSBmaWxlcyAhOiBGaWxlW11cclxuICBASW5wdXQoKSBwb3N0TmFtZTpzdHJpbmcgPSBcImZpbGVcIlxyXG4gIEBJbnB1dCgpIGZpbGVOYW1lICE6IHN0cmluZy8vZm9yY2UgZmlsZSBuYW1lXHJcblxyXG4gIEBJbnB1dCgpIEZvcm1EYXRhOkZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICBAT3V0cHV0KCkgRm9ybURhdGFDaGFuZ2U6RXZlbnRFbWl0dGVyPEZvcm1EYXRhPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBkaWZmZXI6SXRlcmFibGVEaWZmZXI8e30+XHJcblxyXG4gIGNvbnN0cnVjdG9yKEl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzKXtcclxuICAgIHRoaXMuZGlmZmVyID0gSXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpXHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKXtcclxuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZiggdGhpcy5maWxlcyApO1xyXG5cclxuICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuYnVpbGRGb3JtRGF0YSgpLCAwKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRGb3JtRGF0YSgpe1xyXG4gICAgY29uc3QgaXNBcnJheSA9IHR5cGVvZih0aGlzLmZpbGVzKT09PSdvYmplY3QnICYmIHRoaXMuZmlsZXMuY29uc3RydWN0b3I9PT1BcnJheVxyXG5cclxuICAgIGlmKCBpc0FycmF5ICl7XHJcbiAgICAgIHRoaXMuRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxyXG4gICAgICBjb25zdCBmaWxlcyA9IHRoaXMuZmlsZXMgfHwgW11cclxuICAgICAgZmlsZXMuZm9yRWFjaChmaWxlPT5cclxuICAgICAgICB0aGlzLkZvcm1EYXRhLmFwcGVuZCh0aGlzLnBvc3ROYW1lLCBmaWxlLCB0aGlzLmZpbGVOYW1lfHxmaWxlLm5hbWUpXHJcbiAgICAgIClcclxuICAgICAgdGhpcy5Gb3JtRGF0YUNoYW5nZS5lbWl0KCB0aGlzLkZvcm1EYXRhIClcclxuICAgIH1lbHNle1xyXG4gICAgICBkZWxldGUgdGhpcy5Gb3JtRGF0YVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==