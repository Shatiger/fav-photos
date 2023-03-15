import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lazy-loader',
  templateUrl: './lazy-loader.component.html',
  styleUrls: ['./lazy-loader.component.scss'],
})
export class LazyLoaderComponent {
  @Output() intersected = new EventEmitter<void>();
}
