import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekListFilterCriteriaComponent } from './geek-list-filter-criteria.component';

describe('GeekListFilterCriteriaComponent', () => {
  let component: GeekListFilterCriteriaComponent;
  let fixture: ComponentFixture<GeekListFilterCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekListFilterCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekListFilterCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
