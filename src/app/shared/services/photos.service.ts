import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Image, ImageList } from '../interfaces/image.interface';
import { delay, tap } from 'rxjs/operators';
import { PAGE_ITEMS_COUNT, TOTAL_ITEMS_COUNT } from '../constants/photos';
import { randomResponseTime } from '../utils/random-response-time';

@Injectable()
export class PhotosService {
  constructor() { }

  getPhotos$(shift = 0): Observable<ImageList> {
    const isLastPage = shift + PAGE_ITEMS_COUNT >= TOTAL_ITEMS_COUNT;
    const length = isLastPage ? TOTAL_ITEMS_COUNT - shift : PAGE_ITEMS_COUNT;

    const arr = [...Array(length)].map((_, index) => {
      const id = index + shift;
      return {
        id,
        url: `/assets/images/${id}.jpg`,
      };
    });

    const source: Observable<ImageList> = of({
      shift,
      totalItems: TOTAL_ITEMS_COUNT,
      list: [...arr],
      isLastPage,
    });
    
    return source.pipe(
      delay(randomResponseTime()),
    );
  }

  getPhoto$(id: number): Observable<Image> {
    if (id > TOTAL_ITEMS_COUNT - 1) {
      return throwError(() => {
        return new Error('There is no such id');
      }).pipe(
        delay(randomResponseTime()),
      );
    }

    const source = of({
      id,
      url: `/assets/images/${id}.jpg`,
    })

    return source.pipe(
      delay(randomResponseTime()),
    );
  }
}
