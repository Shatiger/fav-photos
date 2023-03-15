import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const source = of({
      id,
      url: `/assets/images/${id}.png`,
    })

    return source.pipe(
      delay(randomResponseTime()),
    );
  }
}
