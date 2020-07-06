import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityOfProfileComponent } from './quality-of-profile.component';

describe('QualityOfProfileComponent', () => {
  let component: QualityOfProfileComponent;
  let fixture: ComponentFixture<QualityOfProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityOfProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityOfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
