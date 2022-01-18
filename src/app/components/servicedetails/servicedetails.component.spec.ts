import { TestBed, getTestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { ServicedetailsComponent } from './servicedetails.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

class fakeRouter {
  navigateByUrl(params) { }
}

class fakeActivatedRouter {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('Service Details Component Unit', () => {
  let component: ServicedetailsComponent;
  let injector: TestBed;
  let service: DataApiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService,
        { provide: Router, useClass: fakeRouter },
        { provide: ActivatedRoute, useClass: fakeActivatedRouter }
      ],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);

    component = new ServicedetailsComponent(service, activatedRoute, router);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should retrieve the service id from the url', () => {
    const dummyData =
    {
      "cod": "200",
      "service": [
        {
          "id": 34,
          "active": 1,
          "title": "Acondicionamiento del suelo pélvico",
          "image": "default_image.jpg",
          "subtitle": "Dummy Subtitle",
          "description": "Dummy Description",
          "create_date": "2021-08-04 20:19:14",
          "update_date": "2021-09-20 20:22:24",
          "user_id": 1
        }
      ]
    };

    const actRouter: fakeActivatedRouter = TestBed.get(ActivatedRoute);
    actRouter.push({ id: 34 });

    expect(component.serviceId).toEqual(dummyData.service[0].id);
  });

  it('Should get service by ID', () => {
    const dummyData =
    {
      "cod": "200",
      "service": [
        {
          "id": 34,
          "active": 1,
          "title": "Acondicionamiento del suelo pélvico",
          "image": "default_image.jpg",
          "subtitle": "Dummy Subtitle",
          "description": "Dummy Description",
          "create_date": "2021-08-04 20:19:14",
          "update_date": "2021-09-20 20:22:24",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getServiceById').and.returnValue(of(dummyData));

    component.getDetailsService();

    expect(component.service.id).toEqual(dummyData.service[0].id);
    expect(component.isLoaded).toBeTruthy();
  });

  it('It should navigate if the service is not active', (done) => {
    const dummyData =
    {
      "cod": "200",
      "service": [
        {
          "id": 39,
          "active": 0,
          "title": "Control del crecimiento y peso saludable",
          "image": "default_image.jpg",
          "subtitle": "",
          "description": "Descripción del servicio",
          "create_date": "2021-08-04 20:19:14",
          "update_date": "2021-09-20 20:22:24",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getServiceById').and.returnValue(of(dummyData));
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.getDetailsService();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith('/servicios');
      done();
    });
  });

  it('Error getting service by ID', () => {
    const dummyData =
    {
      "cod": "503",
      "service": []
    };

    const spy = spyOn(service, 'getServiceById').and.returnValue(of(dummyData));

    component.getDetailsService();
    expect(component.isLoaded).toBeTruthy();
  });
});
