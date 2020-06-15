import { __decorate, __metadata } from "tslib";
import { Directive, Input } from "@angular/core";
import { ngf } from "./ngf.directive";
let ngfSelect = class ngfSelect extends ngf {
    constructor() {
        super(...arguments);
        this.selectable = true;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ngfSelect.prototype, "selectable", void 0);
ngfSelect = __decorate([
    Directive({
        selector: "[ngfSelect]",
        exportAs: "ngfSelect"
    })
], ngfSelect);
export { ngfSelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU2VsZWN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQU1yQyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsR0FBRztJQUFsQzs7UUFDVyxlQUFVLEdBQU8sSUFBSSxDQUFBO0lBQ2hDLENBQUM7Q0FBQSxDQUFBO0FBRFU7SUFBUixLQUFLLEVBQUU7OzZDQUFzQjtBQURuQixTQUFTO0lBSnJCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRSxXQUFXO0tBQ3RCLENBQUM7R0FDVyxTQUFTLENBRXJCO1NBRlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiXHJcbmltcG9ydCB7IG5nZiB9IGZyb20gXCIuL25nZi5kaXJlY3RpdmVcIlxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW25nZlNlbGVjdF1cIixcclxuICBleHBvcnRBczogXCJuZ2ZTZWxlY3RcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgbmdmU2VsZWN0IGV4dGVuZHMgbmdmIHtcclxuICBASW5wdXQoKSBzZWxlY3RhYmxlOmFueSA9IHRydWVcclxufSJdfQ==