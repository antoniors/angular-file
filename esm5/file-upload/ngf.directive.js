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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ25HLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQUUsT0FBTyxFQUMzQixNQUFNLGFBQWEsQ0FBQTtBQU9wQjs7RUFFRTtBQUtGO0lBNEJFLGFBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUExQnJDLFlBQU8sR0FBNEMsRUFBRSxDQUFBO1FBQ3JELGtCQUFhLEdBQVEsQ0FBQyxDQUFBO1FBS3RCLCtCQUErQjtRQUMvQiwrQkFBK0I7UUFDdEIsc0JBQWlCLEdBQVcsSUFBSSxDQUFBO1FBRWhDLHFCQUFnQixHQUFXLEtBQUssQ0FBQTtRQUNoQyxlQUFVLEdBQVcsS0FBSyxDQUFBO1FBQ25CLGtCQUFhLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFM0QsaUJBQVksR0FBcUIsRUFBRSxDQUFBO1FBQ2xDLHVCQUFrQixHQUEyQyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBRy9FLHNCQUFpQixHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzNELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUVuRCxVQUFLLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLGdCQUFXLEdBQXdCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHdEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCx5QkFBVyxHQUFYO1FBQ0UseUJBQXlCO1FB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QUFDLENBQUE7U0FDSDtRQUNELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUM7O2dCQW5TMEIsVUFBVTs7SUF2QjVCO1FBQVIsS0FBSyxFQUFFOzt5Q0FBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7O3VDQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7d0NBQWtCO0lBR2pCO1FBQVIsS0FBSyxFQUFFOztrREFBaUM7SUFFaEM7UUFBUixLQUFLLEVBQUU7O2lEQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7MkNBQTJCO0lBQ25CO1FBQWYsTUFBTSxDQUFDLE1BQU0sQ0FBQztrQ0FBZSxZQUFZOzhDQUEwQjtJQUUzRDtRQUFSLEtBQUssRUFBRTs7NkNBQW9DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFO2tDQUFvQixZQUFZO21EQUFnRDtJQUVoRjtRQUFSLEtBQUssRUFBRTs7NENBQXNCO0lBQ3BCO1FBQVQsTUFBTSxFQUFFO2tDQUFtQixZQUFZO2tEQUE2QjtJQUU1RDtRQUFSLEtBQUssRUFBRTtrQ0FBUyxJQUFJO3FDQUFBO0lBQ1g7UUFBVCxNQUFNLEVBQUU7a0NBQVksWUFBWTsyQ0FBMkI7SUFFbkQ7UUFBUixLQUFLLEVBQUU7O3NDQUFrQjtJQUNoQjtRQUFULE1BQU0sRUFBRTtrQ0FBYSxZQUFZOzRDQUFzQztJQTZPeEU7UUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNwQixLQUFLOzt1Q0FPbkI7SUE5UVUsR0FBRztRQUpmLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBQyxLQUFLO1NBQ2YsQ0FBQzt5Q0E2QjJCLFVBQVU7T0E1QjFCLEdBQUcsQ0FnVWY7SUFBRCxVQUFDO0NBQUEsQUFoVUQsSUFnVUM7U0FoVVksR0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUludmlzaWJsZUZpbGVJbnB1dFdyYXAsIGlzRmlsZUlucHV0LCBkZXRlY3RTd2lwZSB9IGZyb20gXCIuL2RvYy1ldmVudC1oZWxwLmZ1bmN0aW9uc1wiXG5pbXBvcnQge1xuICBhY2NlcHRUeXBlLCBJbnZhbGlkRmlsZUl0ZW0sXG4gIGFwcGx5RXhpZlJvdGF0aW9uLCBkYXRhVXJsXG59IGZyb20gXCIuL2ZpbGVUb29sc1wiXG5cbmV4cG9ydCBpbnRlcmZhY2UgZHJhZ01ldGF7XG4gIHR5cGU6c3RyaW5nXG4gIGtpbmQ6c3RyaW5nXG59XG5cbi8qKiBBIG1hc3RlciBiYXNlIHNldCBvZiBsb2dpYyBpbnRlbmRlZCB0byBzdXBwb3J0IGZpbGUgc2VsZWN0L2RyYWcvZHJvcCBvcGVyYXRpb25zXG4gTk9URTogVXNlIG5nZkRyb3AgZm9yIGZ1bGwgZHJhZy9kcm9wLiBVc2UgbmdmU2VsZWN0IGZvciBzZWxlY3RpbmdcbiovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW25nZl1cIixcbiAgZXhwb3J0QXM6XCJuZ2ZcIlxufSlcbmV4cG9ydCBjbGFzcyBuZ2Yge1xuICBmaWxlRWxtOmFueVxuICBmaWx0ZXJzOntuYW1lOnN0cmluZywgZm46KGZpbGU6RmlsZSk9PmJvb2xlYW59W10gPSBbXVxuICBsYXN0RmlsZUNvdW50Om51bWJlcj0wXG5cbiAgQElucHV0KCkgbXVsdGlwbGUgITpzdHJpbmdcbiAgQElucHV0KCkgYWNjZXB0ICAgITpzdHJpbmdcbiAgQElucHV0KCkgbWF4U2l6ZSAgITpudW1iZXJcbiAgLy9ASW5wdXQoKSBmb3JjZUZpbGVuYW1lOnN0cmluZ1xuICAvL0BJbnB1dCgpIGZvcmNlUG9zdG5hbWU6c3RyaW5nXG4gIEBJbnB1dCgpIG5nZkZpeE9yaWVudGF0aW9uOmJvb2xlYW4gPSB0cnVlXG5cbiAgQElucHV0KCkgZmlsZURyb3BEaXNhYmxlZDpib29sZWFuID0gZmFsc2VcbiAgQElucHV0KCkgc2VsZWN0YWJsZTpib29sZWFuID0gZmFsc2VcbiAgQE91dHB1dCgnaW5pdCcpIGRpcmVjdGl2ZUluaXQ6RXZlbnRFbWl0dGVyPG5nZj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgXG4gIEBJbnB1dCgpIGxhc3RJbnZhbGlkczpJbnZhbGlkRmlsZUl0ZW1bXSA9IFtdXG4gIEBPdXRwdXQoKSBsYXN0SW52YWxpZHNDaGFuZ2U6RXZlbnRFbWl0dGVyPHtmaWxlOkZpbGUsdHlwZTpzdHJpbmd9W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgQElucHV0KCkgbGFzdEJhc2VVcmwgITogc3RyaW5nLy9iYXNlNjQgbGFzdCBmaWxlIHVwbG9hZGVkIHVybFxuICBAT3V0cHV0KCkgbGFzdEJhc2VVcmxDaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgXG4gIEBJbnB1dCgpIGZpbGUgITogRmlsZS8vbGFzdCBmaWxlIHVwbG9hZGVkXG4gIEBPdXRwdXQoKSBmaWxlQ2hhbmdlOkV2ZW50RW1pdHRlcjxGaWxlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBJbnB1dCgpIGZpbGVzOkZpbGVbXSA9IFtdXG4gIEBPdXRwdXQoKSBmaWxlc0NoYW5nZTpFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYpe1xuICAgIHRoaXMuaW5pdEZpbHRlcnMoKVxuICB9XG5cbiAgaW5pdEZpbHRlcnMoKXtcbiAgICAvLyB0aGUgb3JkZXIgaXMgaW1wb3J0YW50XG4gICAgdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdhY2NlcHQnLCBmbjogdGhpcy5fYWNjZXB0RmlsdGVyfSlcbiAgICB0aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ2ZpbGVTaXplJywgZm46IHRoaXMuX2ZpbGVTaXplRmlsdGVyfSlcblxuICAgIC8vdGhpcy5maWx0ZXJzLnB1c2goe25hbWU6ICdmaWxlVHlwZScsIGZuOiB0aGlzLl9maWxlVHlwZUZpbHRlcn0pXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ3F1ZXVlTGltaXQnLCBmbjogdGhpcy5fcXVldWVMaW1pdEZpbHRlcn0pXG4gICAgLy90aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogJ21pbWVUeXBlJywgZm46IHRoaXMuX21pbWVUeXBlRmlsdGVyfSlcbiAgfVxuXG4gIG5nT25EZXN0cm95KCl7XG4gICAgZGVsZXRlIHRoaXMuZmlsZUVsbS8vZmFzdGVyIG1lbW9yeSByZWxlYXNlIG9mIGRvbSBlbGVtZW50XG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIGlmKCB0aGlzLnNlbGVjdGFibGUgKXtcbiAgICAgIHRoaXMuZW5hYmxlU2VsZWN0aW5nKClcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tdWx0aXBsZSApe1xuICAgICAgdGhpcy5wYXJhbUZpbGVFbG0oKS5zZXRBdHRyaWJ1dGUoJ211bHRpcGxlJywgdGhpcy5tdWx0aXBsZSlcbiAgICB9XG5cbiAgICAvL2NyZWF0ZSByZWZlcmVuY2UgdG8gdGhpcyBjbGFzcyB3aXRoIG9uZSBjeWNsZSBkZWxheSB0byBhdm9pZCBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yXG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgdGhpcy5kaXJlY3RpdmVJbml0LmVtaXQodGhpcylcbiAgICB9LCAwKVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoIGNoYW5nZXMgKXtcbiAgICBpZiggY2hhbmdlcy5hY2NlcHQgKXtcbiAgICAgIHRoaXMucGFyYW1GaWxlRWxtKCkuc2V0QXR0cmlidXRlKCdhY2NlcHQnLCBjaGFuZ2VzLmFjY2VwdC5jdXJyZW50VmFsdWUgfHwgJyonKVxuICAgIH1cbiAgfVxuXG4gIHBhcmFtRmlsZUVsbSgpe1xuICAgIGlmKCB0aGlzLmZpbGVFbG0gKXJldHVybiB0aGlzLmZpbGVFbG0vL2FscmVhZHkgZGVmaW5lZFxuICAgIFxuICAgIC8vZWxtIGlzIGEgZmlsZSBpbnB1dFxuICAgIGNvbnN0IGlzRmlsZSA9IGlzRmlsZUlucHV0KCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCApXG4gICAgaWYoaXNGaWxlKXJldHVybiB0aGlzLmZpbGVFbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgIFxuICAgIC8vY3JlYXRlIGZvbyBmaWxlIGlucHV0XG4gICAgY29uc3QgbGFiZWwgPSBjcmVhdGVJbnZpc2libGVGaWxlSW5wdXRXcmFwKClcbiAgICB0aGlzLmZpbGVFbG0gPSBsYWJlbC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXVxuICAgIHRoaXMuZmlsZUVsbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUZuLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCBsYWJlbCApXG4gICAgcmV0dXJuIHRoaXMuZmlsZUVsbVxuICB9XG5cbiAgZW5hYmxlU2VsZWN0aW5nKCl7XG4gICAgbGV0IGVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50XG5cbiAgICBpZiggaXNGaWxlSW5wdXQoZWxtKSApe1xuICAgICAgY29uc3QgYmluZGVkSGFuZGxlciA9IF9ldj0+dGhpcy5iZWZvcmVTZWxlY3QoKVxuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcbiAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgYmluZGVkSGFuZGxlcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGJpbmRlZEhhbmRsZXIgPSBldj0+dGhpcy5jbGlja0hhbmRsZXIoZXYpXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZGVkSGFuZGxlcilcbiAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGJpbmRlZEhhbmRsZXIpXG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgYmluZGVkSGFuZGxlcilcbiAgfVxuXG4gIGdldFZhbGlkRmlsZXMoIGZpbGVzOkZpbGVbXSApOkZpbGVbXXtcbiAgICBjb25zdCBydG46RmlsZVtdID0gW11cbiAgICBmb3IobGV0IHg9ZmlsZXMubGVuZ3RoLTE7IHggPj0gMDsgLS14KXtcbiAgICAgIGlmKCB0aGlzLmlzRmlsZVZhbGlkKGZpbGVzW3hdKSApe1xuICAgICAgICBydG4ucHVzaCggZmlsZXNbeF0gKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnRuXG4gIH1cblxuICBnZXRJbnZhbGlkRmlsZXMoZmlsZXM6RmlsZVtdKTpJbnZhbGlkRmlsZUl0ZW1bXXtcbiAgICBjb25zdCBydG46SW52YWxpZEZpbGVJdGVtW10gPSBbXVxuICAgIGZvcihsZXQgeD1maWxlcy5sZW5ndGgtMTsgeCA+PSAwOyAtLXgpe1xuICAgICAgbGV0IGZhaWxSZWFzb24gPSB0aGlzLmdldEZpbGVGaWx0ZXJGYWlsTmFtZShmaWxlc1t4XSlcbiAgICAgIGlmKCBmYWlsUmVhc29uICl7XG4gICAgICAgIHJ0bi5wdXNoKHtcbiAgICAgICAgICBmaWxlIDogZmlsZXNbeF0sXG4gICAgICAgICAgdHlwZSA6IGZhaWxSZWFzb25cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ0blxuICB9XG5cbiAgaGFuZGxlRmlsZXMoZmlsZXM6RmlsZVtdKXtcbiAgICBjb25zdCB2YWxpZHMgPSB0aGlzLmdldFZhbGlkRmlsZXMoZmlsZXMpXG5cbiAgICBpZihmaWxlcy5sZW5ndGghPXZhbGlkcy5sZW5ndGgpe1xuICAgICAgdGhpcy5sYXN0SW52YWxpZHMgPSB0aGlzLmdldEludmFsaWRGaWxlcyhmaWxlcylcbiAgICB9ZWxzZXtcbiAgICAgIGRlbGV0ZSB0aGlzLmxhc3RJbnZhbGlkc1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmxhc3RJbnZhbGlkc0NoYW5nZS5lbWl0KHRoaXMubGFzdEludmFsaWRzKVxuXG4gICAgaWYoIHZhbGlkcy5sZW5ndGggKXtcbiAgICAgIGlmKCB0aGlzLm5nZkZpeE9yaWVudGF0aW9uICl7XG4gICAgICAgIHRoaXMuYXBwbHlFeGlmUm90YXRpb25zKHZhbGlkcylcbiAgICAgICAgLnRoZW4oIGZpeGVkRmlsZXM9PnRoaXMucXVlKGZpeGVkRmlsZXMpIClcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnF1ZSh2YWxpZHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNFbXB0eUFmdGVyU2VsZWN0aW9uKCkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJydcbiAgICB9XG4gIH1cblxuICBxdWUoIGZpbGVzOkZpbGVbXSApe1xuICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzIHx8IFtdXG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5maWxlcywgZmlsZXMpXG5cbiAgICAvL2JlbG93IGJyZWFrIG1lbW9yeSByZWYgYW5kIGRvZXNudCBhY3QgbGlrZSBhIHF1ZVxuICAgIC8vdGhpcy5maWxlcyA9IGZpbGVzLy9jYXVzZXMgbWVtb3J5IGNoYW5nZSB3aGljaCB0cmlnZ2VycyBiaW5kaW5ncyBsaWtlIDxuZ2ZGb3JtRGF0YSBbZmlsZXNdPVwiZmlsZXNcIj48L25nZkZvcm1EYXRhPlxuICAgIFxuICAgIHRoaXMuZmlsZXNDaGFuZ2UuZW1pdCggdGhpcy5maWxlcyApXG5cbiAgICBpZihmaWxlcy5sZW5ndGgpe1xuICAgICAgdGhpcy5maWxlQ2hhbmdlLmVtaXQoIHRoaXMuZmlsZT1maWxlc1swXSApXG5cbiAgICAgIGlmKHRoaXMubGFzdEJhc2VVcmxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCl7XG4gICAgICAgIGRhdGFVcmwoIGZpbGVzWzBdIClcbiAgICAgICAgLnRoZW4oIHVybD0+dGhpcy5sYXN0QmFzZVVybENoYW5nZS5lbWl0KHVybCkgKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vd2lsbCBiZSBjaGVja2VkIGZvciBpbnB1dCB2YWx1ZSBjbGVhcmluZ1xuICAgIHRoaXMubGFzdEZpbGVDb3VudCA9IHRoaXMuZmlsZXMubGVuZ3RoXG4gIH1cblxuICAvKiogY2FsbGVkIHdoZW4gaW5wdXQgaGFzIGZpbGVzICovXG4gIGNoYW5nZUZuKGV2ZW50OmFueSkge1xuICAgIHZhciBmaWxlTGlzdCA9IGV2ZW50Ll9fZmlsZXNfIHx8IChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmZpbGVzKVxuXG4gICAgaWYgKCFmaWxlTGlzdCkgcmV0dXJuO1xuXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZUxpc3QpXG4gIH1cblxuICBjbGlja0hhbmRsZXIoZXZ0OmFueSl7XG4gICAgY29uc3QgZWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWxtLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCB0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB2YXIgciA9IGRldGVjdFN3aXBlKGV2dCk7XG4gICAgLy8gcHJldmVudCB0aGUgY2xpY2sgaWYgaXQgaXMgYSBzd2lwZVxuICAgIGlmICggciE9PWZhbHNlICkgcmV0dXJuIHI7XG5cbiAgICBjb25zdCBmaWxlRWxtID0gdGhpcy5wYXJhbUZpbGVFbG0oKVxuICAgIGZpbGVFbG0uY2xpY2soKVxuICAgIC8vZmlsZUVsbS5kaXNwYXRjaEV2ZW50KCBuZXcgRXZlbnQoJ2NsaWNrJykgKTtcbiAgICB0aGlzLmJlZm9yZVNlbGVjdCgpXG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBiZWZvcmVTZWxlY3QoKXtcbiAgICBpZiggdGhpcy5maWxlcyAmJiB0aGlzLmxhc3RGaWxlQ291bnQ9PT10aGlzLmZpbGVzLmxlbmd0aCApcmV0dXJuXG5cbiAgICAvL2lmIG5vIGZpbGVzIGluIGFycmF5LCBiZSBzdXJlIGJyb3dzZXIgZG9lc250IHByZXZlbnQgcmVzZWxlY3Qgb2Ygc2FtZSBmaWxlIChzZWUgZ2l0aHViIGlzc3VlIDI3KVxuICAgIHRoaXMuZmlsZUVsbS52YWx1ZSA9IG51bGxcbiAgfVxuXG4gIGlzRW1wdHlBZnRlclNlbGVjdGlvbigpOmJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMubXVsdGlwbGU7XG4gIH1cblxuICBldmVudFRvVHJhbnNmZXIoZXZlbnQ6YW55KTphbnkge1xuICAgIGlmKGV2ZW50LmRhdGFUcmFuc2ZlcilyZXR1cm4gZXZlbnQuZGF0YVRyYW5zZmVyXG4gICAgcmV0dXJuICBldmVudC5vcmlnaW5hbEV2ZW50ID8gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgOiBudWxsXG4gIH1cblxuICBzdG9wRXZlbnQoZXZlbnQ6YW55KTphbnkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICB0cmFuc2Zlckhhc0ZpbGVzKHRyYW5zZmVyOmFueSk6YW55IHtcbiAgICBpZiAoIXRyYW5zZmVyLnR5cGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zZmVyLnR5cGVzLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zlci50eXBlcy5pbmRleE9mKCdGaWxlcycpICE9PSAtMTtcbiAgICB9IGVsc2UgaWYgKHRyYW5zZmVyLnR5cGVzLmNvbnRhaW5zKSB7XG4gICAgICByZXR1cm4gdHJhbnNmZXIudHlwZXMuY29udGFpbnMoJ0ZpbGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBldmVudFRvRmlsZXMoZXZlbnQ6RXZlbnQpe1xuICAgIGNvbnN0IHRyYW5zZmVyID0gdGhpcy5ldmVudFRvVHJhbnNmZXIoZXZlbnQpO1xuICAgIGlmKCB0cmFuc2ZlciApe1xuICAgICAgaWYodHJhbnNmZXIuZmlsZXMgJiYgdHJhbnNmZXIuZmlsZXMubGVuZ3RoKXtcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVyLmZpbGVzXG4gICAgICB9XG4gICAgICBpZih0cmFuc2Zlci5pdGVtcyAmJiB0cmFuc2Zlci5pdGVtcy5sZW5ndGgpe1xuICAgICAgICByZXR1cm4gdHJhbnNmZXIuaXRlbXNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBhcHBseUV4aWZSb3RhdGlvbnMoXG4gICAgZmlsZXM6RmlsZVtdXG4gICk6UHJvbWlzZTxGaWxlW10+e1xuICAgIGNvbnN0IG1hcHBlciA9IChcbiAgICAgIGZpbGU6RmlsZSxpbmRleDpudW1iZXJcbiAgICApOlByb21pc2U8YW55Pj0+e1xuICAgICAgcmV0dXJuIGFwcGx5RXhpZlJvdGF0aW9uKGZpbGUpXG4gICAgICAudGhlbiggZml4ZWRGaWxlPT5maWxlcy5zcGxpY2UoaW5kZXgsIDEsIGZpeGVkRmlsZSkgKVxuICAgIH1cblxuICAgIGNvbnN0IHByb21zOlByb21pc2U8YW55PltdID0gW11cbiAgICBmb3IobGV0IHg9ZmlsZXMubGVuZ3RoLTE7IHggPj0gMDsgLS14KXtcbiAgICAgIHByb21zW3hdID0gbWFwcGVyKCBmaWxlc1t4XSwgeCApXG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbCggcHJvbXMgKS50aGVuKCAoKT0+ZmlsZXMgKVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25DaGFuZ2UoZXZlbnQ6RXZlbnQpOnZvaWQge1xuICAgIGxldCBmaWxlcyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpbGVzIHx8IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxuXG4gICAgaWYoIWZpbGVzLmxlbmd0aClyZXR1cm5cblxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKVxuICB9XG5cbiAgZ2V0RmlsZUZpbHRlckZhaWxOYW1lKFxuICAgIGZpbGU6RmlsZVxuICApOnN0cmluZyB8IHVuZGVmaW5lZHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKCAhdGhpcy5maWx0ZXJzW2ldLmZuLmNhbGwodGhpcywgZmlsZSkgKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyc1tpXS5uYW1lXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGlzRmlsZVZhbGlkKGZpbGU6RmlsZSk6Ym9vbGVhbntcbiAgICBjb25zdCBub0ZpbHRlcnMgPSAhdGhpcy5hY2NlcHQgJiYgKCF0aGlzLmZpbHRlcnMgfHwgIXRoaXMuZmlsdGVycy5sZW5ndGgpXG4gICAgaWYoIG5vRmlsdGVycyApe1xuICAgICAgcmV0dXJuIHRydWUvL3dlIGhhdmUgbm8gZmlsdGVycyBzbyBhbGwgZmlsZXMgYXJlIHZhbGlkXG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0aGlzLmdldEZpbGVGaWx0ZXJGYWlsTmFtZShmaWxlKSA/IGZhbHNlIDogdHJ1ZVxuICB9XG5cbiAgaXNGaWxlc1ZhbGlkKGZpbGVzOkZpbGVbXSl7XG4gICAgZm9yKGxldCB4PWZpbGVzLmxlbmd0aC0xOyB4ID49IDA7IC0teCl7XG4gICAgICBpZiggIXRoaXMuaXNGaWxlVmFsaWQoZmlsZXNbeF0pICl7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIFxuICBwcm90ZWN0ZWQgX2FjY2VwdEZpbHRlcihpdGVtOkZpbGUpOmJvb2xlYW4ge1xuICAgIHJldHVybiBhY2NlcHRUeXBlKHRoaXMuYWNjZXB0LCBpdGVtLnR5cGUsIGl0ZW0ubmFtZSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmlsZVNpemVGaWx0ZXIoaXRlbTpGaWxlKTpib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLm1heFNpemUgJiYgaXRlbS5zaXplID4gdGhpcy5tYXhTaXplKTtcbiAgfVxuXG4gIC8qKiBicm93c2VycyB0cnkgaGFyZCB0byBjb25jZWFsIGRhdGEgYWJvdXQgZmlsZSBkcmFncywgdGhpcyB0ZW5kcyB0byB1bmRvIHRoYXQgKi9cbiAgZmlsZXNUb1dyaXRlYWJsZU9iamVjdCggZmlsZXM6RmlsZVtdICk6ZHJhZ01ldGFbXXtcbiAgICBjb25zdCBqc29uRmlsZXM6ZHJhZ01ldGFbXSA9IFtdXG4gICAgZm9yKGxldCB4PTA7IHggPCBmaWxlcy5sZW5ndGg7ICsreCl7XG4gICAgICBqc29uRmlsZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ZmlsZXNbeF0udHlwZSxcbiAgICAgICAga2luZDpmaWxlc1t4XVtcImtpbmRcIl1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBqc29uRmlsZXNcbiAgfVxufVxuIl19