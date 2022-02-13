import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

import { CoursesComponent } from './courses.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

class fakeRouter {
  navigate(params) { };
  navigateByUrl(params) { };
}

describe('Course Component', () => {
  let component: CoursesComponent;
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

    component = new CoursesComponent(service, router);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get all active courses', () => {
    const dummyData =
    {
      "cod": "200",
      "allCourses": [
        {
          "id": 15,
          "active": 1,
          "title": "Curso Ult.",
          "short_description": "Dummy Short",
          "description": "<h3 class=\"fancy\">Titulo Ultimo Curso.</h3><hr><p class=\"fancy\">Toda la información del ultimo curso estructurado según el operador.</p>",
          "image": "19102021-616f075b7c59c-taller.png",
          "new_course": 1,
          "offer": 0,
          "address": "",
          "session_date": "0000-00-00",
          "session_start": "00:00:00",
          "session_end": "00:00:00",
          "sessions": 1,
          "hours": 2,
          "impart": "",
          "places": 10,
          "free_places": 5,
          "price": 20,
          "create_date": "2021-10-19 19:58:51",
          "update_date": "2021-12-17 12:10:54"
        },
        {
          "id": 11,
          "active": 1,
          "title": "Título del curso",
          "short_description": "Dummy Short",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nunc lorem, maximus non eleifend ut.",
          "image": "21082021-6120e04a58fe5-slider1.jpg",
          "new_course": 1,
          "offer": 0,
          "address": "",
          "session_date": "2021-10-19",
          "session_start": "00:00:00",
          "session_end": "00:00:00",
          "sessions": null,
          "hours": null,
          "impart": "",
          "places": 5,
          "free_places": 3,
          "price": 15,
          "create_date": "2021-08-04 20:33:12",
          "update_date": "2021-11-16 20:26:39"
        }
      ]
    };

    const spy = spyOn(service, 'getAllActiveCourses').and.returnValue(of(dummyData));

    component.getCourses();

    expect(component.courses).toEqual(dummyData.allCourses);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting all active courses', () => {
    const dummyData =
    {
      "cod": "503",
      "allCourses": []
    };

    const spy = spyOn(service, 'getAllActiveCourses').and.returnValue(of(dummyData));

    component.getCourses();

    expect(component.isLoaded).toBeTruthy();
  });

  it('Should navigate to workshop details', (done) => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onCourseDetail(15);

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/curso', 15]);
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
