import { __decorate, __metadata } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ngf } from "./ngf.directive";
let ngfDrop = class ngfDrop extends ngf {
    constructor() {
        super(...arguments);
        this.fileOver = new EventEmitter();
        this.validDrag = false;
        this.validDragChange = new EventEmitter();
        this.invalidDrag = false;
        this.invalidDragChange = new EventEmitter();
        this.dragFilesChange = new EventEmitter();
    }
    onDrop(event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        this.closeDrags();
        let files = this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    }
    handleFiles(files) {
        this.fileOver.emit(false); //turn-off dragover
        super.handleFiles(files);
    }
    onDragOver(event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        const transfer = this.eventToTransfer(event);
        let files = this.eventToFiles(event);
        let jsonFiles = this.filesToWriteableObject(files);
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
    }
    closeDrags() {
        delete this.validDrag;
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = false;
        this.invalidDragChange.emit(this.invalidDrag);
        delete this.dragFiles;
        this.dragFilesChange.emit(this.dragFiles);
    }
    onDragLeave(event) {
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
    }
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
export { ngfDrop };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZEcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUM1QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFZLE1BQU0saUJBQWlCLENBQUE7QUFNL0MsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBUSxTQUFRLEdBQUc7SUFBaEM7O1FBQ1ksYUFBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGNBQVMsR0FBVyxLQUFLLENBQUE7UUFDeEIsb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxnQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNsQixzQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUc1RCxvQkFBZSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFBO0lBaUZ6RSxDQUFDO0lBOUVDLE1BQU0sQ0FBQyxLQUFXO1FBQ2hCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUMsT0FBTTtRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZO1FBQ3RCLElBQUks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QUssRUFBRTs7MENBQXdCO0FBQ3RCO0lBQVQsTUFBTSxFQUFFOzhCQUFpQixZQUFZO2dEQUFpQztBQUd2RTtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3BCLEtBQUs7O3FDQWFqQjtBQVFEO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7eUNBNEJyQjtBQVlEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7MENBZ0J0QjtBQTFGVSxPQUFPO0lBSm5CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO0tBQ3BCLENBQUM7R0FDVyxPQUFPLENBMkZuQjtTQTNGWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbmdmLCBkcmFnTWV0YSB9IGZyb20gXCIuL25nZi5kaXJlY3RpdmVcIlxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW25nZkRyb3BdXCIsXHJcbiAgZXhwb3J0QXM6IFwibmdmRHJvcFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZEcm9wIGV4dGVuZHMgbmdmIHtcclxuICBAT3V0cHV0KCkgZmlsZU92ZXI6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpIHZhbGlkRHJhZzpib29sZWFuID0gZmFsc2VcclxuICBAT3V0cHV0KCkgdmFsaWREcmFnQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBpbnZhbGlkRHJhZyA9IGZhbHNlXHJcbiAgQE91dHB1dCgpIGludmFsaWREcmFnQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBkcmFnRmlsZXMgITogZHJhZ01ldGFbXVxyXG4gIEBPdXRwdXQoKSBkcmFnRmlsZXNDaGFuZ2U6RXZlbnRFbWl0dGVyPGRyYWdNZXRhW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIG9uRHJvcChldmVudDpFdmVudCk6dm9pZCB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xvc2VEcmFncygpXHJcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmV2ZW50VG9GaWxlcyhldmVudClcclxuXHJcbiAgICBpZighZmlsZXMubGVuZ3RoKXJldHVyblxyXG5cclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpXHJcbiAgfVxyXG5cclxuICBoYW5kbGVGaWxlcyhmaWxlczpGaWxlW10pe1xyXG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KGZhbHNlKS8vdHVybi1vZmYgZHJhZ292ZXJcclxuICAgIHN1cGVyLmhhbmRsZUZpbGVzKGZpbGVzKVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ092ZXIoZXZlbnQ6RXZlbnQpOnZvaWQge1xyXG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcclxuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFuc2ZlciA9IHRoaXMuZXZlbnRUb1RyYW5zZmVyKGV2ZW50KVxyXG5cclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGxldCBqc29uRmlsZXMgPSB0aGlzLmZpbGVzVG9Xcml0ZWFibGVPYmplY3QoZmlsZXMpXHJcbiAgICB0aGlzLmRyYWdGaWxlc0NoYW5nZS5lbWl0KCB0aGlzLmRyYWdGaWxlcz1qc29uRmlsZXMgKVxyXG5cclxuICAgIGlmKCBmaWxlcy5sZW5ndGggKXtcclxuICAgICAgdGhpcy52YWxpZERyYWcgPSB0aGlzLmlzRmlsZXNWYWxpZChmaWxlcylcclxuICAgIH1lbHNle1xyXG4gICAgICAvL1NhZmFyaSwgSUUxMSAmIHNvbWUgYnJvd3NlcnMgZG8gTk9UIHRlbGwgeW91IGFib3V0IGRyYWdnZWQgZmlsZXMgdW50aWwgZHJvcHBlZC4gQWx3YXlzIGNvbnNpZGVyIGEgdmFsaWQgZHJhZ1xyXG4gICAgICB0aGlzLnZhbGlkRHJhZyA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMudmFsaWREcmFnKVxyXG5cclxuICAgIHRoaXMuaW52YWxpZERyYWcgPSAhdGhpcy52YWxpZERyYWdcclxuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxyXG5cclxuICAgIHRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weScvL2NoYW5nZSBjdXJzb3IgYW5kIHN1Y2hcclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KHRydWUpXHJcbiAgfVxyXG5cclxuICBjbG9zZURyYWdzKCl7XHJcbiAgICBkZWxldGUgdGhpcy52YWxpZERyYWdcclxuICAgIHRoaXMudmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy52YWxpZERyYWcpXHJcbiAgICB0aGlzLmludmFsaWREcmFnID0gZmFsc2VcclxuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxyXG4gICAgZGVsZXRlIHRoaXMuZHJhZ0ZpbGVzXHJcbiAgICB0aGlzLmRyYWdGaWxlc0NoYW5nZS5lbWl0KCB0aGlzLmRyYWdGaWxlcyApXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxyXG4gIG9uRHJhZ0xlYXZlKGV2ZW50OkV2ZW50KTphbnkge1xyXG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcclxuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5jbG9zZURyYWdzKClcclxuXHJcbiAgICBpZiAoKHRoaXMgYXMgYW55KS5lbGVtZW50KSB7XHJcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ID09PSAodGhpcyBhcyBhbnkpLmVsZW1lbnRbMF0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpO1xyXG4gIH1cclxufSJdfQ==