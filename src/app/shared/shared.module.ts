import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { LazyLoaderComponent } from './components/lazy-loader/lazy-loader.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    ImageListComponent,
    LazyLoaderComponent,
    ImageDetailComponent,
    IntersectionObserverDirective,
  ],
  exports: [
    HeaderComponent,
    ImageListComponent,
    LazyLoaderComponent,
    ImageDetailComponent,
  ]
})
export class SharedModule { }
