"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fileTools_1 = require("./fileTools");
var ngfSrc = (function () {
    function ngfSrc(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngfSrc.prototype.ngOnChanges = function (changes) {
        var _this = this;
        fileTools_1.dataUrl(this.file)
            .then(function (src) {
            return _this.ElementRef.nativeElement.src = src;
        });
    };
    ngfSrc.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngfSrc]' },] },
    ];
    /** @nocollapse */
    ngfSrc.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ngfSrc.propDecorators = {
        "file": [{ type: core_1.Input, args: ['ngfSrc',] },],
    };
    return ngfSrc;
}());
exports.ngfSrc = ngfSrc;
