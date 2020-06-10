import { __extends } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ngf } from "./ngf.directive";
import * as i0 from "@angular/core";
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
    ngfDrop.ɵfac = function ngfDrop_Factory(t) { return ɵngfDrop_BaseFactory(t || ngfDrop); };
    ngfDrop.ɵdir = i0.ɵɵdefineDirective({ type: ngfDrop, selectors: [["", "ngfDrop", ""]], hostBindings: function ngfDrop_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("drop", function ngfDrop_drop_HostBindingHandler($event) { return ctx.onDrop($event); })("dragover", function ngfDrop_dragover_HostBindingHandler($event) { return ctx.onDragOver($event); })("dragleave", function ngfDrop_dragleave_HostBindingHandler($event) { return ctx.onDragLeave($event); });
        } }, inputs: { validDrag: "validDrag", invalidDrag: "invalidDrag", dragFiles: "dragFiles" }, outputs: { fileOver: "fileOver", validDragChange: "validDragChange", invalidDragChange: "invalidDragChange", dragFilesChange: "dragFilesChange" }, exportAs: ["ngfDrop"], features: [i0.ɵɵInheritDefinitionFeature] });
    return ngfDrop;
}(ngf));
export { ngfDrop };
var ɵngfDrop_BaseFactory = i0.ɵɵgetInheritedFactory(ngfDrop);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfDrop, [{
        type: Directive,
        args: [{
                selector: "[ngfDrop]",
                exportAs: "ngfDrop"
            }]
    }], null, { fileOver: [{
            type: Output
        }], validDrag: [{
            type: Input
        }], validDragChange: [{
            type: Output
        }], invalidDrag: [{
            type: Input
        }], invalidDragChange: [{
            type: Output
        }], dragFiles: [{
            type: Input
        }], dragFilesChange: [{
            type: Output
        }], onDrop: [{
            type: HostListener,
            args: ['drop', ['$event']]
        }], onDragOver: [{
            type: HostListener,
            args: ['dragover', ['$event']]
        }], onDragLeave: [{
            type: HostListener,
            args: ['dragleave', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZEcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUM1QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFZLE1BQU0saUJBQWlCLENBQUE7O0FBRS9DO0lBSTZCLDJCQUFHO0lBSmhDO1FBQUEscUVBK0ZDO1FBMUZXLGNBQVEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxlQUFTLEdBQVcsS0FBSyxDQUFBO1FBQ3hCLHFCQUFlLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsaUJBQVcsR0FBRyxLQUFLLENBQUE7UUFDbEIsdUJBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHNUQscUJBQWUsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQTs7S0FpRnhFO0lBOUVDLHdCQUFNLEdBRE4sVUFDTyxLQUFXO1FBQ2hCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUMsT0FBTTtRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxLQUFZO1FBQ3RCLElBQUksQ0FB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QVM7YUFDcEI7O2tCQUVFLE1BQU07O2tCQUVOLEtBQUs7O2tCQUNMLE1BQU07O2tCQUVOLEtBQUs7O2tCQUNMLE1BQU07O2tCQUVOLEtBQUs7O2tCQUNMLE1BQU07O2tCQUVOLFlBQVk7bUJBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFxQi9CLFlBQVk7bUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkF3Q25DLFlBQVk7bUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbmdmLCBkcmFnTWV0YSB9IGZyb20gXCIuL25nZi5kaXJlY3RpdmVcIlxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW25nZkRyb3BdXCIsXHJcbiAgZXhwb3J0QXM6IFwibmdmRHJvcFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZEcm9wIGV4dGVuZHMgbmdmIHtcclxuICBAT3V0cHV0KCkgZmlsZU92ZXI6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpIHZhbGlkRHJhZzpib29sZWFuID0gZmFsc2VcclxuICBAT3V0cHV0KCkgdmFsaWREcmFnQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBpbnZhbGlkRHJhZyA9IGZhbHNlXHJcbiAgQE91dHB1dCgpIGludmFsaWREcmFnQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBkcmFnRmlsZXMgITogZHJhZ01ldGFbXVxyXG4gIEBPdXRwdXQoKSBkcmFnRmlsZXNDaGFuZ2U6RXZlbnRFbWl0dGVyPGRyYWdNZXRhW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIG9uRHJvcChldmVudDpFdmVudCk6dm9pZCB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xvc2VEcmFncygpXHJcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmV2ZW50VG9GaWxlcyhldmVudClcclxuXHJcbiAgICBpZighZmlsZXMubGVuZ3RoKXJldHVyblxyXG5cclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpXHJcbiAgfVxyXG5cclxuICBoYW5kbGVGaWxlcyhmaWxlczpGaWxlW10pe1xyXG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KGZhbHNlKS8vdHVybi1vZmYgZHJhZ292ZXJcclxuICAgIHN1cGVyLmhhbmRsZUZpbGVzKGZpbGVzKVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ092ZXIoZXZlbnQ6RXZlbnQpOnZvaWQge1xyXG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcclxuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFuc2ZlciA9IHRoaXMuZXZlbnRUb1RyYW5zZmVyKGV2ZW50KVxyXG5cclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGxldCBqc29uRmlsZXMgPSB0aGlzLmZpbGVzVG9Xcml0ZWFibGVPYmplY3QoZmlsZXMpXHJcbiAgICB0aGlzLmRyYWdGaWxlc0NoYW5nZS5lbWl0KCB0aGlzLmRyYWdGaWxlcz1qc29uRmlsZXMgKVxyXG5cclxuICAgIGlmKCBmaWxlcy5sZW5ndGggKXtcclxuICAgICAgdGhpcy52YWxpZERyYWcgPSB0aGlzLmlzRmlsZXNWYWxpZChmaWxlcylcclxuICAgIH1lbHNle1xyXG4gICAgICAvL1NhZmFyaSwgSUUxMSAmIHNvbWUgYnJvd3NlcnMgZG8gTk9UIHRlbGwgeW91IGFib3V0IGRyYWdnZWQgZmlsZXMgdW50aWwgZHJvcHBlZC4gQWx3YXlzIGNvbnNpZGVyIGEgdmFsaWQgZHJhZ1xyXG4gICAgICB0aGlzLnZhbGlkRHJhZyA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMudmFsaWREcmFnKVxyXG5cclxuICAgIHRoaXMuaW52YWxpZERyYWcgPSAhdGhpcy52YWxpZERyYWdcclxuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxyXG5cclxuICAgIHRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weScvL2NoYW5nZSBjdXJzb3IgYW5kIHN1Y2hcclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KHRydWUpXHJcbiAgfVxyXG5cclxuICBjbG9zZURyYWdzKCl7XHJcbiAgICBkZWxldGUgdGhpcy52YWxpZERyYWdcclxuICAgIHRoaXMudmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy52YWxpZERyYWcpXHJcbiAgICB0aGlzLmludmFsaWREcmFnID0gZmFsc2VcclxuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxyXG4gICAgZGVsZXRlIHRoaXMuZHJhZ0ZpbGVzXHJcbiAgICB0aGlzLmRyYWdGaWxlc0NoYW5nZS5lbWl0KCB0aGlzLmRyYWdGaWxlcyApXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ0xlYXZlKGV2ZW50OkV2ZW50KTphbnkge1xyXG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcclxuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5jbG9zZURyYWdzKClcclxuXHJcbiAgICBpZiAoKHRoaXMgYXMgYW55KS5lbGVtZW50KSB7XHJcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ID09PSAodGhpcyBhcyBhbnkpLmVsZW1lbnRbMF0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpO1xyXG4gIH1cclxufSJdfQ==