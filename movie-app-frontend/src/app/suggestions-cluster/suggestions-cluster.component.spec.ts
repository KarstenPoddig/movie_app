import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsClusterComponent } from './suggestions-cluster.component';

describe('SuggestionsClusterComponent', () => {
  let component: SuggestionsClusterComponent;
  let fixture: ComponentFixture<SuggestionsClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
