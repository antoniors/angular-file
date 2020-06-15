import { __decorate, __extends, __metadata } from "tslib";
import { Directive, Input } from "@angular/core";
import { ngf } from "./ngf.directive";
var ngfSelect = /** @class */ (function (_super) {
    __extends(ngfSelect, _super);
    function ngfSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectable = true;
        return _this;
    }
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
    return ngfSelect;
}(ngf));
export { ngfSelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU2VsZWN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQU1yQztJQUErQiw2QkFBRztJQUFsQztRQUFBLHFFQUVDO1FBRFUsZ0JBQVUsR0FBTyxJQUFJLENBQUE7O0lBQ2hDLENBQUM7SUFEVTtRQUFSLEtBQUssRUFBRTs7aURBQXNCO0lBRG5CLFNBQVM7UUFKckIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLFdBQVc7U0FDdEIsQ0FBQztPQUNXLFNBQVMsQ0FFckI7SUFBRCxnQkFBQztDQUFBLEFBRkQsQ0FBK0IsR0FBRyxHQUVqQztTQUZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgbmdmIH0gZnJvbSBcIi4vbmdmLmRpcmVjdGl2ZVwiXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJbbmdmU2VsZWN0XVwiLFxuICBleHBvcnRBczogXCJuZ2ZTZWxlY3RcIlxufSlcbmV4cG9ydCBjbGFzcyBuZ2ZTZWxlY3QgZXh0ZW5kcyBuZ2Yge1xuICBASW5wdXQoKSBzZWxlY3RhYmxlOmFueSA9IHRydWVcbn0iXX0=