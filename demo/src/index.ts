import "zone.js"
import "reflect-metadata"
//import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { enableProdMode } from '@angular/core';
import { AppModule } from './app/';

/*if( window['env']=='production' ) {
  enableProdMode();
}*/

platformBrowserDynamic().bootstrapModule(AppModule);
