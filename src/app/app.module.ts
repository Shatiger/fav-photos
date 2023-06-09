import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesModule } from './favorites/favorites.module';
import { PhotosModule } from './photos/photos.module';
import { PhotoResolver } from './shared/guards/photo.resolver';
import { FavoritesService } from './shared/services/favorites.service';
import { PhotosService } from './shared/services/photos.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhotosModule,
    FavoritesModule,
    SharedModule,
  ],
  providers: [
    PhotosService,
    FavoritesService,
    PhotoResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
