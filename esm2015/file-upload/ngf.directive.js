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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ25HLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQUUsT0FBTyxFQUMzQixNQUFNLGFBQWEsQ0FBQTtBQU9wQjs7RUFFRTtBQUtGLElBQWEsR0FBRyxHQUFoQixNQUFhLEdBQUc7SUE0QmQsWUFBbUIsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTFCckMsWUFBTyxHQUE0QyxFQUFFLENBQUE7UUFDckQsa0JBQWEsR0FBUSxDQUFDLENBQUE7UUFLdEIsK0JBQStCO1FBQy9CLCtCQUErQjtRQUN0QixzQkFBaUIsR0FBVyxJQUFJLENBQUE7UUFFaEMscUJBQWdCLEdBQVcsS0FBSyxDQUFBO1FBQ2hDLGVBQVUsR0FBVyxLQUFLLENBQUE7UUFDbkIsa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUUzRCxpQkFBWSxHQUFxQixFQUFFLENBQUE7UUFDbEMsdUJBQWtCLEdBQTJDLElBQUksWUFBWSxFQUFFLENBQUE7UUFHL0Usc0JBQWlCLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUE7UUFHM0QsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRW5ELFVBQUssR0FBVSxFQUFFLENBQUE7UUFDaEIsZ0JBQVcsR0FBd0IsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUd0RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVE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LEVBQUU7O3VDQUEyQjtBQUNuQjtJQUFmLE1BQU0sQ0FBQyxNQUFNLENBQUM7OEJBQWUsWUFBWTswQ0FBMEI7QUFFM0Q7SUFBUixLQUFLLEVBQUU7O3lDQUFvQztBQUNsQztJQUFULE1BQU0sRUFBRTs4QkFBb0IsWUFBWTsrQ0FBZ0Q7QUFFaEY7SUFBUixLQUFLLEVBQUU7O3dDQUFzQjtBQUNwQjtJQUFULE1BQU0sRUFBRTs4QkFBbUIsWUFBWTs4Q0FBNkI7QUFFNUQ7SUFBUixLQUFLLEVBQUU7OEJBQVMsSUFBSTtpQ0FBQTtBQUNYO0lBQVQsTUFBTSxFQUFFOzhCQUFZLFlBQVk7dUNBQTJCO0FBRW5EO0lBQVIsS0FBSyxFQUFFOztrQ0FBa0I7QUFDaEI7SUFBVCxNQUFNLEVBQUU7OEJBQWEsWUFBWTt3Q0FBc0M7QUE2T3hFO0lBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsS0FBSzs7bUNBT25CO0FBOVFVLEdBQUc7SUFKZixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUMsS0FBSztLQUNmLENBQUM7cUNBNkIyQixVQUFVO0dBNUIxQixHQUFHLENBZ1VmO1NBaFVZLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjcmVhdGVJbnZpc2libGVGaWxlSW5wdXRXcmFwLCBpc0ZpbGVJbnB1dCwgZGV0ZWN0U3dpcGUgfSBmcm9tIFwiLi9kb2MtZXZlbnQtaGVscC5mdW5jdGlvbnNcIlxuaW1wb3J0IHtcbiAgYWNjZXB0VHlwZSwgSW52YWxpZEZpbGVJdGVtLFxuICBhcHBseUV4aWZSb3RhdGlvbiwgZGF0YVVybFxufSBmcm9tIFwiLi9maWxlVG9vbHNcIlxuXG5leHBvcnQgaW50ZXJmYWNlIGRyYWdNZXRhe1xuICB0eXBlOnN0cmluZ1xuICBraW5kOnN0cmluZ1xufVxuXG4vKiogQSBtYXN0ZXIgYmFzZSBzZXQgb2YgbG9naWMgaW50ZW5kZWQgdG8gc3VwcG9ydCBmaWxlIHNlbGVjdC9kcmFnL2Ryb3Agb3BlcmF0aW9uc1xuIE5PVEU6IFVzZSBuZ2ZEcm9wIGZvciBmdWxsIGRyYWcvZHJvcC4gVXNlIG5nZlNlbGVjdCBmb3Igc2VsZWN0aW5nXG4qL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltuZ2ZdXCIsXG4gIGV4cG9ydEFzOlwibmdmXCJcbn0pXG5leHBvcnQgY2xhc3MgbmdmIHtcbiAgZmlsZUVsbTphbnlcbiAgZmlsdGVyczp7bmFtZTpzdHJpbmcsIGZuOihmaWxlOkZpbGUpPT5ib29sZWFufVtdID0gW11cbiAgbGFzdEZpbGVDb3VudDpudW1iZXI9MFxuXG4gIEBJbnB1dCgpIG11bHRpcGxlICE6c3RyaW5nXG4gIEBJbnB1dCgpIGFjY2VwdCAgICE6c3RyaW5nXG4gIEBJbnB1dCgpIG1heFNpemUgICE6bnVtYmVyXG4gIC8vQElucHV0KCkgZm9yY2VGaWxlbmFtZTpzdHJpbmdcbiAgLy9ASW5wdXQoKSBmb3JjZVBvc3RuYW1lOnN0cmluZ1xuICBASW5wdXQoKSBuZ2ZGaXhPcmllbnRhdGlvbjpib29sZWFuID0gdHJ1ZVxuXG4gIEBJbnB1dCgpIGZpbGVEcm9wRGlzYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlXG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6Ym9vbGVhbiA9IGZhbHNlXG4gIEBPdXRwdXQoJ2luaXQnKSBkaXJlY3RpdmVJbml0OkV2ZW50RW1pdHRlcjxuZ2Y+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIFxuICBASW5wdXQoKSBsYXN0SW52YWxpZHM6SW52YWxpZEZpbGVJdGVtW10gPSBbXVxuICBAT3V0cHV0KCkgbGFzdEludmFsaWRzQ2hhbmdlOkV2ZW50RW1pdHRlcjx7ZmlsZTpGaWxlLHR5cGU6c3RyaW5nfVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGxhc3RCYXNlVXJsICE6IHN0cmluZy8vYmFzZTY0IGxhc3QgZmlsZSB1cGxvYWRlZCB1cmxcbiAgQE91dHB1dCgpIGxhc3RCYXNlVXJsQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIFxuICBASW5wdXQoKSBmaWxlICE6IEZpbGUvL2xhc3QgZmlsZSB1cGxvYWRlZFxuICBAT3V0cHV0KCkgZmlsZUNoYW5nZTpFdmVudEVtaXR0ZXI8RmlsZT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBASW5wdXQoKSBmaWxlczpGaWxlW10gPSBbXVxuICBAT3V0cHV0KCkgZmlsZXNDaGFuZ2U6RXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmKXtcbiAgICB0aGlzLmluaXRGaWx0ZXJzKClcbiAgfVxuXG4gIGluaXRGaWx0ZXJzKCl7XG4gICAgLy8gdGhlIG9yZGVyIGlzIGltcG9ydGFudFxuICAgIHRoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiAnYWNjZXB0JywgZm46IHRoaXMuX2FjY2VwdEZpbHRlcn0pXG4gICAgdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdmaWxlU2l6ZScsIGZuOiB0aGlzLl9maWxlU2l6ZUZpbHRlcn0pXG5cbiAgICAvL3RoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiAnZmlsZVR5cGUnLCBmbjogdGhpcy5fZmlsZVR5cGVGaWx0ZXJ9KVxuICAgIC8vdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdxdWV1ZUxpbWl0JywgZm46IHRoaXMuX3F1ZXVlTGltaXRGaWx0ZXJ9KVxuICAgIC8vdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdtaW1lVHlwZScsIGZuOiB0aGlzLl9taW1lVHlwZUZpbHRlcn0pXG4gIH1cblxuICBuZ09uRGVzdHJveSgpe1xuICAgIGRlbGV0ZSB0aGlzLmZpbGVFbG0vL2Zhc3RlciBtZW1vcnkgcmVsZWFzZSBvZiBkb20gZWxlbWVudFxuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICBpZiggdGhpcy5zZWxlY3RhYmxlICl7XG4gICAgICB0aGlzLmVuYWJsZVNlbGVjdGluZygpXG4gICAgfVxuXG4gICAgaWYoIHRoaXMubXVsdGlwbGUgKXtcbiAgICAgIHRoaXMucGFyYW1GaWxlRWxtKCkuc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsIHRoaXMubXVsdGlwbGUpXG4gICAgfVxuXG4gICAgLy9jcmVhdGUgcmVmZXJlbmNlIHRvIHRoaXMgY2xhc3Mgd2l0aCBvbmUgY3ljbGUgZGVsYXkgdG8gYXZvaWQgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvclxuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuZGlyZWN0aXZlSW5pdC5lbWl0KHRoaXMpXG4gICAgfSwgMClcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzICl7XG4gICAgaWYoIGNoYW5nZXMuYWNjZXB0ICl7XG4gICAgICB0aGlzLnBhcmFtRmlsZUVsbSgpLnNldEF0dHJpYnV0ZSgnYWNjZXB0JywgY2hhbmdlcy5hY2NlcHQuY3VycmVudFZhbHVlIHx8ICcqJylcbiAgICB9XG4gIH1cblxuICBwYXJhbUZpbGVFbG0oKXtcbiAgICBpZiggdGhpcy5maWxlRWxtIClyZXR1cm4gdGhpcy5maWxlRWxtLy9hbHJlYWR5IGRlZmluZWRcbiAgICBcbiAgICAvL2VsbSBpcyBhIGZpbGUgaW5wdXRcbiAgICBjb25zdCBpc0ZpbGUgPSBpc0ZpbGVJbnB1dCggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgKVxuICAgIGlmKGlzRmlsZSlyZXR1cm4gdGhpcy5maWxlRWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICBcbiAgICAvL2NyZWF0ZSBmb28gZmlsZSBpbnB1dFxuICAgIGNvbnN0IGxhYmVsID0gY3JlYXRlSW52aXNpYmxlRmlsZUlucHV0V3JhcCgpXG4gICAgdGhpcy5maWxlRWxtID0gbGFiZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF1cbiAgICB0aGlzLmZpbGVFbG0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VGbi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCggbGFiZWwgKVxuICAgIHJldHVybiB0aGlzLmZpbGVFbG1cbiAgfVxuXG4gIGVuYWJsZVNlbGVjdGluZygpe1xuICAgIGxldCBlbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxuXG4gICAgaWYoIGlzRmlsZUlucHV0KGVsbSkgKXtcbiAgICAgIGNvbnN0IGJpbmRlZEhhbmRsZXIgPSBfZXY9PnRoaXMuYmVmb3JlU2VsZWN0KClcbiAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRlZEhhbmRsZXIpXG4gICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGJpbmRlZEhhbmRsZXIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBiaW5kZWRIYW5kbGVyID0gZXY9PnRoaXMuY2xpY2tIYW5kbGVyKGV2KVxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRlZEhhbmRsZXIpXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBiaW5kZWRIYW5kbGVyKVxuICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGJpbmRlZEhhbmRsZXIpXG4gIH1cblxuICBnZXRWYWxpZEZpbGVzKCBmaWxlczpGaWxlW10gKTpGaWxlW117XG4gICAgY29uc3QgcnRuOkZpbGVbXSA9IFtdXG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XG4gICAgICBpZiggdGhpcy5pc0ZpbGVWYWxpZChmaWxlc1t4XSkgKXtcbiAgICAgICAgcnRuLnB1c2goIGZpbGVzW3hdIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ0blxuICB9XG5cbiAgZ2V0SW52YWxpZEZpbGVzKGZpbGVzOkZpbGVbXSk6SW52YWxpZEZpbGVJdGVtW117XG4gICAgY29uc3QgcnRuOkludmFsaWRGaWxlSXRlbVtdID0gW11cbiAgICBmb3IobGV0IHg9ZmlsZXMubGVuZ3RoLTE7IHggPj0gMDsgLS14KXtcbiAgICAgIGxldCBmYWlsUmVhc29uID0gdGhpcy5nZXRGaWxlRmlsdGVyRmFpbE5hbWUoZmlsZXNbeF0pXG4gICAgICBpZiggZmFpbFJlYXNvbiApe1xuICAgICAgICBydG4ucHVzaCh7XG4gICAgICAgICAgZmlsZSA6IGZpbGVzW3hdLFxuICAgICAgICAgIHR5cGUgOiBmYWlsUmVhc29uXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydG5cbiAgfVxuXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XG4gICAgY29uc3QgdmFsaWRzID0gdGhpcy5nZXRWYWxpZEZpbGVzKGZpbGVzKVxuXG4gICAgaWYoZmlsZXMubGVuZ3RoIT12YWxpZHMubGVuZ3RoKXtcbiAgICAgIHRoaXMubGFzdEludmFsaWRzID0gdGhpcy5nZXRJbnZhbGlkRmlsZXMoZmlsZXMpXG4gICAgfWVsc2V7XG4gICAgICBkZWxldGUgdGhpcy5sYXN0SW52YWxpZHNcbiAgICB9XG4gICAgXG4gICAgdGhpcy5sYXN0SW52YWxpZHNDaGFuZ2UuZW1pdCh0aGlzLmxhc3RJbnZhbGlkcylcblxuICAgIGlmKCB2YWxpZHMubGVuZ3RoICl7XG4gICAgICBpZiggdGhpcy5uZ2ZGaXhPcmllbnRhdGlvbiApe1xuICAgICAgICB0aGlzLmFwcGx5RXhpZlJvdGF0aW9ucyh2YWxpZHMpXG4gICAgICAgIC50aGVuKCBmaXhlZEZpbGVzPT50aGlzLnF1ZShmaXhlZEZpbGVzKSApXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5xdWUodmFsaWRzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRW1wdHlBZnRlclNlbGVjdGlvbigpKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnXG4gICAgfVxuICB9XG5cbiAgcXVlKCBmaWxlczpGaWxlW10gKXtcbiAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcyB8fCBbXVxuICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuZmlsZXMsIGZpbGVzKVxuXG4gICAgLy9iZWxvdyBicmVhayBtZW1vcnkgcmVmIGFuZCBkb2VzbnQgYWN0IGxpa2UgYSBxdWVcbiAgICAvL3RoaXMuZmlsZXMgPSBmaWxlcy8vY2F1c2VzIG1lbW9yeSBjaGFuZ2Ugd2hpY2ggdHJpZ2dlcnMgYmluZGluZ3MgbGlrZSA8bmdmRm9ybURhdGEgW2ZpbGVzXT1cImZpbGVzXCI+PC9uZ2ZGb3JtRGF0YT5cbiAgICBcbiAgICB0aGlzLmZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZmlsZXMgKVxuXG4gICAgaWYoZmlsZXMubGVuZ3RoKXtcbiAgICAgIHRoaXMuZmlsZUNoYW5nZS5lbWl0KCB0aGlzLmZpbGU9ZmlsZXNbMF0gKVxuXG4gICAgICBpZih0aGlzLmxhc3RCYXNlVXJsQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpe1xuICAgICAgICBkYXRhVXJsKCBmaWxlc1swXSApXG4gICAgICAgIC50aGVuKCB1cmw9PnRoaXMubGFzdEJhc2VVcmxDaGFuZ2UuZW1pdCh1cmwpIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3dpbGwgYmUgY2hlY2tlZCBmb3IgaW5wdXQgdmFsdWUgY2xlYXJpbmdcbiAgICB0aGlzLmxhc3RGaWxlQ291bnQgPSB0aGlzLmZpbGVzLmxlbmd0aFxuICB9XG5cbiAgLyoqIGNhbGxlZCB3aGVuIGlucHV0IGhhcyBmaWxlcyAqL1xuICBjaGFuZ2VGbihldmVudDphbnkpIHtcbiAgICB2YXIgZmlsZUxpc3QgPSBldmVudC5fX2ZpbGVzXyB8fCAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5maWxlcylcblxuICAgIGlmICghZmlsZUxpc3QpIHJldHVybjtcblxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVMaXN0KVxuICB9XG5cbiAgY2xpY2tIYW5kbGVyKGV2dDphbnkpe1xuICAgIGNvbnN0IGVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgaWYgKGVsbS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHwgdGhpcy5maWxlRHJvcERpc2FibGVkKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHIgPSBkZXRlY3RTd2lwZShldnQpO1xuICAgIC8vIHByZXZlbnQgdGhlIGNsaWNrIGlmIGl0IGlzIGEgc3dpcGVcbiAgICBpZiAoIHIhPT1mYWxzZSApIHJldHVybiByO1xuXG4gICAgY29uc3QgZmlsZUVsbSA9IHRoaXMucGFyYW1GaWxlRWxtKClcbiAgICBmaWxlRWxtLmNsaWNrKClcbiAgICAvL2ZpbGVFbG0uZGlzcGF0Y2hFdmVudCggbmV3IEV2ZW50KCdjbGljaycpICk7XG4gICAgdGhpcy5iZWZvcmVTZWxlY3QoKVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYmVmb3JlU2VsZWN0KCl7XG4gICAgaWYoIHRoaXMuZmlsZXMgJiYgdGhpcy5sYXN0RmlsZUNvdW50PT09dGhpcy5maWxlcy5sZW5ndGggKXJldHVyblxuXG4gICAgLy9pZiBubyBmaWxlcyBpbiBhcnJheSwgYmUgc3VyZSBicm93c2VyIGRvZXNudCBwcmV2ZW50IHJlc2VsZWN0IG9mIHNhbWUgZmlsZSAoc2VlIGdpdGh1YiBpc3N1ZSAyNylcbiAgICB0aGlzLmZpbGVFbG0udmFsdWUgPSBudWxsXG4gIH1cblxuICBpc0VtcHR5QWZ0ZXJTZWxlY3Rpb24oKTpib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLm11bHRpcGxlO1xuICB9XG5cbiAgZXZlbnRUb1RyYW5zZmVyKGV2ZW50OmFueSk6YW55IHtcbiAgICBpZihldmVudC5kYXRhVHJhbnNmZXIpcmV0dXJuIGV2ZW50LmRhdGFUcmFuc2ZlclxuICAgIHJldHVybiAgZXZlbnQub3JpZ2luYWxFdmVudCA/IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIDogbnVsbFxuICB9XG5cbiAgc3RvcEV2ZW50KGV2ZW50OmFueSk6YW55IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgdHJhbnNmZXJIYXNGaWxlcyh0cmFuc2ZlcjphbnkpOmFueSB7XG4gICAgaWYgKCF0cmFuc2Zlci50eXBlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0cmFuc2Zlci50eXBlcy5pbmRleE9mKSB7XG4gICAgICByZXR1cm4gdHJhbnNmZXIudHlwZXMuaW5kZXhPZignRmlsZXMnKSAhPT0gLTE7XG4gICAgfSBlbHNlIGlmICh0cmFuc2Zlci50eXBlcy5jb250YWlucykge1xuICAgICAgcmV0dXJuIHRyYW5zZmVyLnR5cGVzLmNvbnRhaW5zKCdGaWxlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZXZlbnRUb0ZpbGVzKGV2ZW50OkV2ZW50KXtcbiAgICBjb25zdCB0cmFuc2ZlciA9IHRoaXMuZXZlbnRUb1RyYW5zZmVyKGV2ZW50KTtcbiAgICBpZiggdHJhbnNmZXIgKXtcbiAgICAgIGlmKHRyYW5zZmVyLmZpbGVzICYmIHRyYW5zZmVyLmZpbGVzLmxlbmd0aCl7XG4gICAgICAgIHJldHVybiB0cmFuc2Zlci5maWxlc1xuICAgICAgfVxuICAgICAgaWYodHJhbnNmZXIuaXRlbXMgJiYgdHJhbnNmZXIuaXRlbXMubGVuZ3RoKXtcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVyLml0ZW1zXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXVxuICB9XG5cbiAgYXBwbHlFeGlmUm90YXRpb25zKFxuICAgIGZpbGVzOkZpbGVbXVxuICApOlByb21pc2U8RmlsZVtdPntcbiAgICBjb25zdCBtYXBwZXIgPSAoXG4gICAgICBmaWxlOkZpbGUsaW5kZXg6bnVtYmVyXG4gICAgKTpQcm9taXNlPGFueT49PntcbiAgICAgIHJldHVybiBhcHBseUV4aWZSb3RhdGlvbihmaWxlKVxuICAgICAgLnRoZW4oIGZpeGVkRmlsZT0+ZmlsZXMuc3BsaWNlKGluZGV4LCAxLCBmaXhlZEZpbGUpIClcbiAgICB9XG5cbiAgICBjb25zdCBwcm9tczpQcm9taXNlPGFueT5bXSA9IFtdXG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XG4gICAgICBwcm9tc1t4XSA9IG1hcHBlciggZmlsZXNbeF0sIHggKVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHByb21zICkudGhlbiggKCk9PmZpbGVzIClcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uQ2hhbmdlKGV2ZW50OkV2ZW50KTp2b2lkIHtcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5maWxlcyB8fCB0aGlzLmV2ZW50VG9GaWxlcyhldmVudClcblxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXG5cbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcbiAgfVxuXG4gIGdldEZpbGVGaWx0ZXJGYWlsTmFtZShcbiAgICBmaWxlOkZpbGVcbiAgKTpzdHJpbmcgfCB1bmRlZmluZWR7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZiggIXRoaXMuZmlsdGVyc1tpXS5mbi5jYWxsKHRoaXMsIGZpbGUpICl7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnNbaV0ubmFtZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBpc0ZpbGVWYWxpZChmaWxlOkZpbGUpOmJvb2xlYW57XG4gICAgY29uc3Qgbm9GaWx0ZXJzID0gIXRoaXMuYWNjZXB0ICYmICghdGhpcy5maWx0ZXJzIHx8ICF0aGlzLmZpbHRlcnMubGVuZ3RoKVxuICAgIGlmKCBub0ZpbHRlcnMgKXtcbiAgICAgIHJldHVybiB0cnVlLy93ZSBoYXZlIG5vIGZpbHRlcnMgc28gYWxsIGZpbGVzIGFyZSB2YWxpZFxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGhpcy5nZXRGaWxlRmlsdGVyRmFpbE5hbWUoZmlsZSkgPyBmYWxzZSA6IHRydWVcbiAgfVxuXG4gIGlzRmlsZXNWYWxpZChmaWxlczpGaWxlW10pe1xuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xuICAgICAgaWYoICF0aGlzLmlzRmlsZVZhbGlkKGZpbGVzW3hdKSApe1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBcbiAgcHJvdGVjdGVkIF9hY2NlcHRGaWx0ZXIoaXRlbTpGaWxlKTpib29sZWFuIHtcbiAgICByZXR1cm4gYWNjZXB0VHlwZSh0aGlzLmFjY2VwdCwgaXRlbS50eXBlLCBpdGVtLm5hbWUpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbGVTaXplRmlsdGVyKGl0ZW06RmlsZSk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5tYXhTaXplICYmIGl0ZW0uc2l6ZSA+IHRoaXMubWF4U2l6ZSk7XG4gIH1cblxuICAvKiogYnJvd3NlcnMgdHJ5IGhhcmQgdG8gY29uY2VhbCBkYXRhIGFib3V0IGZpbGUgZHJhZ3MsIHRoaXMgdGVuZHMgdG8gdW5kbyB0aGF0ICovXG4gIGZpbGVzVG9Xcml0ZWFibGVPYmplY3QoIGZpbGVzOkZpbGVbXSApOmRyYWdNZXRhW117XG4gICAgY29uc3QganNvbkZpbGVzOmRyYWdNZXRhW10gPSBbXVxuICAgIGZvcihsZXQgeD0wOyB4IDwgZmlsZXMubGVuZ3RoOyArK3gpe1xuICAgICAganNvbkZpbGVzLnB1c2goe1xuICAgICAgICB0eXBlOmZpbGVzW3hdLnR5cGUsXG4gICAgICAgIGtpbmQ6ZmlsZXNbeF1bXCJraW5kXCJdXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4ganNvbkZpbGVzXG4gIH1cbn1cbiJdfQ==