import { Component } from '@angular/core';

//import { string as gettingStarted } from "./components/getting-started.template"
import { string as template } from "./components/app.template"

import {version} from 'angular-file/package.json'

declare var PR: any;

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  version:string = version
  //gettingStarted:string = gettingStarted;
  
  ngAfterViewInit(){
    setTimeout(()=>{
      if (typeof PR !== 'undefined') {
        // google code-prettify
        PR.prettyPrint();
      }
    }, 150);
  }
}
