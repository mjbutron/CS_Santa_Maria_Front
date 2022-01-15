import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacypolicyComponent } from './privacypolicy.component';

describe('Privacy Policy Component', () => {
  let component: PrivacypolicyComponent;
  let fixture: ComponentFixture<PrivacypolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacypolicyComponent ]
    });
    fixture = TestBed.createComponent(PrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });
});
