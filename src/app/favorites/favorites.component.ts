import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from '../shared/interfaces/image.interface';
import { FavoritesService } from '../shared/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  photos$: Observable<Image[]>;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
  ) {
    this.photos$ = this.favoritesService.getFavorites$();
  }

  onClick(image: Image): void {
    this.router.navigateByUrl(`/photos/${image.id}`);
  }
}
