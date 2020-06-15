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
    return ngfModule;
}());
export { ngfModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1Qyw0Q0FBNEM7QUFFNUMsSUFBTSxZQUFZLEdBQUc7SUFDbkIsT0FBTztJQUNQLFNBQVM7SUFDVCxhQUFhO0lBQ2IsTUFBTTtJQUNOLGVBQWU7SUFDZixXQUFXO0lBQ1gsR0FBRztDQUNKLENBQUE7QUFTRTtJQUFBO0lBQXdCLENBQUM7SUFBWixTQUFTO1FBUHhCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGFBQWE7YUFDZDtZQUNELFlBQVksRUFBRSxZQUFZO1lBQzFCLE9BQU8sRUFBRSxZQUFZLENBQUEsK0JBQStCO1NBQ3JELENBQUM7T0FBYyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO1NBQVosU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBuZ2ZCYWNrZ3JvdW5kIH0gZnJvbSAnLi9uZ2ZCYWNrZ3JvdW5kLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZkRyb3AgfSBmcm9tICcuL25nZkRyb3AuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmIH0gZnJvbSAnLi9uZ2YuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmU2VsZWN0IH0gZnJvbSAnLi9uZ2ZTZWxlY3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmVXBsb2FkU3RhdHVzIH0gZnJvbSAnLi9uZ2ZVcGxvYWRTdGF0dXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgbmdmRm9ybURhdGEgfSBmcm9tICcuL25nZkZvcm1EYXRhLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZlNyYyB9IGZyb20gJy4vbmdmU3JjLmRpcmVjdGl2ZSc7XHJcbi8vaW1wb3J0eyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbXHJcbiAgbmdmRHJvcCxcclxuICBuZ2ZTZWxlY3QsXHJcbiAgbmdmQmFja2dyb3VuZCxcclxuICBuZ2ZTcmMsXHJcbiAgbmdmVXBsb2FkU3RhdHVzLFxyXG4gIG5nZkZvcm1EYXRhLFxyXG4gIG5nZlxyXG5dXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gICAgLy8sSHR0cE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMsXHJcbiAgZXhwb3J0czogZGVjbGFyYXRpb25zLy9bSHR0cE1vZHVsZSwgLi4uZGVjbGFyYXRpb25zXVxyXG59KSBleHBvcnQgY2xhc3MgbmdmTW9kdWxlIHt9Il19