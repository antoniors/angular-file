import { Directive, EventEmitter, ElementRef, Input, Output, HostListener } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions";
import { acceptType, applyExifRotation, dataUrl } from "./fileTools";
import * as i0 from "@angular/core";
/** A master base set of logic intended to support file select/drag/drop operations
 NOTE: Use ngfDrop for full drag/drop. Use ngfSelect for selecting
*/
export class ngf {
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
}
ngf.ɵfac = function ngf_Factory(t) { return new (t || ngf)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ngf.ɵdir = i0.ɵɵdefineDirective({ type: ngf, selectors: [["", "ngf", ""]], hostBindings: function ngf_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("change", function ngf_change_HostBindingHandler($event) { return ctx.onChange($event); });
    } }, inputs: { multiple: "multiple", accept: "accept", maxSize: "maxSize", ngfFixOrientation: "ngfFixOrientation", fileDropDisabled: "fileDropDisabled", selectable: "selectable", lastInvalids: "lastInvalids", lastBaseUrl: "lastBaseUrl", file: "file", files: "files" }, outputs: { directiveInit: "init", lastInvalidsChange: "lastInvalidsChange", lastBaseUrlChange: "lastBaseUrlChange", fileChange: "fileChange", filesChange: "filesChange" }, exportAs: ["ngf"], features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngf, [{
        type: Directive,
        args: [{
                selector: "[ngf]",
                exportAs: "ngf"
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { multiple: [{
            type: Input
        }], accept: [{
            type: Input
        }], maxSize: [{
            type: Input
        }], ngfFixOrientation: [{
            type: Input
        }], fileDropDisabled: [{
            type: Input
        }], selectable: [{
            type: Input
        }], directiveInit: [{
            type: Output,
            args: ['init']
        }], lastInvalids: [{
            type: Input
        }], lastInvalidsChange: [{
            type: Output
        }], lastBaseUrl: [{
            type: Input
        }], lastBaseUrlChange: [{
            type: Output
        }], file: [{
            type: Input
        }], fileChange: [{
            type: Output
        }], files: [{
            type: Input
        }], filesChange: [{
            type: Output
        }], onChange: [{
            type: HostListener,
            args: ['change', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDbkcsT0FBTyxFQUNMLFVBQVUsRUFDVixpQkFBaUIsRUFBRSxPQUFPLEVBQzNCLE1BQU0sYUFBYSxDQUFBOztBQU9wQjs7RUFFRTtBQUtGLE1BQU0sT0FBTyxHQUFHO0lBNEJkLFlBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUExQnJDLFlBQU8sR0FBNEMsRUFBRSxDQUFBO1FBQ3JELGtCQUFhLEdBQVEsQ0FBQyxDQUFBO1FBS3RCLCtCQUErQjtRQUMvQiwrQkFBK0I7UUFDdEIsc0JBQWlCLEdBQVcsSUFBSSxDQUFBO1FBRWhDLHFCQUFnQixHQUFXLEtBQUssQ0FBQTtRQUNoQyxlQUFVLEdBQVcsS0FBSyxDQUFBO1FBQ25CLGtCQUFhLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsaUJBQVksR0FBcUIsRUFBRSxDQUFBO1FBQ2xDLHVCQUFrQixHQUEyQyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBRy9FLHNCQUFpQixHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzNELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxVQUFLLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLGdCQUFXLEdBQXdCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHdEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxXQUFXO1FBQ1Qs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QkFBQyxNQUFNOztrQkFFYixLQUFLOztrQkFDTCxNQUFNOztrQkFFTixLQUFLOztrQkFDTCxNQUFNOztrQkFFTixLQUFLOztrQkFDTCxNQUFNOztrQkFFTixLQUFLOztrQkFDTCxNQUFNOztrQkE0T04sWUFBWTttQkFBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUludmlzaWJsZUZpbGVJbnB1dFdyYXAsIGlzRmlsZUlucHV0LCBkZXRlY3RTd2lwZSB9IGZyb20gXCIuL2RvYy1ldmVudC1oZWxwLmZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7XHJcbiAgYWNjZXB0VHlwZSwgSW52YWxpZEZpbGVJdGVtLFxyXG4gIGFwcGx5RXhpZlJvdGF0aW9uLCBkYXRhVXJsXHJcbn0gZnJvbSBcIi4vZmlsZVRvb2xzXCJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZHJhZ01ldGF7XHJcbiAgdHlwZTpzdHJpbmdcclxuICBraW5kOnN0cmluZ1xyXG59XHJcblxyXG4vKiogQSBtYXN0ZXIgYmFzZSBzZXQgb2YgbG9naWMgaW50ZW5kZWQgdG8gc3VwcG9ydCBmaWxlIHNlbGVjdC9kcmFnL2Ryb3Agb3BlcmF0aW9uc1xyXG4gTk9URTogVXNlIG5nZkRyb3AgZm9yIGZ1bGwgZHJhZy9kcm9wLiBVc2UgbmdmU2VsZWN0IGZvciBzZWxlY3RpbmdcclxuKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW25nZl1cIixcclxuICBleHBvcnRBczpcIm5nZlwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ2Yge1xyXG4gIGZpbGVFbG06YW55XHJcbiAgZmlsdGVyczp7bmFtZTpzdHJpbmcsIGZuOihmaWxlOkZpbGUpPT5ib29sZWFufVtdID0gW11cclxuICBsYXN0RmlsZUNvdW50Om51bWJlcj0wXHJcblxyXG4gIEBJbnB1dCgpIG11bHRpcGxlICE6c3RyaW5nXHJcbiAgQElucHV0KCkgYWNjZXB0ICAgITpzdHJpbmdcclxuICBASW5wdXQoKSBtYXhTaXplICAhOm51bWJlclxyXG4gIC8vQElucHV0KCkgZm9yY2VGaWxlbmFtZTpzdHJpbmdcclxuICAvL0BJbnB1dCgpIGZvcmNlUG9zdG5hbWU6c3RyaW5nXHJcbiAgQElucHV0KCkgbmdmRml4T3JpZW50YXRpb246Ym9vbGVhbiA9IHRydWVcclxuXHJcbiAgQElucHV0KCkgZmlsZURyb3BEaXNhYmxlZDpib29sZWFuID0gZmFsc2VcclxuICBASW5wdXQoKSBzZWxlY3RhYmxlOmJvb2xlYW4gPSBmYWxzZVxyXG4gIEBPdXRwdXQoJ2luaXQnKSBkaXJlY3RpdmVJbml0OkV2ZW50RW1pdHRlcjxuZ2Y+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgXHJcbiAgQElucHV0KCkgbGFzdEludmFsaWRzOkludmFsaWRGaWxlSXRlbVtdID0gW11cclxuICBAT3V0cHV0KCkgbGFzdEludmFsaWRzQ2hhbmdlOkV2ZW50RW1pdHRlcjx7ZmlsZTpGaWxlLHR5cGU6c3RyaW5nfVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBsYXN0QmFzZVVybCAhOiBzdHJpbmcvL2Jhc2U2NCBsYXN0IGZpbGUgdXBsb2FkZWQgdXJsXHJcbiAgQE91dHB1dCgpIGxhc3RCYXNlVXJsQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgXHJcbiAgQElucHV0KCkgZmlsZSAhOiBGaWxlLy9sYXN0IGZpbGUgdXBsb2FkZWRcclxuICBAT3V0cHV0KCkgZmlsZUNoYW5nZTpFdmVudEVtaXR0ZXI8RmlsZT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQElucHV0KCkgZmlsZXM6RmlsZVtdID0gW11cclxuICBAT3V0cHV0KCkgZmlsZXNDaGFuZ2U6RXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZil7XHJcbiAgICB0aGlzLmluaXRGaWx0ZXJzKClcclxuICB9XHJcblxyXG4gIGluaXRGaWx0ZXJzKCl7XHJcbiAgICAvLyB0aGUgb3JkZXIgaXMgaW1wb3J0YW50XHJcbiAgICB0aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2FjY2VwdCcsIGZuOiB0aGlzLl9hY2NlcHRGaWx0ZXJ9KVxyXG4gICAgdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdmaWxlU2l6ZScsIGZuOiB0aGlzLl9maWxlU2l6ZUZpbHRlcn0pXHJcblxyXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2ZpbGVUeXBlJywgZm46IHRoaXMuX2ZpbGVUeXBlRmlsdGVyfSlcclxuICAgIC8vdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdxdWV1ZUxpbWl0JywgZm46IHRoaXMuX3F1ZXVlTGltaXRGaWx0ZXJ9KVxyXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ21pbWVUeXBlJywgZm46IHRoaXMuX21pbWVUeXBlRmlsdGVyfSlcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCl7XHJcbiAgICBkZWxldGUgdGhpcy5maWxlRWxtLy9mYXN0ZXIgbWVtb3J5IHJlbGVhc2Ugb2YgZG9tIGVsZW1lbnRcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCl7XHJcbiAgICBpZiggdGhpcy5zZWxlY3RhYmxlICl7XHJcbiAgICAgIHRoaXMuZW5hYmxlU2VsZWN0aW5nKClcclxuICAgIH1cclxuXHJcbiAgICBpZiggdGhpcy5tdWx0aXBsZSApe1xyXG4gICAgICB0aGlzLnBhcmFtRmlsZUVsbSgpLnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCB0aGlzLm11bHRpcGxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHJlZmVyZW5jZSB0byB0aGlzIGNsYXNzIHdpdGggb25lIGN5Y2xlIGRlbGF5IHRvIGF2b2lkIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5kaXJlY3RpdmVJbml0LmVtaXQodGhpcylcclxuICAgIH0sIDApXHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyggY2hhbmdlcyApe1xyXG4gICAgaWYoIGNoYW5nZXMuYWNjZXB0ICl7XHJcbiAgICAgIHRoaXMucGFyYW1GaWxlRWxtKCkuc2V0QXR0cmlidXRlKCdhY2NlcHQnLCBjaGFuZ2VzLmFjY2VwdC5jdXJyZW50VmFsdWUgfHwgJyonKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFyYW1GaWxlRWxtKCl7XHJcbiAgICBpZiggdGhpcy5maWxlRWxtIClyZXR1cm4gdGhpcy5maWxlRWxtLy9hbHJlYWR5IGRlZmluZWRcclxuICAgIFxyXG4gICAgLy9lbG0gaXMgYSBmaWxlIGlucHV0XHJcbiAgICBjb25zdCBpc0ZpbGUgPSBpc0ZpbGVJbnB1dCggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgKVxyXG4gICAgaWYoaXNGaWxlKXJldHVybiB0aGlzLmZpbGVFbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxyXG4gICAgXHJcbiAgICAvL2NyZWF0ZSBmb28gZmlsZSBpbnB1dFxyXG4gICAgY29uc3QgbGFiZWwgPSBjcmVhdGVJbnZpc2libGVGaWxlSW5wdXRXcmFwKClcclxuICAgIHRoaXMuZmlsZUVsbSA9IGxhYmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdXHJcbiAgICB0aGlzLmZpbGVFbG0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VGbi5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCBsYWJlbCApXHJcbiAgICByZXR1cm4gdGhpcy5maWxlRWxtXHJcbiAgfVxyXG5cclxuICBlbmFibGVTZWxlY3RpbmcoKXtcclxuICAgIGxldCBlbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxyXG5cclxuICAgIGlmKCBpc0ZpbGVJbnB1dChlbG0pICl7XHJcbiAgICAgIGNvbnN0IGJpbmRlZEhhbmRsZXIgPSBfZXY9PnRoaXMuYmVmb3JlU2VsZWN0KClcclxuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcclxuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBiaW5kZWRIYW5kbGVyKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiaW5kZWRIYW5kbGVyID0gZXY9PnRoaXMuY2xpY2tIYW5kbGVyKGV2KVxyXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcclxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgYmluZGVkSGFuZGxlcilcclxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGJpbmRlZEhhbmRsZXIpXHJcbiAgfVxyXG5cclxuICBnZXRWYWxpZEZpbGVzKCBmaWxlczpGaWxlW10gKTpGaWxlW117XHJcbiAgICBjb25zdCBydG46RmlsZVtdID0gW11cclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBpZiggdGhpcy5pc0ZpbGVWYWxpZChmaWxlc1t4XSkgKXtcclxuICAgICAgICBydG4ucHVzaCggZmlsZXNbeF0gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcnRuXHJcbiAgfVxyXG5cclxuICBnZXRJbnZhbGlkRmlsZXMoZmlsZXM6RmlsZVtdKTpJbnZhbGlkRmlsZUl0ZW1bXXtcclxuICAgIGNvbnN0IHJ0bjpJbnZhbGlkRmlsZUl0ZW1bXSA9IFtdXHJcbiAgICBmb3IobGV0IHg9ZmlsZXMubGVuZ3RoLTE7IHggPj0gMDsgLS14KXtcclxuICAgICAgbGV0IGZhaWxSZWFzb24gPSB0aGlzLmdldEZpbGVGaWx0ZXJGYWlsTmFtZShmaWxlc1t4XSlcclxuICAgICAgaWYoIGZhaWxSZWFzb24gKXtcclxuICAgICAgICBydG4ucHVzaCh7XHJcbiAgICAgICAgICBmaWxlIDogZmlsZXNbeF0sXHJcbiAgICAgICAgICB0eXBlIDogZmFpbFJlYXNvblxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBydG5cclxuICB9XHJcblxyXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XHJcbiAgICBjb25zdCB2YWxpZHMgPSB0aGlzLmdldFZhbGlkRmlsZXMoZmlsZXMpXHJcblxyXG4gICAgaWYoZmlsZXMubGVuZ3RoIT12YWxpZHMubGVuZ3RoKXtcclxuICAgICAgdGhpcy5sYXN0SW52YWxpZHMgPSB0aGlzLmdldEludmFsaWRGaWxlcyhmaWxlcylcclxuICAgIH1lbHNle1xyXG4gICAgICBkZWxldGUgdGhpcy5sYXN0SW52YWxpZHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5sYXN0SW52YWxpZHNDaGFuZ2UuZW1pdCh0aGlzLmxhc3RJbnZhbGlkcylcclxuXHJcbiAgICBpZiggdmFsaWRzLmxlbmd0aCApe1xyXG4gICAgICBpZiggdGhpcy5uZ2ZGaXhPcmllbnRhdGlvbiApe1xyXG4gICAgICAgIHRoaXMuYXBwbHlFeGlmUm90YXRpb25zKHZhbGlkcylcclxuICAgICAgICAudGhlbiggZml4ZWRGaWxlcz0+dGhpcy5xdWUoZml4ZWRGaWxlcykgKVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLnF1ZSh2YWxpZHMpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0VtcHR5QWZ0ZXJTZWxlY3Rpb24oKSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBxdWUoIGZpbGVzOkZpbGVbXSApe1xyXG4gICAgdGhpcy5maWxlcyA9IHRoaXMuZmlsZXMgfHwgW11cclxuICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuZmlsZXMsIGZpbGVzKVxyXG5cclxuICAgIC8vYmVsb3cgYnJlYWsgbWVtb3J5IHJlZiBhbmQgZG9lc250IGFjdCBsaWtlIGEgcXVlXHJcbiAgICAvL3RoaXMuZmlsZXMgPSBmaWxlcy8vY2F1c2VzIG1lbW9yeSBjaGFuZ2Ugd2hpY2ggdHJpZ2dlcnMgYmluZGluZ3MgbGlrZSA8bmdmRm9ybURhdGEgW2ZpbGVzXT1cImZpbGVzXCI+PC9uZ2ZGb3JtRGF0YT5cclxuICAgIFxyXG4gICAgdGhpcy5maWxlc0NoYW5nZS5lbWl0KCB0aGlzLmZpbGVzIClcclxuXHJcbiAgICBpZihmaWxlcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmZpbGVDaGFuZ2UuZW1pdCggdGhpcy5maWxlPWZpbGVzWzBdIClcclxuXHJcbiAgICAgIGlmKHRoaXMubGFzdEJhc2VVcmxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCl7XHJcbiAgICAgICAgZGF0YVVybCggZmlsZXNbMF0gKVxyXG4gICAgICAgIC50aGVuKCB1cmw9PnRoaXMubGFzdEJhc2VVcmxDaGFuZ2UuZW1pdCh1cmwpIClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vd2lsbCBiZSBjaGVja2VkIGZvciBpbnB1dCB2YWx1ZSBjbGVhcmluZ1xyXG4gICAgdGhpcy5sYXN0RmlsZUNvdW50ID0gdGhpcy5maWxlcy5sZW5ndGhcclxuICB9XHJcblxyXG4gIC8qKiBjYWxsZWQgd2hlbiBpbnB1dCBoYXMgZmlsZXMgKi9cclxuICBjaGFuZ2VGbihldmVudDphbnkpIHtcclxuICAgIHZhciBmaWxlTGlzdCA9IGV2ZW50Ll9fZmlsZXNfIHx8IChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmZpbGVzKVxyXG5cclxuICAgIGlmICghZmlsZUxpc3QpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVMaXN0KVxyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5kbGVyKGV2dDphbnkpe1xyXG4gICAgY29uc3QgZWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcclxuICAgIGlmIChlbG0uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8IHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHIgPSBkZXRlY3RTd2lwZShldnQpO1xyXG4gICAgLy8gcHJldmVudCB0aGUgY2xpY2sgaWYgaXQgaXMgYSBzd2lwZVxyXG4gICAgaWYgKCByIT09ZmFsc2UgKSByZXR1cm4gcjtcclxuXHJcbiAgICBjb25zdCBmaWxlRWxtID0gdGhpcy5wYXJhbUZpbGVFbG0oKVxyXG4gICAgZmlsZUVsbS5jbGljaygpXHJcbiAgICAvL2ZpbGVFbG0uZGlzcGF0Y2hFdmVudCggbmV3IEV2ZW50KCdjbGljaycpICk7XHJcbiAgICB0aGlzLmJlZm9yZVNlbGVjdCgpXHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYmVmb3JlU2VsZWN0KCl7XHJcbiAgICBpZiggdGhpcy5maWxlcyAmJiB0aGlzLmxhc3RGaWxlQ291bnQ9PT10aGlzLmZpbGVzLmxlbmd0aCApcmV0dXJuXHJcblxyXG4gICAgLy9pZiBubyBmaWxlcyBpbiBhcnJheSwgYmUgc3VyZSBicm93c2VyIGRvZXNudCBwcmV2ZW50IHJlc2VsZWN0IG9mIHNhbWUgZmlsZSAoc2VlIGdpdGh1YiBpc3N1ZSAyNylcclxuICAgIHRoaXMuZmlsZUVsbS52YWx1ZSA9IG51bGxcclxuICB9XHJcblxyXG4gIGlzRW1wdHlBZnRlclNlbGVjdGlvbigpOmJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5tdWx0aXBsZTtcclxuICB9XHJcblxyXG4gIGV2ZW50VG9UcmFuc2ZlcihldmVudDphbnkpOmFueSB7XHJcbiAgICBpZihldmVudC5kYXRhVHJhbnNmZXIpcmV0dXJuIGV2ZW50LmRhdGFUcmFuc2ZlclxyXG4gICAgcmV0dXJuICBldmVudC5vcmlnaW5hbEV2ZW50ID8gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgOiBudWxsXHJcbiAgfVxyXG5cclxuICBzdG9wRXZlbnQoZXZlbnQ6YW55KTphbnkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmZXJIYXNGaWxlcyh0cmFuc2ZlcjphbnkpOmFueSB7XHJcbiAgICBpZiAoIXRyYW5zZmVyLnR5cGVzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhbnNmZXIudHlwZXMuaW5kZXhPZikge1xyXG4gICAgICByZXR1cm4gdHJhbnNmZXIudHlwZXMuaW5kZXhPZignRmlsZXMnKSAhPT0gLTE7XHJcbiAgICB9IGVsc2UgaWYgKHRyYW5zZmVyLnR5cGVzLmNvbnRhaW5zKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2Zlci50eXBlcy5jb250YWlucygnRmlsZXMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50VG9GaWxlcyhldmVudDpFdmVudCl7XHJcbiAgICBjb25zdCB0cmFuc2ZlciA9IHRoaXMuZXZlbnRUb1RyYW5zZmVyKGV2ZW50KTtcclxuICAgIGlmKCB0cmFuc2ZlciApe1xyXG4gICAgICBpZih0cmFuc2Zlci5maWxlcyAmJiB0cmFuc2Zlci5maWxlcy5sZW5ndGgpe1xyXG4gICAgICAgIHJldHVybiB0cmFuc2Zlci5maWxlc1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRyYW5zZmVyLml0ZW1zICYmIHRyYW5zZmVyLml0ZW1zLmxlbmd0aCl7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVyLml0ZW1zXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxuXHJcbiAgYXBwbHlFeGlmUm90YXRpb25zKFxyXG4gICAgZmlsZXM6RmlsZVtdXHJcbiAgKTpQcm9taXNlPEZpbGVbXT57XHJcbiAgICBjb25zdCBtYXBwZXIgPSAoXHJcbiAgICAgIGZpbGU6RmlsZSxpbmRleDpudW1iZXJcclxuICAgICk6UHJvbWlzZTxhbnk+PT57XHJcbiAgICAgIHJldHVybiBhcHBseUV4aWZSb3RhdGlvbihmaWxlKVxyXG4gICAgICAudGhlbiggZml4ZWRGaWxlPT5maWxlcy5zcGxpY2UoaW5kZXgsIDEsIGZpeGVkRmlsZSkgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb21zOlByb21pc2U8YW55PltdID0gW11cclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBwcm9tc1t4XSA9IG1hcHBlciggZmlsZXNbeF0sIHggKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKCBwcm9tcyApLnRoZW4oICgpPT5maWxlcyApXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudCddKVxyXG4gIG9uQ2hhbmdlKGV2ZW50OkV2ZW50KTp2b2lkIHtcclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpbGVzIHx8IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXHJcblxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcclxuICB9XHJcblxyXG4gIGdldEZpbGVGaWx0ZXJGYWlsTmFtZShcclxuICAgIGZpbGU6RmlsZVxyXG4gICk6c3RyaW5nIHwgdW5kZWZpbmVke1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKCAhdGhpcy5maWx0ZXJzW2ldLmZuLmNhbGwodGhpcywgZmlsZSkgKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzW2ldLm5hbWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgaXNGaWxlVmFsaWQoZmlsZTpGaWxlKTpib29sZWFue1xyXG4gICAgY29uc3Qgbm9GaWx0ZXJzID0gIXRoaXMuYWNjZXB0ICYmICghdGhpcy5maWx0ZXJzIHx8ICF0aGlzLmZpbHRlcnMubGVuZ3RoKVxyXG4gICAgaWYoIG5vRmlsdGVycyApe1xyXG4gICAgICByZXR1cm4gdHJ1ZS8vd2UgaGF2ZSBubyBmaWx0ZXJzIHNvIGFsbCBmaWxlcyBhcmUgdmFsaWRcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUZpbHRlckZhaWxOYW1lKGZpbGUpID8gZmFsc2UgOiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc0ZpbGVzVmFsaWQoZmlsZXM6RmlsZVtdKXtcclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBpZiggIXRoaXMuaXNGaWxlVmFsaWQoZmlsZXNbeF0pICl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIFxyXG4gIHByb3RlY3RlZCBfYWNjZXB0RmlsdGVyKGl0ZW06RmlsZSk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gYWNjZXB0VHlwZSh0aGlzLmFjY2VwdCwgaXRlbS50eXBlLCBpdGVtLm5hbWUpXHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2ZpbGVTaXplRmlsdGVyKGl0ZW06RmlsZSk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gISh0aGlzLm1heFNpemUgJiYgaXRlbS5zaXplID4gdGhpcy5tYXhTaXplKTtcclxuICB9XHJcblxyXG4gIC8qKiBicm93c2VycyB0cnkgaGFyZCB0byBjb25jZWFsIGRhdGEgYWJvdXQgZmlsZSBkcmFncywgdGhpcyB0ZW5kcyB0byB1bmRvIHRoYXQgKi9cclxuICBmaWxlc1RvV3JpdGVhYmxlT2JqZWN0KCBmaWxlczpGaWxlW10gKTpkcmFnTWV0YVtde1xyXG4gICAgY29uc3QganNvbkZpbGVzOmRyYWdNZXRhW10gPSBbXVxyXG4gICAgZm9yKGxldCB4PTA7IHggPCBmaWxlcy5sZW5ndGg7ICsreCl7XHJcbiAgICAgIGpzb25GaWxlcy5wdXNoKHtcclxuICAgICAgICB0eXBlOmZpbGVzW3hdLnR5cGUsXHJcbiAgICAgICAga2luZDpmaWxlc1t4XVtcImtpbmRcIl1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiBqc29uRmlsZXNcclxuICB9XHJcbn1cclxuIl19