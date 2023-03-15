import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Image } from '../../interfaces/image.interface';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent {
  @Input() images: Image[] = [];
  @Output() clicked: EventEmitter<Image> = new EventEmitter();

  imageById(_: number, image: Image): number {
    return image.id;
  }
}
