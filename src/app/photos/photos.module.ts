import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhotosComponent, PhotoComponent],
  exports: [PhotosComponent, PhotoComponent],
})
export class PhotosModule { }
