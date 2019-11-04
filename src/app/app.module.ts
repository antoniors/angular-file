import { CommonModule } from '@angular/common';
import { NgModule, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ngfModule } from 'angular-file';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileUploadSectionComponent } from './components/file-upload-section';
import { SimpleDemoComponent } from './components/file-upload/simple-demo.component';

@Pipe({name: 'safeHtml'}) export class SafeHtml {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(input) {
    return this.domSanitizer.bypassSecurityTrustHtml(input)
  }
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ngfModule,
    TabsModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    SafeHtml,
    AppComponent,
    FileUploadSectionComponent,
    SimpleDemoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
