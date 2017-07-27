import { Component, OnInit, forwardRef } from '@angular/core';
import { ListItemFilter } from '../list-item-filter';
import { TextFilter } from './text-filter';
import { GeekListService } from '../../geek-list.service';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-geek-list-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.css']
})
export class TextFilterComponent implements OnInit {

  public filterText: string;
  private textStream : Rx.BehaviorSubject<string>;

  constructor(private listService: GeekListService) {

  }

  ngOnInit() {
    this.textStream = new Rx.BehaviorSubject<string>('');

    let filterStream = this.textStream
      .debounceTime(500)
      .map(s => new TextFilter(s));
    this.listService.registerFilter('text', filterStream);
  }

  filterTextChanged(){
    this.textStream.next(this.filterText);
  }

  filterTextCleared(){
    this.filterText = '';
    this.filterTextChanged();
  }

}
