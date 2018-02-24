import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchengineflightsComponent } from './searchengineflights.component';

describe('SearchengineflightsComponent', () => {
  let component: SearchengineflightsComponent;
  let fixture: ComponentFixture<SearchengineflightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchengineflightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchengineflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
