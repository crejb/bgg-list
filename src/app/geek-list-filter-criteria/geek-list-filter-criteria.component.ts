import { Component, OnInit, Input, ContentChild, ViewChild } from '@angular/core';
import { FilterFieldComponentBase } from './filter-field-component-base';
import { ListItemFilter } from './list-item-filter';

@Component({
  selector: 'app-geek-list-filter-criteria',
  templateUrl: './geek-list-filter-criteria.component.html',
  styleUrls: ['./geek-list-filter-criteria.component.css']
})
export class GeekListFilterCriteriaComponent implements OnInit {

  @ContentChild(FilterFieldComponentBase) child: FilterFieldComponentBase;

  @ViewChild('filterPopover') popover;

  @Input() filterName: string;
  filterText: string;

  constructor() {
  }

  ngOnInit() {
  }

  done($event): void {
    this.popover.toggle($event);
    console.log('Applying filter: ' + this.child.itemFilter.GetText());
    this.filterText = this.child.itemFilter.GetText();
  }

}
