import { TestBed, getTestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, Subject, of } from 'rxjs';

import { WorkshopdetailsComponent } from './workshopdetails.component';
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

describe('Workshop Details Component Unit', () => {
  let component: WorkshopdetailsComponent;
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

    component = new WorkshopdetailsComponent(service, activatedRoute, router);

  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate', (done) => {

    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.onInscription();

    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith('/contacto');
      done();
    });
  });

  it('Should retrieve the workshop id from the url', () => {
    const dummyData =
    {
      "cod": "200",
      "workshop": [
        {
          "id": 36,
          "active": "1",
          "home": "1",
          "title": "Porteo",
          "short_description": "Porteo del bebe.",
          "description": "Transporte del bebe.",
          "image": "default_image.jpg",
          "subtitle": "",
          "price": "50",
          "address": "Calle Aurora, 18",
          "session_date": "2021-08-31",
          "session_start": "11:00:00",
          "session_end": "12:00:00",
          "hours": "1",
          "places": "5",
          "free_places": "5",
          "new_workshop": "0",
          "impart": "Matronas",
          "create_date": "2021-08-21 13:13:17",
          "update_date": "2021-11-16 21:20:23",
          "user_id": "1"
        }
      ]
    };

    const actRouter: fakeActivatedRouter = TestBed.get(ActivatedRoute);
    actRouter.push({ id: 36 });

    expect(component.workshopId).toEqual(dummyData.workshop[0].id);
  });

  it('Should get workshop by ID', () => {
    const dummyData =
    {
      "cod": "200",
      "workshop": [
        {
          "id": 36,
          "active": "1",
          "home": "1",
          "title": "Porteo",
          "short_description": "Porteo del bebe.",
          "description": "Transporte del bebe.",
          "image": "default_image.jpg",
          "subtitle": "",
          "price": "50",
          "address": "Calle Aurora, 18",
          "session_date": "2021-08-31",
          "session_start": "11:00:00",
          "session_end": "12:00:00",
          "hours": "1",
          "places": "5",
          "free_places": "5",
          "new_workshop": "0",
          "impart": "Matronas",
          "create_date": "2021-08-21 13:13:17",
          "update_date": "2021-11-16 21:20:23",
          "user_id": "1"
        }
      ]
    };

    const spy = spyOn(service, 'getWorkshopById').and.returnValue(of(dummyData));

    component.getDetailsWorkshop();

    expect(component.workshop.id).toEqual(dummyData.workshop[0].id);
    expect(component.isLoaded).toBeTruthy();
  });

  it('It should navigate if the workshop is not active', (done) => {
    const dummyData =
    {
      "cod": "200",
      "workshop": [
        {
          "id": 88,
          "active": "0",
          "home": "1",
          "title": "Porteo",
          "short_description": "Porteo del bebe.",
          "description": "Transporte del bebe.",
          "image": "default_image.jpg",
          "subtitle": "",
          "price": "50",
          "address": "Calle Aurora, 18",
          "session_date": "2021-08-31",
          "session_start": "11:00:00",
          "session_end": "12:00:00",
          "hours": "1",
          "places": "5",
          "free_places": "5",
          "new_workshop": "0",
          "impart": "Matronas",
          "create_date": "2021-08-21 13:13:17",
          "update_date": "2021-11-16 21:20:23",
          "user_id": "1"
        }
      ]
    };

    const spy = spyOn(service, 'getWorkshopById').and.returnValue(of(dummyData));
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.getDetailsWorkshop();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith('/talleres');
      done();
    });
  });

  it('Error getting workshop by ID', () => {
    const dummyData =
    {
      "cod": "503",
      "workshop": []
    };

    const spy = spyOn(service, 'getWorkshopById').and.returnValue(of(dummyData));

    component.getDetailsWorkshop();
    expect(component.isLoaded).toBeTruthy();
  });
});
