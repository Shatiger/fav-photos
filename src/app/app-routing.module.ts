import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoResolver } from './shared/guards/photo.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PhotosComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'photos',
        children: [
          {
            path: ':id',
            component: PhotoComponent,
            resolve: {
              photo: PhotoResolver,
            },
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/',
          },
        ],
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
