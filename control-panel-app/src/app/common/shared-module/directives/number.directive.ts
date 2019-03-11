import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[number]'
})

export class NumberDirective {
  /**
   * element ref
   */
  private el: HTMLInputElement;

  /**
   * pattern
   */
  pattern = '^[0-9]+$';

  /**
   * constructor
   */
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  /**
   * listener for key down event
   */
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 37 && event.keyCode !== 39 && !event.ctrlKey) {
      return new RegExp(this.pattern).test(event.key);
    }
  }
}
