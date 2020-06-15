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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZpbGUvIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC9uZ2ZEcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUM1QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFZLE1BQU0saUJBQWlCLENBQUE7QUFNL0MsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBUSxTQUFRLEdBQUc7SUFBaEM7O1FBQ1ksYUFBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGNBQVMsR0FBVyxLQUFLLENBQUE7UUFDeEIsb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxnQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNsQixzQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUc1RCxvQkFBZSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFBO0lBaUZ6RSxDQUFDO0lBOUVDLE1BQU0sQ0FBQyxLQUFXO1FBQ2hCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUMsT0FBTTtRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZO1FBQ3RCLElBQUks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QUssRUFBRTs7MENBQXdCO0FBQ3RCO0lBQVQsTUFBTSxFQUFFOzhCQUFpQixZQUFZO2dEQUFpQztBQUd2RTtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3BCLEtBQUs7O3FDQWFqQjtBQVFEO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7eUNBNEJyQjtBQVlEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7MENBZ0J0QjtBQTFGVSxPQUFPO0lBSm5CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO0tBQ3BCLENBQUM7R0FDVyxPQUFPLENBMkZuQjtTQTNGWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG5nZiwgZHJhZ01ldGEgfSBmcm9tIFwiLi9uZ2YuZGlyZWN0aXZlXCJcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltuZ2ZEcm9wXVwiLFxuICBleHBvcnRBczogXCJuZ2ZEcm9wXCJcbn0pXG5leHBvcnQgY2xhc3MgbmdmRHJvcCBleHRlbmRzIG5nZiB7XG4gIEBPdXRwdXQoKSBmaWxlT3ZlcjpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSB2YWxpZERyYWc6Ym9vbGVhbiA9IGZhbHNlXG4gIEBPdXRwdXQoKSB2YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgaW52YWxpZERyYWcgPSBmYWxzZVxuICBAT3V0cHV0KCkgaW52YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgZHJhZ0ZpbGVzICE6IGRyYWdNZXRhW11cbiAgQE91dHB1dCgpIGRyYWdGaWxlc0NoYW5nZTpFdmVudEVtaXR0ZXI8ZHJhZ01ldGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wKGV2ZW50OkV2ZW50KTp2b2lkIHtcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xuICAgICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZURyYWdzKClcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmV2ZW50VG9GaWxlcyhldmVudClcblxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXG5cbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcbiAgfVxuXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KGZhbHNlKS8vdHVybi1vZmYgZHJhZ292ZXJcbiAgICBzdXBlci5oYW5kbGVGaWxlcyhmaWxlcylcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgb25EcmFnT3ZlcihldmVudDpFdmVudCk6dm9pZCB7XG4gICAgaWYodGhpcy5maWxlRHJvcERpc2FibGVkKXtcbiAgICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zZmVyID0gdGhpcy5ldmVudFRvVHJhbnNmZXIoZXZlbnQpXG5cbiAgICBsZXQgZmlsZXMgPSB0aGlzLmV2ZW50VG9GaWxlcyhldmVudClcblxuICAgIGxldCBqc29uRmlsZXMgPSB0aGlzLmZpbGVzVG9Xcml0ZWFibGVPYmplY3QoZmlsZXMpXG4gICAgdGhpcy5kcmFnRmlsZXNDaGFuZ2UuZW1pdCggdGhpcy5kcmFnRmlsZXM9anNvbkZpbGVzIClcblxuICAgIGlmKCBmaWxlcy5sZW5ndGggKXtcbiAgICAgIHRoaXMudmFsaWREcmFnID0gdGhpcy5pc0ZpbGVzVmFsaWQoZmlsZXMpXG4gICAgfWVsc2V7XG4gICAgICAvL1NhZmFyaSwgSUUxMSAmIHNvbWUgYnJvd3NlcnMgZG8gTk9UIHRlbGwgeW91IGFib3V0IGRyYWdnZWQgZmlsZXMgdW50aWwgZHJvcHBlZC4gQWx3YXlzIGNvbnNpZGVyIGEgdmFsaWQgZHJhZ1xuICAgICAgdGhpcy52YWxpZERyYWcgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLnZhbGlkRHJhZylcblxuICAgIHRoaXMuaW52YWxpZERyYWcgPSAhdGhpcy52YWxpZERyYWdcbiAgICB0aGlzLmludmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy5pbnZhbGlkRHJhZylcblxuICAgIHRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weScvL2NoYW5nZSBjdXJzb3IgYW5kIHN1Y2hcbiAgICB0aGlzLnN0b3BFdmVudChldmVudClcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQodHJ1ZSlcbiAgfVxuXG4gIGNsb3NlRHJhZ3MoKXtcbiAgICBkZWxldGUgdGhpcy52YWxpZERyYWdcbiAgICB0aGlzLnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMudmFsaWREcmFnKVxuICAgIHRoaXMuaW52YWxpZERyYWcgPSBmYWxzZVxuICAgIHRoaXMuaW52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLmludmFsaWREcmFnKVxuICAgIGRlbGV0ZSB0aGlzLmRyYWdGaWxlc1xuICAgIHRoaXMuZHJhZ0ZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZHJhZ0ZpbGVzIClcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ0xlYXZlKGV2ZW50OkV2ZW50KTphbnkge1xuICAgIGlmKHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgXG4gICAgdGhpcy5jbG9zZURyYWdzKClcblxuICAgIGlmICgodGhpcyBhcyBhbnkpLmVsZW1lbnQpIHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ID09PSAodGhpcyBhcyBhbnkpLmVsZW1lbnRbMF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpO1xuICB9XG59Il19