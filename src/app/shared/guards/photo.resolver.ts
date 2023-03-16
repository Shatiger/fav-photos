import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Image } from '../interfaces/image.interface';
import { PhotosService } from '../services/photos.service';

@Injectable()
export class PhotoResolver implements Resolve<Image | null> {
  constructor(private photosService: PhotosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image | null> {
    const id = route.params['id'];
    return this.photosService.getPhoto$(id).pipe(
      catchError(() => of(null)),
    );
  }
}
