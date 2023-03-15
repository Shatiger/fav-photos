import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Image } from '../shared/interfaces/image.interface';
import { PhotosService } from '../shared/services/photos.service';
import { addToFavorites } from '../shared/utils/favorites';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnDestroy {
  photos: Image[] | undefined = undefined;
  photosSubscription: Subscription | undefined = undefined;
  isLastPage: boolean = false;

  constructor(
    private photosService: PhotosService,
    private snackBar: MatSnackBar,
  ) {}

  onLoad(): void {
    this.photosSubscription = this.photosService.getPhotos$(this.photos?.length).pipe(
      take(1),
    ).subscribe(imageList => {
      if (this.photos) {
        this.photos.push(...imageList.list);
      } else {
        this.photos = imageList.list;
      }
      this.isLastPage = imageList.isLastPage;
    });
  }

  onClick(image: Image): void {
    this.addToFavorites(image);
    this.snackBar.open('Image saved in favorites', 'OK', {
      duration: 3000,
    });
  }

  addToFavorites(image: Image): void {
    addToFavorites(image.id);
  }

  ngOnDestroy(): void {
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
    }
  }
}
