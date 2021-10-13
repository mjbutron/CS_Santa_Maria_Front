import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopdetailsComponent } from './workshopdetails.component';

describe('WorkshopdetailsComponent', () => {
  let component: WorkshopdetailsComponent;
  let fixture: ComponentFixture<WorkshopdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
