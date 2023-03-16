import { Component, Input } from '@angular/core';
import { Image } from '../../interfaces/image.interface';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent {
  @Input() image?: Image;
}
