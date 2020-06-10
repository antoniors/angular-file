import { EventEmitter } from '@angular/core';
import { ngf, dragMeta } from "./ngf.directive";
import * as i0 from "@angular/core";
export declare class ngfDrop extends ngf {
    fileOver: EventEmitter<any>;
    validDrag: boolean;
    validDragChange: EventEmitter<boolean>;
    invalidDrag: boolean;
    invalidDragChange: EventEmitter<boolean>;
    dragFiles: dragMeta[];
    dragFilesChange: EventEmitter<dragMeta[]>;
    onDrop(event: Event): void;
    handleFiles(files: File[]): void;
    onDragOver(event: Event): void;
    closeDrags(): void;
    onDragLeave(event: Event): any;
    static ɵfac: i0.ɵɵFactoryDef<ngfDrop, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ngfDrop, "[ngfDrop]", ["ngfDrop"], { "validDrag": "validDrag"; "invalidDrag": "invalidDrag"; "dragFiles": "dragFiles"; }, { "fileOver": "fileOver"; "validDragChange": "validDragChange"; "invalidDragChange": "invalidDragChange"; "dragFilesChange": "dragFilesChange"; }, never>;
}
