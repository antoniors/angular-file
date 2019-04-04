import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';

@Directive({ selector: '[ngfBackground]' })
export class ngfSrc {
  @Input('ngfSrc') file: any

  constructor(public ElementRef: ElementRef) { }

  ngOnChanges(changes: any) {
    dataUrl(this.file)
      .then((src: any) => {
        if (!this.isElementHtmlAllowed())
          return;

        this.ElementRef.nativeElement.src = src;
      })
  }

  private isElementHtmlAllowed(): boolean {
    return this.ElementRef.nativeElement.tagName.match(/^(AUDIO|EMBED|IFRAME|IMG|INPUT|SCRIPT|SOURCE|TRACK|VIDEO)$/) != null;
  }
}
