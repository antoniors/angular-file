import { IterableDiffer, IterableDiffers, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ngfFormData {
    files: File[];
    postName: string;
    fileName: string;
    FormData: FormData;
    FormDataChange: EventEmitter<FormData>;
    differ: IterableDiffer<{}>;
    constructor(IterableDiffers: IterableDiffers);
    ngDoCheck(): void;
    buildFormData(): void;
    static ɵfac: i0.ɵɵFactoryDef<ngfFormData, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ngfFormData, "ngfFormData", never, { "files": "files"; "postName": "postName"; "fileName": "fileName"; "FormData": "FormData"; }, { "FormDataChange": "FormDataChange"; }, never>;
}
