import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ngfUploadStatus {
    percent: number;
    percentChange: EventEmitter<number>;
    httpEvent: Event;
    ngOnChanges(changes: any): void;
    static ɵfac: i0.ɵɵFactoryDef<ngfUploadStatus, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ngfUploadStatus, "ngfUploadStatus", never, { "percent": "percent"; "httpEvent": "httpEvent"; }, { "percentChange": "percentChange"; }, never>;
}
