import { __decorate, __metadata } from "tslib";
import { Directive, EventEmitter, ElementRef, Input, Output, HostListener } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions";
import { acceptType, applyExifRotation, dataUrl } from "./fileTools";
/** A master base set of logic intended to support file select/drag/drop operations
 NOTE: Use ngfDrop for full drag/drop. Use ngfSelect for selecting
*/
var ngf = /** @class */ (function () {
    function ngf(element) {
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
    ngf.prototype.initFilters = function () {
        // the order is important
        this.filters.push({ name: 'accept', fn: this._acceptFilter });
        this.filters.push({ name: 'fileSize', fn: this._fileSizeFilter });
        //this.filters.push({name: 'fileType', fn: this._fileTypeFilter})
        //this.filters.push({name: 'queueLimit', fn: this._queueLimitFilter})
        //this.filters.push({name: 'mimeType', fn: this._mimeTypeFilter})
    };
    ngf.prototype.ngOnDestroy = function () {
        delete this.fileElm; //faster memory release of dom element
    };
    ngf.prototype.ngOnInit = function () {
        var _this = this;
        if (this.selectable) {
            this.enableSelecting();
        }
        if (this.multiple) {
            this.paramFileElm().setAttribute('multiple', this.multiple);
        }
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(function () {
            _this.directiveInit.emit(_this);
        }, 0);
    };
    ngf.prototype.ngOnChanges = function (changes) {
        if (changes.accept) {
            this.paramFileElm().setAttribute('accept', changes.accept.currentValue || '*');
        }
    };
    ngf.prototype.paramFileElm = function () {
        if (this.fileElm)
            return this.fileElm; //already defined
        //elm is a file input
        var isFile = isFileInput(this.element.nativeElement);
        if (isFile)
            return this.fileElm = this.element.nativeElement;
        //create foo file input
        var label = createInvisibleFileInputWrap();
        this.fileElm = label.getElementsByTagName('input')[0];
        this.fileElm.addEventListener('change', this.changeFn.bind(this));
        this.element.nativeElement.appendChild(label);
        return this.fileElm;
    };
    ngf.prototype.enableSelecting = function () {
        var _this = this;
        var elm = this.element.nativeElement;
        if (isFileInput(elm)) {
            var bindedHandler_1 = function (_ev) { return _this.beforeSelect(); };
            elm.addEventListener('click', bindedHandler_1);
            elm.addEventListener('touchstart', bindedHandler_1);
            return;
        }
        var bindedHandler = function (ev) { return _this.clickHandler(ev); };
        elm.addEventListener('click', bindedHandler);
        elm.addEventListener('touchstart', bindedHandler);
        elm.addEventListener('touchend', bindedHandler);
    };
    ngf.prototype.getValidFiles = function (files) {
        var rtn = [];
        for (var x = files.length - 1; x >= 0; --x) {
            if (this.isFileValid(files[x])) {
                rtn.push(files[x]);
            }
        }
        return rtn;
    };
    ngf.prototype.getInvalidFiles = function (files) {
        var rtn = [];
        for (var x = files.length - 1; x >= 0; --x) {
            var failReason = this.getFileFilterFailName(files[x]);
            if (failReason) {
                rtn.push({
                    file: files[x],
                    type: failReason
                });
            }
        }
        return rtn;
    };
    ngf.prototype.handleFiles = function (files) {
        var _this = this;
        var valids = this.getValidFiles(files);
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
                    .then(function (fixedFiles) { return _this.que(fixedFiles); });
            }
            else {
                this.que(valids);
            }
        }
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    };
    ngf.prototype.que = function (files) {
        var _this = this;
        this.files = this.files || [];
        Array.prototype.push.apply(this.files, files);
        //below break memory ref and doesnt act like a que
        //this.files = files//causes memory change which triggers bindings like <ngfFormData [files]="files"></ngfFormData>
        this.filesChange.emit(this.files);
        if (files.length) {
            this.fileChange.emit(this.file = files[0]);
            if (this.lastBaseUrlChange.observers.length) {
                dataUrl(files[0])
                    .then(function (url) { return _this.lastBaseUrlChange.emit(url); });
            }
        }
        //will be checked for input value clearing
        this.lastFileCount = this.files.length;
    };
    /** called when input has files */
    ngf.prototype.changeFn = function (event) {
        var fileList = event.__files_ || (event.target && event.target.files);
        if (!fileList)
            return;
        this.stopEvent(event);
        this.handleFiles(fileList);
    };
    ngf.prototype.clickHandler = function (evt) {
        var elm = this.element.nativeElement;
        if (elm.getAttribute('disabled') || this.fileDropDisabled) {
            return false;
        }
        var r = detectSwipe(evt);
        // prevent the click if it is a swipe
        if (r !== false)
            return r;
        var fileElm = this.paramFileElm();
        fileElm.click();
        //fileElm.dispatchEvent( new Event('click') );
        this.beforeSelect();
        return false;
    };
    ngf.prototype.beforeSelect = function () {
        if (this.files && this.lastFileCount === this.files.length)
            return;
        //if no files in array, be sure browser doesnt prevent reselect of same file (see github issue 27)
        this.fileElm.value = null;
    };
    ngf.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    ngf.prototype.eventToTransfer = function (event) {
        if (event.dataTransfer)
            return event.dataTransfer;
        return event.originalEvent ? event.originalEvent.dataTransfer : null;
    };
    ngf.prototype.stopEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    ngf.prototype.transferHasFiles = function (transfer) {
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
    };
    ngf.prototype.eventToFiles = function (event) {
        var transfer = this.eventToTransfer(event);
        if (transfer) {
            if (transfer.files && transfer.files.length) {
                return transfer.files;
            }
            if (transfer.items && transfer.items.length) {
                return transfer.items;
            }
        }
        return [];
    };
    ngf.prototype.applyExifRotations = function (files) {
        var mapper = function (file, index) {
            return applyExifRotation(file)
                .then(function (fixedFile) { return files.splice(index, 1, fixedFile); });
        };
        var proms = [];
        for (var x = files.length - 1; x >= 0; --x) {
            proms[x] = mapper(files[x], x);
        }
        return Promise.all(proms).then(function () { return files; });
    };
    ngf.prototype.onChange = function (event) {
        var files = this.element.nativeElement.files || this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    };
    ngf.prototype.getFileFilterFailName = function (file) {
        for (var i = 0; i < this.filters.length; i++) {
            if (!this.filters[i].fn.call(this, file)) {
                return this.filters[i].name;
            }
        }
        return undefined;
    };
    ngf.prototype.isFileValid = function (file) {
        var noFilters = !this.accept && (!this.filters || !this.filters.length);
        if (noFilters) {
            return true; //we have no filters so all files are valid
        }
        return this.getFileFilterFailName(file) ? false : true;
    };
    ngf.prototype.isFilesValid = function (files) {
        for (var x = files.length - 1; x >= 0; --x) {
            if (!this.isFileValid(files[x])) {
                return false;
            }
        }
        return true;
    };
    ngf.prototype._acceptFilter = function (item) {
        return acceptType(this.accept, item.type, item.name);
    };
    ngf.prototype._fileSizeFilter = function (item) {
        return !(this.maxSize && item.size > this.maxSize);
    };
    /** browsers try hard to conceal data about file drags, this tends to undo that */
    ngf.prototype.filesToWriteableObject = function (files) {
        var jsonFiles = [];
        for (var x = 0; x < files.length; ++x) {
            jsonFiles.push({
                type: files[x].type,
                kind: files[x]["kind"]
            });
        }
        return jsonFiles;
    };
    ngf.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return ngf;
}());
export { ngf };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ25HLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQUUsT0FBTyxFQUMzQixNQUFNLGFBQWEsQ0FBQTtBQU9wQjs7RUFFRTtBQUtGO0lBNEJFLGFBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUExQnJDLFlBQU8sR0FBNEMsRUFBRSxDQUFBO1FBQ3JELGtCQUFhLEdBQVEsQ0FBQyxDQUFBO1FBS3RCLCtCQUErQjtRQUMvQiwrQkFBK0I7UUFDdEIsc0JBQWlCLEdBQVcsSUFBSSxDQUFBO1FBRWhDLHFCQUFnQixHQUFXLEtBQUssQ0FBQTtRQUNoQyxlQUFVLEdBQVcsS0FBSyxDQUFBO1FBQ25CLGtCQUFhLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsaUJBQVksR0FBcUIsRUFBRSxDQUFBO1FBQ2xDLHVCQUFrQixHQUEyQyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBRy9FLHNCQUFpQixHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzNELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxVQUFLLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLGdCQUFXLEdBQXdCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHdEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCx5QkFBVyxHQUFYO1FBQ0UseUJBQXlCO1FB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QUFDLENBQUE7U0FDSDtRQUNELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUM7O2dCQW5TMEIsVUFBVTs7SUF2QjVCO1FBQVIsS0FBSyxFQUFFOzt5Q0FBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7O3VDQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7d0NBQWtCO0lBR2pCO1FBQVIsS0FBSyxFQUFFOztrREFBaUM7SUFFaEM7UUFBUixLQUFLLEVBQUU7O2lEQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7MkNBQTJCO0lBQ25CO1FBQWYsTUFBTSxDQUFDLE1BQU0sQ0FBQztrQ0FBZSxZQUFZOzhDQUEwQjtJQUUzRDtRQUFSLEtBQUssRUFBRTs7NkNBQW9DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFO2tDQUFvQixZQUFZO21EQUFnRDtJQUVoRjtRQUFSLEtBQUssRUFBRTs7NENBQXNCO0lBQ3BCO1FBQVQsTUFBTSxFQUFFO2tDQUFtQixZQUFZO2tEQUE2QjtJQUU1RDtRQUFSLEtBQUssRUFBRTtrQ0FBUyxJQUFJO3FDQUFBO0lBQ1g7UUFBVCxNQUFNLEVBQUU7a0NBQVksWUFBWTsyQ0FBMkI7SUFFbkQ7UUFBUixLQUFLLEVBQUU7O3NDQUFrQjtJQUNoQjtRQUFULE1BQU0sRUFBRTtrQ0FBYSxZQUFZOzRDQUFzQztJQTZPeEU7UUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzt1Q0FPbkI7SUE5UVUsR0FBRztRQUpmLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBQyxLQUFLO1NBQ2YsQ0FBQzt5Q0E2QjJCLFVBQVU7T0E1QjFCLEdBQUcsQ0FnVWY7SUFBRCxVQUFDO0NBQUEsQUFoVUQsSUFnVUM7U0FoVVksR0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgY3JlYXRlSW52aXNpYmxlRmlsZUlucHV0V3JhcCwgaXNGaWxlSW5wdXQsIGRldGVjdFN3aXBlIH0gZnJvbSBcIi4vZG9jLWV2ZW50LWhlbHAuZnVuY3Rpb25zXCJcclxuaW1wb3J0IHtcclxuICBhY2NlcHRUeXBlLCBJbnZhbGlkRmlsZUl0ZW0sXHJcbiAgYXBwbHlFeGlmUm90YXRpb24sIGRhdGFVcmxcclxufSBmcm9tIFwiLi9maWxlVG9vbHNcIlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBkcmFnTWV0YXtcclxuICB0eXBlOnN0cmluZ1xyXG4gIGtpbmQ6c3RyaW5nXHJcbn1cclxuXHJcbi8qKiBBIG1hc3RlciBiYXNlIHNldCBvZiBsb2dpYyBpbnRlbmRlZCB0byBzdXBwb3J0IGZpbGUgc2VsZWN0L2RyYWcvZHJvcCBvcGVyYXRpb25zXHJcbiBOT1RFOiBVc2UgbmdmRHJvcCBmb3IgZnVsbCBkcmFnL2Ryb3AuIFVzZSBuZ2ZTZWxlY3QgZm9yIHNlbGVjdGluZ1xyXG4qL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbbmdmXVwiLFxyXG4gIGV4cG9ydEFzOlwibmdmXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIG5nZiB7XHJcbiAgZmlsZUVsbTphbnlcclxuICBmaWx0ZXJzOntuYW1lOnN0cmluZywgZm46KGZpbGU6RmlsZSk9PmJvb2xlYW59W10gPSBbXVxyXG4gIGxhc3RGaWxlQ291bnQ6bnVtYmVyPTBcclxuXHJcbiAgQElucHV0KCkgbXVsdGlwbGUgITpzdHJpbmdcclxuICBASW5wdXQoKSBhY2NlcHQgICAhOnN0cmluZ1xyXG4gIEBJbnB1dCgpIG1heFNpemUgICE6bnVtYmVyXHJcbiAgLy9ASW5wdXQoKSBmb3JjZUZpbGVuYW1lOnN0cmluZ1xyXG4gIC8vQElucHV0KCkgZm9yY2VQb3N0bmFtZTpzdHJpbmdcclxuICBASW5wdXQoKSBuZ2ZGaXhPcmllbnRhdGlvbjpib29sZWFuID0gdHJ1ZVxyXG5cclxuICBASW5wdXQoKSBmaWxlRHJvcERpc2FibGVkOmJvb2xlYW4gPSBmYWxzZVxyXG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6Ym9vbGVhbiA9IGZhbHNlXHJcbiAgQE91dHB1dCgnaW5pdCcpIGRpcmVjdGl2ZUluaXQ6RXZlbnRFbWl0dGVyPG5nZj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuICBcclxuICBASW5wdXQoKSBsYXN0SW52YWxpZHM6SW52YWxpZEZpbGVJdGVtW10gPSBbXVxyXG4gIEBPdXRwdXQoKSBsYXN0SW52YWxpZHNDaGFuZ2U6RXZlbnRFbWl0dGVyPHtmaWxlOkZpbGUsdHlwZTpzdHJpbmd9W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dCgpIGxhc3RCYXNlVXJsICE6IHN0cmluZy8vYmFzZTY0IGxhc3QgZmlsZSB1cGxvYWRlZCB1cmxcclxuICBAT3V0cHV0KCkgbGFzdEJhc2VVcmxDaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuICBcclxuICBASW5wdXQoKSBmaWxlICE6IEZpbGUvL2xhc3QgZmlsZSB1cGxvYWRlZFxyXG4gIEBPdXRwdXQoKSBmaWxlQ2hhbmdlOkV2ZW50RW1pdHRlcjxGaWxlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBmaWxlczpGaWxlW10gPSBbXVxyXG4gIEBPdXRwdXQoKSBmaWxlc0NoYW5nZTpFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmKXtcclxuICAgIHRoaXMuaW5pdEZpbHRlcnMoKVxyXG4gIH1cclxuXHJcbiAgaW5pdEZpbHRlcnMoKXtcclxuICAgIC8vIHRoZSBvcmRlciBpcyBpbXBvcnRhbnRcclxuICAgIHRoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiAnYWNjZXB0JywgZm46IHRoaXMuX2FjY2VwdEZpbHRlcn0pXHJcbiAgICB0aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2ZpbGVTaXplJywgZm46IHRoaXMuX2ZpbGVTaXplRmlsdGVyfSlcclxuXHJcbiAgICAvL3RoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiAnZmlsZVR5cGUnLCBmbjogdGhpcy5fZmlsZVR5cGVGaWx0ZXJ9KVxyXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ3F1ZXVlTGltaXQnLCBmbjogdGhpcy5fcXVldWVMaW1pdEZpbHRlcn0pXHJcbiAgICAvL3RoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiAnbWltZVR5cGUnLCBmbjogdGhpcy5fbWltZVR5cGVGaWx0ZXJ9KVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKXtcclxuICAgIGRlbGV0ZSB0aGlzLmZpbGVFbG0vL2Zhc3RlciBtZW1vcnkgcmVsZWFzZSBvZiBkb20gZWxlbWVudFxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKXtcclxuICAgIGlmKCB0aGlzLnNlbGVjdGFibGUgKXtcclxuICAgICAgdGhpcy5lbmFibGVTZWxlY3RpbmcoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmKCB0aGlzLm11bHRpcGxlICl7XHJcbiAgICAgIHRoaXMucGFyYW1GaWxlRWxtKCkuc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsIHRoaXMubXVsdGlwbGUpXHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgcmVmZXJlbmNlIHRvIHRoaXMgY2xhc3Mgd2l0aCBvbmUgY3ljbGUgZGVsYXkgdG8gYXZvaWQgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvclxyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLmRpcmVjdGl2ZUluaXQuZW1pdCh0aGlzKVxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCBjaGFuZ2VzICl7XHJcbiAgICBpZiggY2hhbmdlcy5hY2NlcHQgKXtcclxuICAgICAgdGhpcy5wYXJhbUZpbGVFbG0oKS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdCcsIGNoYW5nZXMuYWNjZXB0LmN1cnJlbnRWYWx1ZSB8fCAnKicpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYXJhbUZpbGVFbG0oKXtcclxuICAgIGlmKCB0aGlzLmZpbGVFbG0gKXJldHVybiB0aGlzLmZpbGVFbG0vL2FscmVhZHkgZGVmaW5lZFxyXG4gICAgXHJcbiAgICAvL2VsbSBpcyBhIGZpbGUgaW5wdXRcclxuICAgIGNvbnN0IGlzRmlsZSA9IGlzRmlsZUlucHV0KCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCApXHJcbiAgICBpZihpc0ZpbGUpcmV0dXJuIHRoaXMuZmlsZUVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50XHJcbiAgICBcclxuICAgIC8vY3JlYXRlIGZvbyBmaWxlIGlucHV0XHJcbiAgICBjb25zdCBsYWJlbCA9IGNyZWF0ZUludmlzaWJsZUZpbGVJbnB1dFdyYXAoKVxyXG4gICAgdGhpcy5maWxlRWxtID0gbGFiZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF1cclxuICAgIHRoaXMuZmlsZUVsbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUZuLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGxhYmVsIClcclxuICAgIHJldHVybiB0aGlzLmZpbGVFbG1cclxuICB9XHJcblxyXG4gIGVuYWJsZVNlbGVjdGluZygpe1xyXG4gICAgbGV0IGVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50XHJcblxyXG4gICAgaWYoIGlzRmlsZUlucHV0KGVsbSkgKXtcclxuICAgICAgY29uc3QgYmluZGVkSGFuZGxlciA9IF9ldj0+dGhpcy5iZWZvcmVTZWxlY3QoKVxyXG4gICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kZWRIYW5kbGVyKVxyXG4gICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGJpbmRlZEhhbmRsZXIpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJpbmRlZEhhbmRsZXIgPSBldj0+dGhpcy5jbGlja0hhbmRsZXIoZXYpXHJcbiAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kZWRIYW5kbGVyKVxyXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBiaW5kZWRIYW5kbGVyKVxyXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgYmluZGVkSGFuZGxlcilcclxuICB9XHJcblxyXG4gIGdldFZhbGlkRmlsZXMoIGZpbGVzOkZpbGVbXSApOkZpbGVbXXtcclxuICAgIGNvbnN0IHJ0bjpGaWxlW10gPSBbXVxyXG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XHJcbiAgICAgIGlmKCB0aGlzLmlzRmlsZVZhbGlkKGZpbGVzW3hdKSApe1xyXG4gICAgICAgIHJ0bi5wdXNoKCBmaWxlc1t4XSApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBydG5cclxuICB9XHJcblxyXG4gIGdldEludmFsaWRGaWxlcyhmaWxlczpGaWxlW10pOkludmFsaWRGaWxlSXRlbVtde1xyXG4gICAgY29uc3QgcnRuOkludmFsaWRGaWxlSXRlbVtdID0gW11cclxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xyXG4gICAgICBsZXQgZmFpbFJlYXNvbiA9IHRoaXMuZ2V0RmlsZUZpbHRlckZhaWxOYW1lKGZpbGVzW3hdKVxyXG4gICAgICBpZiggZmFpbFJlYXNvbiApe1xyXG4gICAgICAgIHJ0bi5wdXNoKHtcclxuICAgICAgICAgIGZpbGUgOiBmaWxlc1t4XSxcclxuICAgICAgICAgIHR5cGUgOiBmYWlsUmVhc29uXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJ0blxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRmlsZXMoZmlsZXM6RmlsZVtdKXtcclxuICAgIGNvbnN0IHZhbGlkcyA9IHRoaXMuZ2V0VmFsaWRGaWxlcyhmaWxlcylcclxuXHJcbiAgICBpZihmaWxlcy5sZW5ndGghPXZhbGlkcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmxhc3RJbnZhbGlkcyA9IHRoaXMuZ2V0SW52YWxpZEZpbGVzKGZpbGVzKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLmxhc3RJbnZhbGlkc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmxhc3RJbnZhbGlkc0NoYW5nZS5lbWl0KHRoaXMubGFzdEludmFsaWRzKVxyXG5cclxuICAgIGlmKCB2YWxpZHMubGVuZ3RoICl7XHJcbiAgICAgIGlmKCB0aGlzLm5nZkZpeE9yaWVudGF0aW9uICl7XHJcbiAgICAgICAgdGhpcy5hcHBseUV4aWZSb3RhdGlvbnModmFsaWRzKVxyXG4gICAgICAgIC50aGVuKCBmaXhlZEZpbGVzPT50aGlzLnF1ZShmaXhlZEZpbGVzKSApXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHRoaXMucXVlKHZhbGlkcylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzRW1wdHlBZnRlclNlbGVjdGlvbigpKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJydcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHF1ZSggZmlsZXM6RmlsZVtdICl7XHJcbiAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcyB8fCBbXVxyXG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5maWxlcywgZmlsZXMpXHJcblxyXG4gICAgLy9iZWxvdyBicmVhayBtZW1vcnkgcmVmIGFuZCBkb2VzbnQgYWN0IGxpa2UgYSBxdWVcclxuICAgIC8vdGhpcy5maWxlcyA9IGZpbGVzLy9jYXVzZXMgbWVtb3J5IGNoYW5nZSB3aGljaCB0cmlnZ2VycyBiaW5kaW5ncyBsaWtlIDxuZ2ZGb3JtRGF0YSBbZmlsZXNdPVwiZmlsZXNcIj48L25nZkZvcm1EYXRhPlxyXG4gICAgXHJcbiAgICB0aGlzLmZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZmlsZXMgKVxyXG5cclxuICAgIGlmKGZpbGVzLmxlbmd0aCl7XHJcbiAgICAgIHRoaXMuZmlsZUNoYW5nZS5lbWl0KCB0aGlzLmZpbGU9ZmlsZXNbMF0gKVxyXG5cclxuICAgICAgaWYodGhpcy5sYXN0QmFzZVVybENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKXtcclxuICAgICAgICBkYXRhVXJsKCBmaWxlc1swXSApXHJcbiAgICAgICAgLnRoZW4oIHVybD0+dGhpcy5sYXN0QmFzZVVybENoYW5nZS5lbWl0KHVybCkgKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy93aWxsIGJlIGNoZWNrZWQgZm9yIGlucHV0IHZhbHVlIGNsZWFyaW5nXHJcbiAgICB0aGlzLmxhc3RGaWxlQ291bnQgPSB0aGlzLmZpbGVzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgLyoqIGNhbGxlZCB3aGVuIGlucHV0IGhhcyBmaWxlcyAqL1xyXG4gIGNoYW5nZUZuKGV2ZW50OmFueSkge1xyXG4gICAgdmFyIGZpbGVMaXN0ID0gZXZlbnQuX19maWxlc18gfHwgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuZmlsZXMpXHJcblxyXG4gICAgaWYgKCFmaWxlTGlzdCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZUxpc3QpXHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIoZXZ0OmFueSl7XHJcbiAgICBjb25zdCBlbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxyXG4gICAgaWYgKGVsbS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHwgdGhpcy5maWxlRHJvcERpc2FibGVkKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgciA9IGRldGVjdFN3aXBlKGV2dCk7XHJcbiAgICAvLyBwcmV2ZW50IHRoZSBjbGljayBpZiBpdCBpcyBhIHN3aXBlXHJcbiAgICBpZiAoIHIhPT1mYWxzZSApIHJldHVybiByO1xyXG5cclxuICAgIGNvbnN0IGZpbGVFbG0gPSB0aGlzLnBhcmFtRmlsZUVsbSgpXHJcbiAgICBmaWxlRWxtLmNsaWNrKClcclxuICAgIC8vZmlsZUVsbS5kaXNwYXRjaEV2ZW50KCBuZXcgRXZlbnQoJ2NsaWNrJykgKTtcclxuICAgIHRoaXMuYmVmb3JlU2VsZWN0KClcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBiZWZvcmVTZWxlY3QoKXtcclxuICAgIGlmKCB0aGlzLmZpbGVzICYmIHRoaXMubGFzdEZpbGVDb3VudD09PXRoaXMuZmlsZXMubGVuZ3RoIClyZXR1cm5cclxuXHJcbiAgICAvL2lmIG5vIGZpbGVzIGluIGFycmF5LCBiZSBzdXJlIGJyb3dzZXIgZG9lc250IHByZXZlbnQgcmVzZWxlY3Qgb2Ygc2FtZSBmaWxlIChzZWUgZ2l0aHViIGlzc3VlIDI3KVxyXG4gICAgdGhpcy5maWxlRWxtLnZhbHVlID0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaXNFbXB0eUFmdGVyU2VsZWN0aW9uKCk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLm11bHRpcGxlO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRUb1RyYW5zZmVyKGV2ZW50OmFueSk6YW55IHtcclxuICAgIGlmKGV2ZW50LmRhdGFUcmFuc2ZlcilyZXR1cm4gZXZlbnQuZGF0YVRyYW5zZmVyXHJcbiAgICByZXR1cm4gIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPyBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciA6IG51bGxcclxuICB9XHJcblxyXG4gIHN0b3BFdmVudChldmVudDphbnkpOmFueSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zlckhhc0ZpbGVzKHRyYW5zZmVyOmFueSk6YW55IHtcclxuICAgIGlmICghdHJhbnNmZXIudHlwZXMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFuc2Zlci50eXBlcy5pbmRleE9mKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2Zlci50eXBlcy5pbmRleE9mKCdGaWxlcycpICE9PSAtMTtcclxuICAgIH0gZWxzZSBpZiAodHJhbnNmZXIudHlwZXMuY29udGFpbnMpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zZmVyLnR5cGVzLmNvbnRhaW5zKCdGaWxlcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXZlbnRUb0ZpbGVzKGV2ZW50OkV2ZW50KXtcclxuICAgIGNvbnN0IHRyYW5zZmVyID0gdGhpcy5ldmVudFRvVHJhbnNmZXIoZXZlbnQpO1xyXG4gICAgaWYoIHRyYW5zZmVyICl7XHJcbiAgICAgIGlmKHRyYW5zZmVyLmZpbGVzICYmIHRyYW5zZmVyLmZpbGVzLmxlbmd0aCl7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVyLmZpbGVzXHJcbiAgICAgIH1cclxuICAgICAgaWYodHJhbnNmZXIuaXRlbXMgJiYgdHJhbnNmZXIuaXRlbXMubGVuZ3RoKXtcclxuICAgICAgICByZXR1cm4gdHJhbnNmZXIuaXRlbXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdXHJcbiAgfVxyXG5cclxuICBhcHBseUV4aWZSb3RhdGlvbnMoXHJcbiAgICBmaWxlczpGaWxlW11cclxuICApOlByb21pc2U8RmlsZVtdPntcclxuICAgIGNvbnN0IG1hcHBlciA9IChcclxuICAgICAgZmlsZTpGaWxlLGluZGV4Om51bWJlclxyXG4gICAgKTpQcm9taXNlPGFueT49PntcclxuICAgICAgcmV0dXJuIGFwcGx5RXhpZlJvdGF0aW9uKGZpbGUpXHJcbiAgICAgIC50aGVuKCBmaXhlZEZpbGU9PmZpbGVzLnNwbGljZShpbmRleCwgMSwgZml4ZWRGaWxlKSApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvbXM6UHJvbWlzZTxhbnk+W10gPSBbXVxyXG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XHJcbiAgICAgIHByb21zW3hdID0gbWFwcGVyKCBmaWxlc1t4XSwgeCApXHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHByb21zICkudGhlbiggKCk9PmZpbGVzIClcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pXHJcbiAgb25DaGFuZ2UoZXZlbnQ6RXZlbnQpOnZvaWQge1xyXG4gICAgbGV0IGZpbGVzID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlsZXMgfHwgdGhpcy5ldmVudFRvRmlsZXMoZXZlbnQpXHJcblxyXG4gICAgaWYoIWZpbGVzLmxlbmd0aClyZXR1cm5cclxuXHJcbiAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKVxyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZUZpbHRlckZhaWxOYW1lKFxyXG4gICAgZmlsZTpGaWxlXHJcbiAgKTpzdHJpbmcgfCB1bmRlZmluZWR7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYoICF0aGlzLmZpbHRlcnNbaV0uZm4uY2FsbCh0aGlzLCBmaWxlKSApe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnNbaV0ubmFtZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICBpc0ZpbGVWYWxpZChmaWxlOkZpbGUpOmJvb2xlYW57XHJcbiAgICBjb25zdCBub0ZpbHRlcnMgPSAhdGhpcy5hY2NlcHQgJiYgKCF0aGlzLmZpbHRlcnMgfHwgIXRoaXMuZmlsdGVycy5sZW5ndGgpXHJcbiAgICBpZiggbm9GaWx0ZXJzICl7XHJcbiAgICAgIHJldHVybiB0cnVlLy93ZSBoYXZlIG5vIGZpbHRlcnMgc28gYWxsIGZpbGVzIGFyZSB2YWxpZFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5nZXRGaWxlRmlsdGVyRmFpbE5hbWUoZmlsZSkgPyBmYWxzZSA6IHRydWVcclxuICB9XHJcblxyXG4gIGlzRmlsZXNWYWxpZChmaWxlczpGaWxlW10pe1xyXG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XHJcbiAgICAgIGlmKCAhdGhpcy5pc0ZpbGVWYWxpZChmaWxlc1t4XSkgKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgXHJcbiAgcHJvdGVjdGVkIF9hY2NlcHRGaWx0ZXIoaXRlbTpGaWxlKTpib29sZWFuIHtcclxuICAgIHJldHVybiBhY2NlcHRUeXBlKHRoaXMuYWNjZXB0LCBpdGVtLnR5cGUsIGl0ZW0ubmFtZSlcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZmlsZVNpemVGaWx0ZXIoaXRlbTpGaWxlKTpib29sZWFuIHtcclxuICAgIHJldHVybiAhKHRoaXMubWF4U2l6ZSAmJiBpdGVtLnNpemUgPiB0aGlzLm1heFNpemUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIGJyb3dzZXJzIHRyeSBoYXJkIHRvIGNvbmNlYWwgZGF0YSBhYm91dCBmaWxlIGRyYWdzLCB0aGlzIHRlbmRzIHRvIHVuZG8gdGhhdCAqL1xyXG4gIGZpbGVzVG9Xcml0ZWFibGVPYmplY3QoIGZpbGVzOkZpbGVbXSApOmRyYWdNZXRhW117XHJcbiAgICBjb25zdCBqc29uRmlsZXM6ZHJhZ01ldGFbXSA9IFtdXHJcbiAgICBmb3IobGV0IHg9MDsgeCA8IGZpbGVzLmxlbmd0aDsgKyt4KXtcclxuICAgICAganNvbkZpbGVzLnB1c2goe1xyXG4gICAgICAgIHR5cGU6ZmlsZXNbeF0udHlwZSxcclxuICAgICAgICBraW5kOmZpbGVzW3hdW1wia2luZFwiXVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGpzb25GaWxlc1xyXG4gIH1cclxufVxyXG4iXX0=