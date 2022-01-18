import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ServicesComponent } from './services.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

class fakeRouter {
  navigate(params) { };
}

describe('Service Component', () => {
  let component: ServicesComponent;
  let injector: TestBed;
  let service: DataApiService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService,
        { provide: Router, useClass: fakeRouter }
      ],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);
    router = TestBed.get(Router);

    component = new ServicesComponent(service, router);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get all active service', () => {
    const dummyData =
    {
      "cod": "200",
      "allServices": [
        {
          "id": 34,
          "active": 1,
          "title": "Acondicionamiento del suelo pélvico",
          "image": "default_image.jpg",
          "subtitle": "",
          "description": "DummyDesc",
          "create_date": "2021-08-04 20:19:14",
          "update_date": "2021-09-20 20:22:24",
          "user_id": 1
        },
        {
          "id": 39,
          "active": 1,
          "title": "Control del crecimiento y peso saludable",
          "image": "default_image.jpg",
          "subtitle": "",
          "description": "DummyDesc",
          "create_date": "2021-08-04 20:19:14",
          "update_date": "2021-09-20 20:22:24",
          "user_id": 1
        },
        {
          "id": 33,
          "active": 1,
          "title": "Perforación de orejas sin dolor",
          "image": "default_image.jpg",
          "subtitle": "",
          "description": "DummyDesc",
          "create_date": "2021-08-04 20:15:15",
          "update_date": "2021-09-20 20:22:08",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getAllActiveServices').and.returnValue(of(dummyData));

    component.getServices();

    expect(component.services).toEqual(dummyData.allServices);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting all active service', () => {
    const dummyData =
    {
      "cod": "503",
      "allServices": []
    };

    const spy = spyOn(service, 'getAllActiveServices').and.returnValue(of(dummyData));

    component.getServices();

    expect(component.isLoaded).toBeTruthy();
  });

  it('Should navigate to service details', (done) => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onServiceDetail(34);

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/servicio', 34]);
      done();
    });
  });
});
