import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

class fakeRouter {
  navigate(params) { };
}

describe('Home Component', () => {
  let component: HomeComponent;
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

    component = new HomeComponent(service, router);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get sliders', () => {
    const dummyData = {
      "cod": "200",
      "allSliders": [
        {
          "id": 2,
          "title": "Método BLW",
          "description": "Alimentación con método BLW",
          "image": "10022020-5e41941e6e5c3-blw.jpg",
          "color_text": "#FFFFFF",
          "order_slider": "1",
          "create_date": "2019-09-23 20:59:12",
          "update_date": "2021-08-12 12:11:43"
        },
        {
          "id": 1,
          "title": "Masaje Prenatal",
          "description": "Masajes prenatales para mejorar el bienestar del bebe y la mama.",
          "image": "29012020-5e31bfb60f405-massagePrenatal.jpg",
          "color_text": "#0095a6",
          "order_slider": "2",
          "create_date": "2019-09-23 20:59:12",
          "update_date": "2021-12-21 10:31:01"
        },
        {
          "id": 3,
          "title": "Talleres",
          "description": "Realizamos diferentes talleres. ¡Apuntate!",
          "image": "29012020-5e31c016237ae-prenatal-massage.jpg",
          "color_text": "#FFFFFF",
          "order_slider": "3",
          "create_date": "2019-09-23 20:59:45",
          "update_date": "2021-12-21 10:31:01"
        }
      ]
    };

    const spy = spyOn(service, 'getAllSlider').and.returnValue(of(dummyData));

    component.getSlider();

    expect(component.sliders).toEqual(dummyData.allSliders);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting sliders', () => {
    const dummyData =
    {
      "cod": "503",
      "allSliders": []
    };

    const spy = spyOn(service, 'getAllSlider').and.returnValue(of(dummyData));

    component.getSlider();

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
          "update_date": "2021-10-27 20:21:41"
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
          "update_date": "2021-11-16 21:20:18"
        }
      ]
    };

    const spy = spyOn(service, 'getAllWorkshops').and.returnValue(of(dummyData));

    component.getAllWorkshops();

    expect(component.wspInHome).toEqual(dummyData.allWorkshops);
  });

  it('Should navigate to workshop details', (done) => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onWorkshopDetail(35);

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/taller', 35]);
      done();
    });
  });
});
