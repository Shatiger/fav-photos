import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective {
  private observer: IntersectionObserver;

  @Output() intersection = new EventEmitter<void>();

  constructor(private element: ElementRef) {
    this.observer = new IntersectionObserver(this.callback);
    this.observer.observe(this.element.nativeElement);
  }

  private callback: IntersectionObserverCallback = (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach(() => {
        this.intersection.emit();
      });
}
