import { __decorate, __metadata } from "tslib";
import { Directive, EventEmitter, ElementRef, Input, Output, HostListener } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions";
import { acceptType, applyExifRotation, dataUrl } from "./fileTools";
/** A master base set of logic intended to support file select/drag/drop operations
 NOTE: Use ngfDrop for full drag/drop. Use ngfSelect for selecting
*/
let ngf = class ngf {
    constructor(element) {
        this.element = element;
        this.filters = [];
        this.lastFileCount = 0;
        //@Input() forceFilename:string
        //@Input() forcePostname:string
        this.ngfFixOrientation = true;
        this.fileDropDisabled = false;
        this.selectable = false;
        this.directiveInit = new EventEmitter();
        this.lastInvalids = [];
        this.lastInvalidsChange = new EventEmitter();
        this.lastBaseUrlChange = new EventEmitter();
        this.fileChange = new EventEmitter();
        this.files = [];
        this.filesChange = new EventEmitter();
        this.initFilters();
    }
    initFilters() {
        // the order is important
        this.filters.push({ name: 'accept', fn: this._acceptFilter });
        this.filters.push({ name: 'fileSize', fn: this._fileSizeFilter });
        //this.filters.push({name: 'fileType', fn: this._fileTypeFilter})
        //this.filters.push({name: 'queueLimit', fn: this._queueLimitFilter})
        //this.filters.push({name: 'mimeType', fn: this._mimeTypeFilter})
    }
    ngOnDestroy() {
        delete this.fileElm; //faster memory release of dom element
    }
    ngOnInit() {
        if (this.selectable) {
            this.enableSelecting();
        }
        if (this.multiple) {
            this.paramFileElm().setAttribute('multiple', this.multiple);
        }
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.directiveInit.emit(this);
        }, 0);
    }
    ngOnChanges(changes) {
        if (changes.accept) {
            this.paramFileElm().setAttribute('accept', changes.accept.currentValue || '*');
        }
    }
    paramFileElm() {
        if (this.fileElm)
            return this.fileElm; //already defined
        //elm is a file input
        const isFile = isFileInput(this.element.nativeElement);
        if (isFile)
            return this.fileElm = this.element.nativeElement;
        //create foo file input
        const label = createInvisibleFileInputWrap();
        this.fileElm = label.getElementsByTagName('input')[0];
        this.fileElm.addEventListener('change', this.changeFn.bind(this));
        this.element.nativeElement.appendChild(label);
        return this.fileElm;
    }
    enableSelecting() {
        let elm = this.element.nativeElement;
        if (isFileInput(elm)) {
            const bindedHandler = _ev => this.beforeSelect();
            elm.addEventListener('click', bindedHandler);
            elm.addEventListener('touchstart', bindedHandler);
            return;
        }
        const bindedHandler = ev => this.clickHandler(ev);
        elm.addEventListener('click', bindedHandler);
        elm.addEventListener('touchstart', bindedHandler);
        elm.addEventListener('touchend', bindedHandler);
    }
    getValidFiles(files) {
        const rtn = [];
        for (let x = files.length - 1; x >= 0; --x) {
            if (this.isFileValid(files[x])) {
                rtn.push(files[x]);
            }
        }
        return rtn;
    }
    getInvalidFiles(files) {
        const rtn = [];
        for (let x = files.length - 1; x >= 0; --x) {
            let failReason = this.getFileFilterFailName(files[x]);
            if (failReason) {
                rtn.push({
                    file: files[x],
                    type: failReason
                });
            }
        }
        return rtn;
    }
    handleFiles(files) {
        const valids = this.getValidFiles(files);
        if (files.length != valids.length) {
            this.lastInvalids = this.getInvalidFiles(files);
        }
        else {
            delete this.lastInvalids;
        }
        this.lastInvalidsChange.emit(this.lastInvalids);
        if (valids.length) {
            if (this.ngfFixOrientation) {
                this.applyExifRotations(valids)
                    .then(fixedFiles => this.que(fixedFiles));
            }
            else {
                this.que(valids);
            }
        }
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    }
    que(files) {
        this.files = this.files || [];
        Array.prototype.push.apply(this.files, files);
        //below break memory ref and doesnt act like a que
        //this.files = files//causes memory change which triggers bindings like <ngfFormData [files]="files"></ngfFormData>
        this.filesChange.emit(this.files);
        if (files.length) {
            this.fileChange.emit(this.file = files[0]);
            if (this.lastBaseUrlChange.observers.length) {
                dataUrl(files[0])
                    .then(url => this.lastBaseUrlChange.emit(url));
            }
        }
        //will be checked for input value clearing
        this.lastFileCount = this.files.length;
    }
    /** called when input has files */
    changeFn(event) {
        var fileList = event.__files_ || (event.target && event.target.files);
        if (!fileList)
            return;
        this.stopEvent(event);
        this.handleFiles(fileList);
    }
    clickHandler(evt) {
        const elm = this.element.nativeElement;
        if (elm.getAttribute('disabled') || this.fileDropDisabled) {
            return false;
        }
        var r = detectSwipe(evt);
        // prevent the click if it is a swipe
        if (r !== false)
            return r;
        const fileElm = this.paramFileElm();
        fileElm.click();
        //fileElm.dispatchEvent( new Event('click') );
        this.beforeSelect();
        return false;
    }
    beforeSelect() {
        if (this.files && this.lastFileCount === this.files.length)
            return;
        //if no files in array, be sure browser doesnt prevent reselect of same file (see github issue 27)
        this.fileElm.value = null;
    }
    isEmptyAfterSelection() {
        return !!this.element.nativeElement.attributes.multiple;
    }
    eventToTransfer(event) {
        if (event.dataTransfer)
            return event.dataTransfer;
        return event.originalEvent ? event.originalEvent.dataTransfer : null;
    }
    stopEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    transferHasFiles(transfer) {
        if (!transfer.types) {
            return false;
        }
        if (transfer.types.indexOf) {
            return transfer.types.indexOf('Files') !== -1;
        }
        else if (transfer.types.contains) {
            return transfer.types.contains('Files');
        }
        else {
            return false;
        }
    }
    eventToFiles(event) {
        const transfer = this.eventToTransfer(event);
        if (transfer) {
            if (transfer.files && transfer.files.length) {
                return transfer.files;
            }
            if (transfer.items && transfer.items.length) {
                return transfer.items;
            }
        }
        return [];
    }
    applyExifRotations(files) {
        const mapper = (file, index) => {
            return applyExifRotation(file)
                .then(fixedFile => files.splice(index, 1, fixedFile));
        };
        const proms = [];
        for (let x = files.length - 1; x >= 0; --x) {
            proms[x] = mapper(files[x], x);
        }
        return Promise.all(proms).then(() => files);
    }
    onChange(event) {
        let files = this.element.nativeElement.files || this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    }
    getFileFilterFailName(file) {
        for (let i = 0; i < this.filters.length; i++) {
            if (!this.filters[i].fn.call(this, file)) {
                return this.filters[i].name;
            }
        }
        return undefined;
    }
    isFileValid(file) {
        const noFilters = !this.accept && (!this.filters || !this.filters.length);
        if (noFilters) {
            return true; //we have no filters so all files are valid
        }
        return this.getFileFilterFailName(file) ? false : true;
    }
    isFilesValid(files) {
        for (let x = files.length - 1; x >= 0; --x) {
            if (!this.isFileValid(files[x])) {
                return false;
            }
        }
        return true;
    }
    _acceptFilter(item) {
        return acceptType(this.accept, item.type, item.name);
    }
    _fileSizeFilter(item) {
        return !(this.maxSize && item.size > this.maxSize);
    }
    /** browsers try hard to conceal data about file drags, this tends to undo that */
    filesToWriteableObject(files) {
        const jsonFiles = [];
        for (let x = 0; x < files.length; ++x) {
            jsonFiles.push({
                type: files[x].type,
                kind: files[x]["kind"]
            });
        }
        return jsonFiles;
    }
};
ngf.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], ngf.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ngf.prototype, "accept", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ngf.prototype, "maxSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ngf.prototype, "ngfFixOrientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ngf.prototype, "fileDropDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ngf.prototype, "selectable", void 0);
__decorate([
    Output('init'),
    __metadata("design:type", EventEmitter)
], ngf.prototype, "directiveInit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ngf.prototype, "lastInvalids", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ngf.prototype, "lastInvalidsChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ngf.prototype, "lastBaseUrl", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ngf.prototype, "lastBaseUrlChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", File)
], ngf.prototype, "file", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ngf.prototype, "fileChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ngf.prototype, "files", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ngf.prototype, "filesChange", void 0);
__decorate([
    HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ngf.prototype, "onChange", null);
ngf = __decorate([
    Directive({
        selector: "[ngf]",
        exportAs: "ngf"
    }),
    __metadata("design:paramtypes", [ElementRef])
], ngf);
export { ngf };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ25HLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQUUsT0FBTyxFQUMzQixNQUFNLGFBQWEsQ0FBQTtBQU9wQjs7RUFFRTtBQUtGLElBQWEsR0FBRyxHQUFoQixNQUFhLEdBQUc7SUE0QmQsWUFBbUIsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTFCckMsWUFBTyxHQUE0QyxFQUFFLENBQUE7UUFDckQsa0JBQWEsR0FBUSxDQUFDLENBQUE7UUFLdEIsK0JBQStCO1FBQy9CLCtCQUErQjtRQUN0QixzQkFBaUIsR0FBVyxJQUFJLENBQUE7UUFFaEMscUJBQWdCLEdBQVcsS0FBSyxDQUFBO1FBQ2hDLGVBQVUsR0FBVyxLQUFLLENBQUE7UUFDbkIsa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxpQkFBWSxHQUFxQixFQUFFLENBQUE7UUFDbEMsdUJBQWtCLEdBQTJDLElBQUksWUFBWSxFQUFFLENBQUE7UUFHL0Usc0JBQWlCLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHM0QsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRW5ELFVBQUssR0FBVSxFQUFFLENBQUE7UUFDaEIsZ0JBQVcsR0FBd0IsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUd0RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVE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LEVBQUU7O3VDQUEyQjtBQUNuQjtJQUFmLE1BQU0sQ0FBQyxNQUFNLENBQUM7OEJBQWUsWUFBWTswQ0FBMEI7QUFFM0Q7SUFBUixLQUFLLEVBQUU7O3lDQUFvQztBQUNsQztJQUFULE1BQU0sRUFBRTs4QkFBb0IsWUFBWTsrQ0FBZ0Q7QUFFaEY7SUFBUixLQUFLLEVBQUU7O3dDQUFzQjtBQUNwQjtJQUFULE1BQU0sRUFBRTs4QkFBbUIsWUFBWTs4Q0FBNkI7QUFFNUQ7SUFBUixLQUFLLEVBQUU7OEJBQVMsSUFBSTtpQ0FBQTtBQUNYO0lBQVQsTUFBTSxFQUFFOzhCQUFZLFlBQVk7dUNBQTJCO0FBRW5EO0lBQVIsS0FBSyxFQUFFOztrQ0FBa0I7QUFDaEI7SUFBVCxNQUFNLEVBQUU7OEJBQWEsWUFBWTt3Q0FBc0M7QUE2T3hFO0lBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7bUNBT25CO0FBOVFVLEdBQUc7SUFKZixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUMsS0FBSztLQUNmLENBQUM7cUNBNkIyQixVQUFVO0dBNUIxQixHQUFHLENBZ1VmO1NBaFVZLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUludmlzaWJsZUZpbGVJbnB1dFdyYXAsIGlzRmlsZUlucHV0LCBkZXRlY3RTd2lwZSB9IGZyb20gXCIuL2RvYy1ldmVudC1oZWxwLmZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7XHJcbiAgYWNjZXB0VHlwZSwgSW52YWxpZEZpbGVJdGVtLFxyXG4gIGFwcGx5RXhpZlJvdGF0aW9uLCBkYXRhVXJsXHJcbn0gZnJvbSBcIi4vZmlsZVRvb2xzXCJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZHJhZ01ldGF7XHJcbiAgdHlwZTpzdHJpbmdcclxuICBraW5kOnN0cmluZ1xyXG59XHJcblxyXG4vKiogQSBtYXN0ZXIgYmFzZSBzZXQgb2YgbG9naWMgaW50ZW5kZWQgdG8gc3VwcG9ydCBmaWxlIHNlbGVjdC9kcmFnL2Ryb3Agb3BlcmF0aW9uc1xyXG4gTk9URTogVXNlIG5nZkRyb3AgZm9yIGZ1bGwgZHJhZy9kcm9wLiBVc2UgbmdmU2VsZWN0IGZvciBzZWxlY3RpbmdcclxuKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW25nZl1cIixcclxuICBleHBvcnRBczpcIm5nZlwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ2Yge1xyXG4gIGZpbGVFbG06YW55XHJcbiAgZmlsdGVyczp7bmFtZTpzdHJpbmcsIGZuOihmaWxlOkZpbGUpPT5ib29sZWFufVtdID0gW11cclxuICBsYXN0RmlsZUNvdW50Om51bWJlcj0wXHJcblxyXG4gIEBJbnB1dCgpIG11bHRpcGxlICE6c3RyaW5nXHJcbiAgQElucHV0KCkgYWNjZXB0ICAgITpzdHJpbmdcclxuICBASW5wdXQoKSBtYXhTaXplICAhOm51bWJlclxyXG4gIC8vQElucHV0KCkgZm9yY2VGaWxlbmFtZTpzdHJpbmdcclxuICAvL0BJbnB1dCgpIGZvcmNlUG9zdG5hbWU6c3RyaW5nXHJcbiAgQElucHV0KCkgbmdmRml4T3JpZW50YXRpb246Ym9vbGVhbiA9IHRydWVcclxuXHJcbiAgQElucHV0KCkgZmlsZURyb3BEaXNhYmxlZDpib29sZWFuID0gZmFsc2VcclxuICBASW5wdXQoKSBzZWxlY3RhYmxlOmJvb2xlYW4gPSBmYWxzZVxyXG4gIEBPdXRwdXQoJ2luaXQnKSBkaXJlY3RpdmVJbml0OkV2ZW50RW1pdHRlcjxuZ2Y+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgXHJcbiAgQElucHV0KCkgbGFzdEludmFsaWRzOkludmFsaWRGaWxlSXRlbVtdID0gW11cclxuICBAT3V0cHV0KCkgbGFzdEludmFsaWRzQ2hhbmdlOkV2ZW50RW1pdHRlcjx7ZmlsZTpGaWxlLHR5cGU6c3RyaW5nfVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBsYXN0QmFzZVVybCAhOiBzdHJpbmcvL2Jhc2U2NCBsYXN0IGZpbGUgdXBsb2FkZWQgdXJsXHJcbiAgQE91dHB1dCgpIGxhc3RCYXNlVXJsQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgXHJcbiAgQElucHV0KCkgZmlsZSAhOiBGaWxlLy9sYXN0IGZpbGUgdXBsb2FkZWRcclxuICBAT3V0cHV0KCkgZmlsZUNoYW5nZTpFdmVudEVtaXR0ZXI8RmlsZT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQElucHV0KCkgZmlsZXM6RmlsZVtdID0gW11cclxuICBAT3V0cHV0KCkgZmlsZXNDaGFuZ2U6RXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZil7XHJcbiAgICB0aGlzLmluaXRGaWx0ZXJzKClcclxuICB9XHJcblxyXG4gIGluaXRGaWx0ZXJzKCl7XHJcbiAgICAvLyB0aGUgb3JkZXIgaXMgaW1wb3J0YW50XHJcbiAgICB0aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2FjY2VwdCcsIGZuOiB0aGlzLl9hY2NlcHRGaWx0ZXJ9KVxyXG4gICAgdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdmaWxlU2l6ZScsIGZuOiB0aGlzLl9maWxlU2l6ZUZpbHRlcn0pXHJcblxyXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2ZpbGVUeXBlJywgZm46IHRoaXMuX2ZpbGVUeXBlRmlsdGVyfSlcclxuICAgIC8vdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdxdWV1ZUxpbWl0JywgZm46IHRoaXMuX3F1ZXVlTGltaXRGaWx0ZXJ9KVxyXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ21pbWVUeXBlJywgZm46IHRoaXMuX21pbWVUeXBlRmlsdGVyfSlcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCl7XHJcbiAgICBkZWxldGUgdGhpcy5maWxlRWxtLy9mYXN0ZXIgbWVtb3J5IHJlbGVhc2Ugb2YgZG9tIGVsZW1lbnRcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCl7XHJcbiAgICBpZiggdGhpcy5zZWxlY3RhYmxlICl7XHJcbiAgICAgIHRoaXMuZW5hYmxlU2VsZWN0aW5nKClcclxuICAgIH1cclxuXHJcbiAgICBpZiggdGhpcy5tdWx0aXBsZSApe1xyXG4gICAgICB0aGlzLnBhcmFtRmlsZUVsbSgpLnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCB0aGlzLm11bHRpcGxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHJlZmVyZW5jZSB0byB0aGlzIGNsYXNzIHdpdGggb25lIGN5Y2xlIGRlbGF5IHRvIGF2b2lkIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5kaXJlY3RpdmVJbml0LmVtaXQodGhpcylcclxuICAgIH0sIDApXHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyggY2hhbmdlcyApe1xyXG4gICAgaWYoIGNoYW5nZXMuYWNjZXB0ICl7XHJcbiAgICAgIHRoaXMucGFyYW1GaWxlRWxtKCkuc2V0QXR0cmlidXRlKCdhY2NlcHQnLCBjaGFuZ2VzLmFjY2VwdC5jdXJyZW50VmFsdWUgfHwgJyonKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFyYW1GaWxlRWxtKCl7XHJcbiAgICBpZiggdGhpcy5maWxlRWxtIClyZXR1cm4gdGhpcy5maWxlRWxtLy9hbHJlYWR5IGRlZmluZWRcclxuICAgIFxyXG4gICAgLy9lbG0gaXMgYSBmaWxlIGlucHV0XHJcbiAgICBjb25zdCBpc0ZpbGUgPSBpc0ZpbGVJbnB1dCggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgKVxyXG4gICAgaWYoaXNGaWxlKXJldHVybiB0aGlzLmZpbGVFbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxyXG4gICAgXHJcbiAgICAvL2NyZWF0ZSBmb28gZmlsZSBpbnB1dFxyXG4gICAgY29uc3QgbGFiZWwgPSBjcmVhdGVJbnZpc2libGVGaWxlSW5wdXRXcmFwKClcclxuICAgIHRoaXMuZmlsZUVsbSA9IGxhYmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdXHJcbiAgICB0aGlzLmZpbGVFbG0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VGbi5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCBsYWJlbCApXHJcbiAgICByZXR1cm4gdGhpcy5maWxlRWxtXHJcbiAgfVxyXG5cclxuICBlbmFibGVTZWxlY3RpbmcoKXtcclxuICAgIGxldCBlbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxyXG5cclxuICAgIGlmKCBpc0ZpbGVJbnB1dChlbG0pICl7XHJcbiAgICAgIGNvbnN0IGJpbmRlZEhhbmRsZXIgPSBfZXY9PnRoaXMuYmVmb3JlU2VsZWN0KClcclxuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcclxuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBiaW5kZWRIYW5kbGVyKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiaW5kZWRIYW5kbGVyID0gZXY9PnRoaXMuY2xpY2tIYW5kbGVyKGV2KVxyXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcclxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgYmluZGVkSGFuZGxlcilcclxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGJpbmRlZEhhbmRsZXIpXHJcbiAgfVxyXG5cclxuICBnZXRWYWxpZEZpbGVzKCBmaWxlczpGaWxlW10gKTpGaWxlW117XHJcbiAgICBjb25zdCBydG46RmlsZVtdID0gW11cclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBpZiggdGhpcy5pc0ZpbGVWYWxpZChmaWxlc1t4XSkgKXtcclxuICAgICAgICBydG4ucHVzaCggZmlsZXNbeF0gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcnRuXHJcbiAgfVxyXG5cclxuICBnZXRJbnZhbGlkRmlsZXMoZmlsZXM6RmlsZVtdKTpJbnZhbGlkRmlsZUl0ZW1bXXtcclxuICAgIGNvbnN0IHJ0bjpJbnZhbGlkRmlsZUl0ZW1bXSA9IFtdXHJcbiAgICBmb3IobGV0IHg9ZmlsZXMubGVuZ3RoLTE7IHggPj0gMDsgLS14KXtcclxuICAgICAgbGV0IGZhaWxSZWFzb24gPSB0aGlzLmdldEZpbGVGaWx0ZXJGYWlsTmFtZShmaWxlc1t4XSlcclxuICAgICAgaWYoIGZhaWxSZWFzb24gKXtcclxuICAgICAgICBydG4ucHVzaCh7XHJcbiAgICAgICAgICBmaWxlIDogZmlsZXNbeF0sXHJcbiAgICAgICAgICB0eXBlIDogZmFpbFJlYXNvblxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBydG5cclxuICB9XHJcblxyXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XHJcbiAgICBjb25zdCB2YWxpZHMgPSB0aGlzLmdldFZhbGlkRmlsZXMoZmlsZXMpXHJcblxyXG4gICAgaWYoZmlsZXMubGVuZ3RoIT12YWxpZHMubGVuZ3RoKXtcclxuICAgICAgdGhpcy5sYXN0SW52YWxpZHMgPSB0aGlzLmdldEludmFsaWRGaWxlcyhmaWxlcylcclxuICAgIH1lbHNle1xyXG4gICAgICBkZWxldGUgdGhpcy5sYXN0SW52YWxpZHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5sYXN0SW52YWxpZHNDaGFuZ2UuZW1pdCh0aGlzLmxhc3RJbnZhbGlkcylcclxuXHJcbiAgICBpZiggdmFsaWRzLmxlbmd0aCApe1xyXG4gICAgICBpZiggdGhpcy5uZ2ZGaXhPcmllbnRhdGlvbiApe1xyXG4gICAgICAgIHRoaXMuYXBwbHlFeGlmUm90YXRpb25zKHZhbGlkcylcclxuICAgICAgICAudGhlbiggZml4ZWRGaWxlcz0+dGhpcy5xdWUoZml4ZWRGaWxlcykgKVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLnF1ZSh2YWxpZHMpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0VtcHR5QWZ0ZXJTZWxlY3Rpb24oKSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBxdWUoIGZpbGVzOkZpbGVbXSApe1xyXG4gICAgdGhpcy5maWxlcyA9IHRoaXMuZmlsZXMgfHwgW11cclxuICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuZmlsZXMsIGZpbGVzKVxyXG5cclxuICAgIC8vYmVsb3cgYnJlYWsgbWVtb3J5IHJlZiBhbmQgZG9lc250IGFjdCBsaWtlIGEgcXVlXHJcbiAgICAvL3RoaXMuZmlsZXMgPSBmaWxlcy8vY2F1c2VzIG1lbW9yeSBjaGFuZ2Ugd2hpY2ggdHJpZ2dlcnMgYmluZGluZ3MgbGlrZSA8bmdmRm9ybURhdGEgW2ZpbGVzXT1cImZpbGVzXCI+PC9uZ2ZGb3JtRGF0YT5cclxuICAgIFxyXG4gICAgdGhpcy5maWxlc0NoYW5nZS5lbWl0KCB0aGlzLmZpbGVzIClcclxuXHJcbiAgICBpZihmaWxlcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmZpbGVDaGFuZ2UuZW1pdCggdGhpcy5maWxlPWZpbGVzWzBdIClcclxuXHJcbiAgICAgIGlmKHRoaXMubGFzdEJhc2VVcmxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCl7XHJcbiAgICAgICAgZGF0YVVybCggZmlsZXNbMF0gKVxyXG4gICAgICAgIC50aGVuKCB1cmw9PnRoaXMubGFzdEJhc2VVcmxDaGFuZ2UuZW1pdCh1cmwpIClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vd2lsbCBiZSBjaGVja2VkIGZvciBpbnB1dCB2YWx1ZSBjbGVhcmluZ1xyXG4gICAgdGhpcy5sYXN0RmlsZUNvdW50ID0gdGhpcy5maWxlcy5sZW5ndGhcclxuICB9XHJcblxyXG4gIC8qKiBjYWxsZWQgd2hlbiBpbnB1dCBoYXMgZmlsZXMgKi9cclxuICBjaGFuZ2VGbihldmVudDphbnkpIHtcclxuICAgIHZhciBmaWxlTGlzdCA9IGV2ZW50Ll9fZmlsZXNfIHx8IChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmZpbGVzKVxyXG5cclxuICAgIGlmICghZmlsZUxpc3QpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVMaXN0KVxyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5kbGVyKGV2dDphbnkpe1xyXG4gICAgY29uc3QgZWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcclxuICAgIGlmIChlbG0uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8IHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHIgPSBkZXRlY3RTd2lwZShldnQpO1xyXG4gICAgLy8gcHJldmVudCB0aGUgY2xpY2sgaWYgaXQgaXMgYSBzd2lwZVxyXG4gICAgaWYgKCByIT09ZmFsc2UgKSByZXR1cm4gcjtcclxuXHJcbiAgICBjb25zdCBmaWxlRWxtID0gdGhpcy5wYXJhbUZpbGVFbG0oKVxyXG4gICAgZmlsZUVsbS5jbGljaygpXHJcbiAgICAvL2ZpbGVFbG0uZGlzcGF0Y2hFdmVudCggbmV3IEV2ZW50KCdjbGljaycpICk7XHJcbiAgICB0aGlzLmJlZm9yZVNlbGVjdCgpXHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYmVmb3JlU2VsZWN0KCl7XHJcbiAgICBpZiggdGhpcy5maWxlcyAmJiB0aGlzLmxhc3RGaWxlQ291bnQ9PT10aGlzLmZpbGVzLmxlbmd0aCApcmV0dXJuXHJcblxyXG4gICAgLy9pZiBubyBmaWxlcyBpbiBhcnJheSwgYmUgc3VyZSBicm93c2VyIGRvZXNudCBwcmV2ZW50IHJlc2VsZWN0IG9mIHNhbWUgZmlsZSAoc2VlIGdpdGh1YiBpc3N1ZSAyNylcclxuICAgIHRoaXMuZmlsZUVsbS52YWx1ZSA9IG51bGxcclxuICB9XHJcblxyXG4gIGlzRW1wdHlBZnRlclNlbGVjdGlvbigpOmJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5tdWx0aXBsZTtcclxuICB9XHJcblxyXG4gIGV2ZW50VG9UcmFuc2ZlcihldmVudDphbnkpOmFueSB7XHJcbiAgICBpZihldmVudC5kYXRhVHJhbnNmZXIpcmV0dXJuIGV2ZW50LmRhdGFUcmFuc2ZlclxyXG4gICAgcmV0dXJuICBldmVudC5vcmlnaW5hbEV2ZW50ID8gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgOiBudWxsXHJcbiAgfVxyXG5cclxuICBzdG9wRXZlbnQoZXZlbnQ6YW55KTphbnkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmZXJIYXNGaWxlcyh0cmFuc2ZlcjphbnkpOmFueSB7XHJcbiAgICBpZiAoIXRyYW5zZmVyLnR5cGVzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhbnNmZXIudHlwZXMuaW5kZXhPZikge1xyXG4gICAgICByZXR1cm4gdHJhbnNmZXIudHlwZXMuaW5kZXhPZignRmlsZXMnKSAhPT0gLTE7XHJcbiAgICB9IGVsc2UgaWYgKHRyYW5zZmVyLnR5cGVzLmNvbnRhaW5zKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2Zlci50eXBlcy5jb250YWlucygnRmlsZXMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50VG9GaWxlcyhldmVudDpFdmVudCl7XHJcbiAgICBjb25zdCB0cmFuc2ZlciA9IHRoaXMuZXZlbnRUb1RyYW5zZmVyKGV2ZW50KTtcclxuICAgIGlmKCB0cmFuc2ZlciApe1xyXG4gICAgICBpZih0cmFuc2Zlci5maWxlcyAmJiB0cmFuc2Zlci5maWxlcy5sZW5ndGgpe1xyXG4gICAgICAgIHJldHVybiB0cmFuc2Zlci5maWxlc1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRyYW5zZmVyLml0ZW1zICYmIHRyYW5zZmVyLml0ZW1zLmxlbmd0aCl7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVyLml0ZW1zXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxuXHJcbiAgYXBwbHlFeGlmUm90YXRpb25zKFxyXG4gICAgZmlsZXM6RmlsZVtdXHJcbiAgKTpQcm9taXNlPEZpbGVbXT57XHJcbiAgICBjb25zdCBtYXBwZXIgPSAoXHJcbiAgICAgIGZpbGU6RmlsZSxpbmRleDpudW1iZXJcclxuICAgICk6UHJvbWlzZTxhbnk+PT57XHJcbiAgICAgIHJldHVybiBhcHBseUV4aWZSb3RhdGlvbihmaWxlKVxyXG4gICAgICAudGhlbiggZml4ZWRGaWxlPT5maWxlcy5zcGxpY2UoaW5kZXgsIDEsIGZpeGVkRmlsZSkgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb21zOlByb21pc2U8YW55PltdID0gW11cclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBwcm9tc1t4XSA9IG1hcHBlciggZmlsZXNbeF0sIHggKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKCBwcm9tcyApLnRoZW4oICgpPT5maWxlcyApXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudCddKVxyXG4gIG9uQ2hhbmdlKGV2ZW50OkV2ZW50KTp2b2lkIHtcclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpbGVzIHx8IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXHJcblxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcclxuICB9XHJcblxyXG4gIGdldEZpbGVGaWx0ZXJGYWlsTmFtZShcclxuICAgIGZpbGU6RmlsZVxyXG4gICk6c3RyaW5nIHwgdW5kZWZpbmVke1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKCAhdGhpcy5maWx0ZXJzW2ldLmZuLmNhbGwodGhpcywgZmlsZSkgKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzW2ldLm5hbWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgaXNGaWxlVmFsaWQoZmlsZTpGaWxlKTpib29sZWFue1xyXG4gICAgY29uc3Qgbm9GaWx0ZXJzID0gIXRoaXMuYWNjZXB0ICYmICghdGhpcy5maWx0ZXJzIHx8ICF0aGlzLmZpbHRlcnMubGVuZ3RoKVxyXG4gICAgaWYoIG5vRmlsdGVycyApe1xyXG4gICAgICByZXR1cm4gdHJ1ZS8vd2UgaGF2ZSBubyBmaWx0ZXJzIHNvIGFsbCBmaWxlcyBhcmUgdmFsaWRcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUZpbHRlckZhaWxOYW1lKGZpbGUpID8gZmFsc2UgOiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc0ZpbGVzVmFsaWQoZmlsZXM6RmlsZVtdKXtcclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBpZiggIXRoaXMuaXNGaWxlVmFsaWQoZmlsZXNbeF0pICl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIFxyXG4gIHByb3RlY3RlZCBfYWNjZXB0RmlsdGVyKGl0ZW06RmlsZSk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gYWNjZXB0VHlwZSh0aGlzLmFjY2VwdCwgaXRlbS50eXBlLCBpdGVtLm5hbWUpXHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2ZpbGVTaXplRmlsdGVyKGl0ZW06RmlsZSk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gISh0aGlzLm1heFNpemUgJiYgaXRlbS5zaXplID4gdGhpcy5tYXhTaXplKTtcclxuICB9XHJcblxyXG4gIC8qKiBicm93c2VycyB0cnkgaGFyZCB0byBjb25jZWFsIGRhdGEgYWJvdXQgZmlsZSBkcmFncywgdGhpcyB0ZW5kcyB0byB1bmRvIHRoYXQgKi9cclxuICBmaWxlc1RvV3JpdGVhYmxlT2JqZWN0KCBmaWxlczpGaWxlW10gKTpkcmFnTWV0YVtde1xyXG4gICAgY29uc3QganNvbkZpbGVzOmRyYWdNZXRhW10gPSBbXVxyXG4gICAgZm9yKGxldCB4PTA7IHggPCBmaWxlcy5sZW5ndGg7ICsreCl7XHJcbiAgICAgIGpzb25GaWxlcy5wdXNoKHtcclxuICAgICAgICB0eXBlOmZpbGVzW3hdLnR5cGUsXHJcbiAgICAgICAga2luZDpmaWxlc1t4XVtcImtpbmRcIl1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiBqc29uRmlsZXNcclxuICB9XHJcbn1cclxuIl19