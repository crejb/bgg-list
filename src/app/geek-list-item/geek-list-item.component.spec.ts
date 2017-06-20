import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekListItemComponent } from './geek-list-item.component';

describe('GeekListItemComponent', () => {
  let component: GeekListItemComponent;
  let fixture: ComponentFixture<GeekListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
