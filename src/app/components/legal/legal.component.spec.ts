// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { LegalComponent } from './legal.component';

describe('Legal Component', () => {
  // let component: LegalComponent;
  // let fixture: ComponentFixture<LegalComponent>;

  const component = new LegalComponent();

  it('create an instance', () => {
    expect(component).toBeTruthy();
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LegalComponent ]
  //   });
  //   fixture = TestBed.createComponent(LegalComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
});
