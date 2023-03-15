import { Component } from '@angular/core';
import { HeaderItem } from '../../interfaces/header.interface';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() items: HeaderItem[] = [];
}
