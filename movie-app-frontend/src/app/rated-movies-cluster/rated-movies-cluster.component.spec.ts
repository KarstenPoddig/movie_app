import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedMoviesClusterComponent } from './rated-movies-cluster.component';

describe('RatedMoviesClusterComponent', () => {
  let component: RatedMoviesClusterComponent;
  let fixture: ComponentFixture<RatedMoviesClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedMoviesClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedMoviesClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
