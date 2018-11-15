import {Directive, ElementRef, HostBinding, HostListener, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[csScrollTop]'
})
export class ScrollTopDirective {
  private scrollThreshold = 150;
  @HostBinding('class') scrollTopBtn = 'scroll-top-btn';
  @HostListener('click') onClick() {
    window.scrollTo(0, 0);
  }
  @HostListener('document:scroll') onScroll() {
    let scrollPosition = window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop;
    if (scrollPosition > this.scrollThreshold) {
      this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'block'); //block to pokazac ten element
    } else {
      this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'none');
    }
  }
  constructor(private renderer: Renderer2,
              private hostElement: ElementRef,
              @Inject(DOCUMENT) private document) { }
// wstrzykujemy @Inject(DOCUMENT) a nie korzystamy z document
//  @Inject robimy dla typow prymitywnych
}
