import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

import { WorkshopComponent } from './workshop.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

class fakeRouter {
  navigate(params) { };
  navigateByUrl(params) { };
}

describe('Workshop Component', () => {
  let component: WorkshopComponent;
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

    component = new WorkshopComponent(service, router);

  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get all active workshop', () => {
    const dummyData =
    {
      "cod": "200",
      "allWorkshops": [
        {
          "id": 35,
          "active": 1,
          "home": 1,
          "title": "Preparación al parto y ayuda con los primeros pasos",
          "short_description": "",
          "description": "<p>Información del taller de preparación al parto.</p>",
          "image": "default_image.jpg",
          "subtitle": "",
          "price": 20,
          "address": "",
          "session_date": "0000-00-00",
          "session_start": "00:00:00",
          "session_end": "00:00:00",
          "hours": 2,
          "places": 10,
          "free_places": 5,
          "new_workshop": 1,
          "impart": "Matronas",
          "create_date": "2021-08-21 13:10:50",
          "update_date": "2021-10-27 20:21:41",
          "user_id": 1
        },
        {
          "id": 38,
          "active": 1,
          "home": 1,
          "title": "Porteo bebe",
          "short_description": "Transporte del bebe..",
          "description": "<h3 class=\"fancy\">Transporte del bebe</h3><hr><p class=\"fancy\">Porteo del bebe.</p><p><img class=\"image_resized\" style=\"width:37.27%;\" src=\"https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/porteo_1.jpg\"></p>",
          "image": "default_image.jpg",
          "subtitle": "",
          "price": 10,
          "address": "Calle Aurora, 18",
          "session_date": "2021-08-31",
          "session_start": "11:00:00",
          "session_end": "12:00:00",
          "hours": 1,
          "places": 5,
          "free_places": 5,
          "new_workshop": 1,
          "impart": "Matronas",
          "create_date": "2021-08-21 13:13:17",
          "update_date": "2021-11-16 21:20:18",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getAllActiveWorkshops').and.returnValue(of(dummyData));

    component.getWorkshops();

    expect(component.workshops).toEqual(dummyData.allWorkshops);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting all active workshop', () => {
    const dummyData =
    {
      "cod": "503",
      "workshop": []
    };

    const spy = spyOn(service, 'getAllActiveWorkshops').and.returnValue(of(dummyData));

    component.getWorkshops();
    expect(component.isLoaded).toBeTruthy();
  });

  it('Should navigate to workshop details', (done) => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onWorkshopDetail(35);

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/taller', 35]);
      done();
    });
  });

  it('Should navigate to inscription', (done) => {

    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.onInscription();

    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith('/contacto');
      done();
    });
  });
});
