import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { take } from 'rxjs';
import { removeFromFavorites } from 'src/app/shared/utils/favorites';
import { Image } from '../../shared/interfaces/image.interface';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  photo: Image | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((value: Data) => {
      this.photo = value['photo'];
    });
  }

  onRemove(photo: Image): void {
    removeFromFavorites(Number(photo.id));
    this.router.navigateByUrl('/favorites');
    this.snackBar.open('Image removed from favorites', 'OK', {
      duration: 3000,
    });
  }
}
