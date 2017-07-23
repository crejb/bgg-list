import { Component, OnInit, forwardRef } from '@angular/core';
import { FilterFieldComponentBase } from '../filter-field-component-base';
import { PlayerCountFilter } from './player-count-filter';

@Component({
  selector: 'app-geek-list-player-count-filter',
  templateUrl: './player-count-filter.component.html',
  styleUrls: ['./player-count-filter.component.css'],
  providers: [{provide: FilterFieldComponentBase, useExisting: forwardRef(() => PlayerCountFilterComponent)}],
})
export class PlayerCountFilterComponent extends FilterFieldComponentBase implements OnInit {

  constructor() {
    super(new PlayerCountFilter());
  }

  ngOnInit() {
    console.log('player count filter component is:' + this.itemFilter);
  }

}
