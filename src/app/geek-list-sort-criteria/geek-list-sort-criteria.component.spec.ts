import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekListSortCriteriaComponent } from './geek-list-sort-criteria.component';

describe('GeekListSortCriteriaComponent', () => {
  let component: GeekListSortCriteriaComponent;
  let fixture: ComponentFixture<GeekListSortCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekListSortCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekListSortCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
