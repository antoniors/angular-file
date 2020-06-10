import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ngfBackground } from './ngfBackground.directive';
import { ngfDrop } from './ngfDrop.directive';
import { ngf } from './ngf.directive';
import { ngfSelect } from './ngfSelect.directive';
import { ngfUploadStatus } from './ngfUploadStatus.directive';
import { ngfFormData } from './ngfFormData.directive';
import { ngfSrc } from './ngfSrc.directive';
import * as i0 from "@angular/core";
//import{ HttpModule } from '@angular/http';
var declarations = [
    ngfDrop,
    ngfSelect,
    ngfBackground,
    ngfSrc,
    ngfUploadStatus,
    ngfFormData,
    ngf
];
var ngfModule = /** @class */ (function () {
    function ngfModule() {
    }
    ngfModule.ɵmod = i0.ɵɵdefineNgModule({ type: ngfModule });
    ngfModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ngfModule_Factory(t) { return new (t || ngfModule)(); }, imports: [[
                CommonModule
                //,HttpModule
            ]] });
    return ngfModule;
}());
export { ngfModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ngfModule, { declarations: [ngfDrop,
        ngfSelect,
        ngfBackground,
        ngfSrc,
        ngfUploadStatus,
        ngfFormData,
        ngf], imports: [CommonModule
        //,HttpModule
    ], exports: [ngfDrop,
        ngfSelect,
        ngfBackground,
        ngfSrc,
        ngfUploadStatus,
        ngfFormData,
        ngf] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                    //,HttpModule
                ],
                declarations: declarations,
                exports: declarations //[HttpModule, ...declarations]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUM1Qyw0Q0FBNEM7QUFFNUMsSUFBTSxZQUFZLEdBQUc7SUFDbkIsT0FBTztJQUNQLFNBQVM7SUFDVCxhQUFhO0lBQ2IsTUFBTTtJQUNOLGVBQWU7SUFDZixXQUFXO0lBQ1gsR0FBRztDQUNKLENBQUE7QUFFRDtJQUFBO0tBTzRCO2lEQUFaLFNBQVM7cUdBQVQsU0FBUyxrQkFOZDtnQkFDUCxZQUFZO2dCQUNaLGFBQWE7YUFDZDtvQkExQkg7Q0E2QjRCLEFBUDVCLElBTzRCO1NBQVosU0FBUzt3RkFBVCxTQUFTLG1CQWhCdkIsT0FBTztRQUNQLFNBQVM7UUFDVCxhQUFhO1FBQ2IsTUFBTTtRQUNOLGVBQWU7UUFDZixXQUFXO1FBQ1gsR0FBRyxhQUtELFlBQVk7UUFDWixhQUFhO2lCQVpmLE9BQU87UUFDUCxTQUFTO1FBQ1QsYUFBYTtRQUNiLE1BQU07UUFDTixlQUFlO1FBQ2YsV0FBVztRQUNYLEdBQUc7a0RBVVcsU0FBUztjQVB4QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtpQkFDZDtnQkFDRCxZQUFZLEVBQUUsWUFBWTtnQkFDMUIsT0FBTyxFQUFFLFlBQVksQ0FBQSwrQkFBK0I7YUFDckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgbmdmQmFja2dyb3VuZCB9IGZyb20gJy4vbmdmQmFja2dyb3VuZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZEcm9wIH0gZnJvbSAnLi9uZ2ZEcm9wLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZiB9IGZyb20gJy4vbmdmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZlNlbGVjdCB9IGZyb20gJy4vbmdmU2VsZWN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZlVwbG9hZFN0YXR1cyB9IGZyb20gJy4vbmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZkZvcm1EYXRhIH0gZnJvbSAnLi9uZ2ZGb3JtRGF0YS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZTcmMgfSBmcm9tICcuL25nZlNyYy5kaXJlY3RpdmUnO1xyXG4vL2ltcG9ydHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuY29uc3QgZGVjbGFyYXRpb25zID0gW1xyXG4gIG5nZkRyb3AsXHJcbiAgbmdmU2VsZWN0LFxyXG4gIG5nZkJhY2tncm91bmQsXHJcbiAgbmdmU3JjLFxyXG4gIG5nZlVwbG9hZFN0YXR1cyxcclxuICBuZ2ZGb3JtRGF0YSxcclxuICBuZ2ZcclxuXVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICAgIC8vLEh0dHBNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogZGVjbGFyYXRpb25zLFxyXG4gIGV4cG9ydHM6IGRlY2xhcmF0aW9ucy8vW0h0dHBNb2R1bGUsIC4uLmRlY2xhcmF0aW9uc11cclxufSkgZXhwb3J0IGNsYXNzIG5nZk1vZHVsZSB7fSJdfQ==