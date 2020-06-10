import { Directive, Input } from "@angular/core";
import { ngf } from "./ngf.directive";
import * as i0 from "@angular/core";
export class ngfSelect extends ngf {
    constructor() {
        super(...arguments);
        this.selectable = true;
    }
}
ngfSelect.ɵfac = function ngfSelect_Factory(t) { return ɵngfSelect_BaseFactory(t || ngfSelect); };
ngfSelect.ɵdir = i0.ɵɵdefineDirective({ type: ngfSelect, selectors: [["", "ngfSelect", ""]], inputs: { selectable: "selectable" }, exportAs: ["ngfSelect"], features: [i0.ɵɵInheritDefinitionFeature] });
const ɵngfSelect_BaseFactory = i0.ɵɵgetInheritedFactory(ngfSelect);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ngfSelect, [{
        type: Directive,
        args: [{
                selector: "[ngfSelect]",
                exportAs: "ngfSelect"
            }]
    }], null, { selectable: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU2VsZWN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFBOztBQU1yQyxNQUFNLE9BQU8sU0FBVSxTQUFRLEdBQUc7SUFKbEM7O1FBS1csZUFBVSxHQUFPLElBQUksQ0FBQTtLQUMvQjs7b0ZBRlksU0FBUzs4Q0FBVCxTQUFTO3dEQUFULFNBQVM7a0RBQVQsU0FBUztjQUpyQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2FBQ3RCOztrQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcclxuaW1wb3J0IHsgbmdmIH0gZnJvbSBcIi4vbmdmLmRpcmVjdGl2ZVwiXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbbmdmU2VsZWN0XVwiLFxyXG4gIGV4cG9ydEFzOiBcIm5nZlNlbGVjdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZTZWxlY3QgZXh0ZW5kcyBuZ2Yge1xyXG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6YW55ID0gdHJ1ZVxyXG59Il19