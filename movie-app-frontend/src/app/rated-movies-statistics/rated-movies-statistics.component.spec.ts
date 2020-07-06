import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedMoviesStatisticsComponent } from './rated-movies-statistics.component';

describe('RatedMoviesStatisticsComponent', () => {
  let component: RatedMoviesStatisticsComponent;
  let fixture: ComponentFixture<RatedMoviesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedMoviesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedMoviesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
