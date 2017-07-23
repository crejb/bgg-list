import { Component, OnInit, forwardRef } from '@angular/core';
import { FilterFieldComponentBase } from '../filter-field-component-base';
import { ComplexityFilter } from './complexity-filter';

@Component({
  selector: 'app-geek-list-complexity-filter',
  templateUrl: './complexity-filter.component.html',
  styleUrls: ['./complexity-filter.component.css'],
  providers: [{provide: FilterFieldComponentBase, useExisting: forwardRef(() => ComplexityFilterComponent)}],
})
export class ComplexityFilterComponent extends FilterFieldComponentBase implements OnInit {

  constructor() {
    super(new ComplexityFilter());
  }

  ngOnInit() {
    console.log('complexity filter component is:' + this.itemFilter);
  }

}
