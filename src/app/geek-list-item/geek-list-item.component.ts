import { Component, OnInit, Input } from '@angular/core';
import { GeekListItem } from '../geek-list-item';

@Component({
  selector: 'app-geek-list-item',
  templateUrl: './geek-list-item.component.html',
  styleUrls: ['./geek-list-item.component.css']
})
export class GeekListItemComponent implements OnInit {

  @Input() item: GeekListItem;

  constructor() { }

  ngOnInit() {
  }

}
