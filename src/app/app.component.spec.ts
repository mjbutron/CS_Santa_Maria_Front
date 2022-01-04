import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockNavbarComponent,
        MockRouterOutletComponent,
        MockFooterComponent
      ],
    }).compileComponents();
  }));

  const app = new AppComponent();

  it('Create an instance', () => {
    expect(app).toBeTruthy();
  });

});

@Component({ selector: 'app-navbar', template: '' })
class MockNavbarComponent { }

@Component({selector: 'router-outlet', template: ''})
class MockRouterOutletComponent {
}

@Component({selector: 'app-footer', template: ''})
class MockFooterComponent {
}
