import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) {
  }

  @Output()
  public appClickOutside = new EventEmitter();

  @Output()
  public appClickBuy = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const buttonClicked = targetElement.nodeName;
    if (  (!clickedInside  && buttonClicked != 'I' && buttonClicked != 'BUTTON' && buttonClicked != 'SPAN') ||
          (buttonClicked == 'BUTTON' && targetElement.innerText.trim() == 'Login') || (buttonClicked == 'BUTTON' && targetElement.innerText.trim() == 'Sign in')) {
    this.appClickOutside.emit(null);
    }if(targetElement.classList.value.trim() == 'fa fa-cart-plus'){
      this.appClickBuy.emit(true);
    }
  }

}
