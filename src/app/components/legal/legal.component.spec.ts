import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalComponent } from './legal.component';

describe('Legal Component', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalComponent ]
    });
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });
});
