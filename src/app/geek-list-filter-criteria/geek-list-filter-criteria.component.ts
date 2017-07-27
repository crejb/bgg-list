import { Component, OnInit, Input, Output, ContentChild, ViewChild } from '@angular/core';
import { FilterFieldComponentBase } from './filter-field-component-base';
import { ListItemFilter } from './list-item-filter';
import { GeekListService } from '../geek-list.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-geek-list-filter-criteria',
  templateUrl: './geek-list-filter-criteria.component.html',
  styleUrls: ['./geek-list-filter-criteria.component.css']
})
export class GeekListFilterCriteriaComponent implements OnInit {

  @ContentChild(FilterFieldComponentBase) child: FilterFieldComponentBase;
  @ViewChild('filterPopover') popover;
  @Input() filterName: string;
  public filterText: string;
  private filterObservable : BehaviorSubject<ListItemFilter>;

  constructor(private geekListService : GeekListService) {
  }

  ngOnInit() {
    this.filterObservable = new BehaviorSubject<ListItemFilter>(this.child.itemFilter);
    this.geekListService.registerFilter(this.filterName, this.filterObservable);
  }

  done($event): void {
    this.popover.toggle($event);
    console.log('Applying filter: ' + this.child.itemFilter.GetText());
    this.filterText = this.child.itemFilter.GetText();
    this.filterObservable.next(this.child.itemFilter);
  }
}
