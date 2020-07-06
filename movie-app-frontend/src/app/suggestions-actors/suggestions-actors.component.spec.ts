import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsActorsComponent } from './suggestions-actors.component';

describe('SuggestionsActorsComponent', () => {
  let component: SuggestionsActorsComponent;
  let fixture: ComponentFixture<SuggestionsActorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsActorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
