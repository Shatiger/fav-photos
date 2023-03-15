import { Component } from '@angular/core';
import { HeaderItem } from './shared/interfaces/header.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: HeaderItem[] = [
    {
      title: 'Photos',
      link: '/',
    },
    {
      title: 'Favorites',
      link: '/favorites',
    },
  ];
}
