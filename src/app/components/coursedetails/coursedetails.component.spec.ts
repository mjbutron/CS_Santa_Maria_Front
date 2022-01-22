import { TestBed, getTestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, Subject, of } from 'rxjs';

import { CoursedetailsComponent } from './coursedetails.component';
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

describe('Course Details Component', () => {
  let component: CoursedetailsComponent;
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

    component = new CoursedetailsComponent(service, activatedRoute, router);
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

  it('Should retrieve the course id from the url', () => {
    const dummyData =
    {
      "cod": "200",
      "course": [
        {
          "id": 15,
          "active": 1,
          "title": "Curso",
          "short_description": "",
          "description": "<h3 class=\"fancy\">Titulo Ultimo Curso.</h3><hr><p class=\"fancy\">Toda la información del ultimo curso estructurado según el operador.</p>",
          "image": "19102021-616f075b7c59c-taller.png",
          "new_course": 1,
          "offer": 0,
          "address": "Dummy Address",
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
          "update_date": "2021-12-17 12:10:54",
          "user_id": 1
        }
      ]
    };

    const actRouter: fakeActivatedRouter = TestBed.get(ActivatedRoute);
    actRouter.push({ id: 15 });

    expect(component.courseId).toEqual(dummyData.course[0].id);
  });

  it('Should get course by ID', () => {
    const dummyData =
    {
      "cod": "200",
      "course": [
        {
          "id": 15,
          "active": 1,
          "title": "Curso",
          "short_description": "",
          "description": "<h3 class=\"fancy\">Titulo Ultimo Curso.</h3><hr><p class=\"fancy\">Toda la información del ultimo curso estructurado según el operador.</p>",
          "image": "19102021-616f075b7c59c-taller.png",
          "new_course": 1,
          "offer": 0,
          "address": "Dummy Address",
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
          "update_date": "2021-12-17 12:10:54",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getCourseById').and.returnValue(of(dummyData));

    component.getDetailsCourse();

    expect(component.course.id).toEqual(dummyData.course[0].id);
    expect(component.isLoaded).toBeTruthy();
  });

  it('It should navigate if the course is not active', (done) => {
    const dummyData =
    {
      "cod": "200",
      "course": [
        {
          "id": 15,
          "active": 0,
          "title": "Curso",
          "short_description": "",
          "description": "<h3 class=\"fancy\">Titulo Ultimo Curso.</h3><hr><p class=\"fancy\">Toda la información del ultimo curso estructurado según el operador.</p>",
          "image": "19102021-616f075b7c59c-taller.png",
          "new_course": 1,
          "offer": 0,
          "address": "Dummy Address",
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
          "update_date": "2021-12-17 12:10:54",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getCourseById').and.returnValue(of(dummyData));
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.getDetailsCourse();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith('/cursos');
      done();
    });
  });

  it('Error getting course by ID', () => {
    const dummyData =
    {
      "cod": "503",
      "course": []
    };

    const spy = spyOn(service, 'getCourseById').and.returnValue(of(dummyData));

    component.getDetailsCourse();
    expect(component.isLoaded).toBeTruthy();
  });
});
