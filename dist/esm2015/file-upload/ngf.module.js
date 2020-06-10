import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ngfBackground } from './ngfBackground.directive';
import { ngfDrop } from './ngfDrop.directive';
import { ngf } from './ngf.directive';
import { ngfSelect } from './ngfSelect.directive';
import { ngfUploadStatus } from './ngfUploadStatus.directive';
import { ngfFormData } from './ngfFormData.directive';
import { ngfSrc } from './ngfSrc.directive';
//import{ HttpModule } from '@angular/http';
const declarations = [
    ngfDrop,
    ngfSelect,
    ngfBackground,
    ngfSrc,
    ngfUploadStatus,
    ngfFormData,
    ngf
];
let ngfModule = class ngfModule {
};
ngfModule = __decorate([
    NgModule({
        imports: [
            CommonModule
            //,HttpModule
        ],
        declarations: declarations,
        exports: declarations //[HttpModule, ...declarations]
    })
], ngfModule);
export { ngfModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1Qyw0Q0FBNEM7QUFFNUMsTUFBTSxZQUFZLEdBQUc7SUFDbkIsT0FBTztJQUNQLFNBQVM7SUFDVCxhQUFhO0lBQ2IsTUFBTTtJQUNOLGVBQWU7SUFDZixXQUFXO0lBQ1gsR0FBRztDQUNKLENBQUE7QUFTRSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0NBQUcsQ0FBQTtBQUFaLFNBQVM7SUFQeEIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGFBQWE7U0FDZDtRQUNELFlBQVksRUFBRSxZQUFZO1FBQzFCLE9BQU8sRUFBRSxZQUFZLENBQUEsK0JBQStCO0tBQ3JELENBQUM7R0FBYyxTQUFTLENBQUc7U0FBWixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IG5nZkJhY2tncm91bmQgfSBmcm9tICcuL25nZkJhY2tncm91bmQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmRHJvcCB9IGZyb20gJy4vbmdmRHJvcC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2YgfSBmcm9tICcuL25nZi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZTZWxlY3QgfSBmcm9tICcuL25nZlNlbGVjdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZVcGxvYWRTdGF0dXMgfSBmcm9tICcuL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZGb3JtRGF0YSB9IGZyb20gJy4vbmdmRm9ybURhdGEuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmU3JjIH0gZnJvbSAnLi9uZ2ZTcmMuZGlyZWN0aXZlJztcclxuLy9pbXBvcnR7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcclxuICBuZ2ZEcm9wLFxyXG4gIG5nZlNlbGVjdCxcclxuICBuZ2ZCYWNrZ3JvdW5kLFxyXG4gIG5nZlNyYyxcclxuICBuZ2ZVcGxvYWRTdGF0dXMsXHJcbiAgbmdmRm9ybURhdGEsXHJcbiAgbmdmXHJcbl1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgICAvLyxIdHRwTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucyxcclxuICBleHBvcnRzOiBkZWNsYXJhdGlvbnMvL1tIdHRwTW9kdWxlLCAuLi5kZWNsYXJhdGlvbnNdXHJcbn0pIGV4cG9ydCBjbGFzcyBuZ2ZNb2R1bGUge30iXX0=