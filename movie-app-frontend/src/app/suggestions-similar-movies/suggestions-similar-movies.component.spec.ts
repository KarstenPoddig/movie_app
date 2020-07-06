import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsSimilarMoviesComponent } from './suggestions-similar-movies.component';

describe('SuggestionsSimilarMoviesComponent', () => {
  let component: SuggestionsSimilarMoviesComponent;
  let fixture: ComponentFixture<SuggestionsSimilarMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsSimilarMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsSimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
