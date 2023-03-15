import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Image } from '../interfaces/image.interface';
import { getFavorites } from '../utils/favorites';
import { randomResponseTime } from '../utils/random-response-time';

@Injectable()
export class FavoritesService {
  getFavorites$(): Observable<Image[]> {
    const ids = getFavorites();
    const source = of(ids.map(id => ({
      id,
      url: `/assets/images/${id}.jpg`,
    })));

    return source.pipe(delay(randomResponseTime()));
  }
}
