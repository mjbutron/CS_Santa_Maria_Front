import { TestBed, getTestBed } from '@angular/core/testing';
import { TestRequest, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';
import { delay, mergeMap, catchError, retry, retryWhen, shareReplay } from 'rxjs/operators';

import { DataApiService } from './data-api.service';

describe('Data Api Service', () => {
  let injector: TestBed;
  let service: DataApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataApiService]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('Should get headers options', () => {
    const res = service.getHeadersOptions();
    expect(typeof res.headers.get('Content-type')).toBe('string');
  });

  // Slider
  describe('Slider', () => {
    it('Should get all sliders', () => {
      const dummyData = [
        {
          "id": 2,
          "title": "Método BLW",
          "description": "Alimentación con método BLW",
          "image": "10022020-5e41941e6e5c3-blw.jpg",
          "color_text": "#FFFFFF",
          "order_slider": "1",
          "create_date": "2019-09-23 20:59:12",
          "update_date": "2021-08-12 12:11:43",
          "user_id": "1"
        },
        {
          "id": 1,
          "title": "Masaje Prenatal",
          "description": "Masajes prenatales para mejorar el bienestar del bebe y la mama.",
          "image": "29012020-5e31bfb60f405-massagePrenatal.jpg",
          "color_text": "#0095a6",
          "order_slider": "2",
          "create_date": "2019-09-23 20:59:12",
          "update_date": "2021-12-21 10:31:01",
          "user_id": "1"
        },
        {
          "id": 3,
          "title": "Talleres",
          "description": "Realizamos diferentes talleres. ¡Apuntate!",
          "image": "29012020-5e31c016237ae-prenatal-massage.jpg",
          "color_text": "#FFFFFF",
          "order_slider": "3",
          "create_date": "2019-09-23 20:59:45",
          "update_date": "2021-12-21 10:31:01",
          "user_id": "1"
        }
      ];

      service.getAllSlider().subscribe(data => {
        expect(data.length).toBeGreaterThan(0);
        expect(data).toEqual(dummyData);
      });

      const req = httpMock.expectOne(`${service.url}/api/allSlider`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyData);
    });
  });

  // Home information
  describe('Home Information', () => {
    it('Should get home information', () => {
      const dummyData = [
        {
          "id": 1,
          "home_first_ph": "666777888",
          "home_second_ph": "999888555",
          "home_fcbk": "https://es-es.facebook.com/",
          "home_ytube": "https://www.youtube.es",
          "home_insta": "https://www.instagram.es"
        }
      ];

      service.getInfoHome().subscribe(data => {
        expect(data.length).toBeGreaterThan(0);
        expect(data).toEqual(dummyData);
      });

      const req = httpMock.expectOne(`${service.url}/api/home/info`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyData);
    });
});

// Footer information
describe('Footer Information', () => {
  it('Should get footer information', () => {
    const dummyData = [
      {
        "id": 1,
        "footer_address": "Calle Aurora 18, El Puerto de Santa María",
        "footer_email": "info@cssantamaria.es",
        "footer_ph": "666777888",
        "footer_schdl": "Lunes a viernes: 09:00 - 14:00 y 17:00 - 20:00.",
        "footer_social_links": "1"
      }
    ];

    service.getInfoFooter().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/footer/info`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Contact information
describe('Contact Information', () => {
  it('Should get contact information', () => {
    const dummyData = [
      {
        "id": 1,
        "cnt_address": "Calle Aurora 18, El Puerto de Santa María",
        "cnt_ph_appo": "999555111",
        "cnt_emails": "info@cssantamaria.es;solicitud@cssantamaria.es",
        "cnt_ph_mwives": "888777444",
        "cnt_ph_physio": "999888444",
        "cnt_lat": "36.59193918122772",
        "cnt_lon": "-6.229819476603375"
      }
    ];

    service.getInfoContact().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/contact/info`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Workshop information
describe('Workshop Information', () => {
  it('Should get all workshop information', () => {
    const dummyData = [
      {
        "id": 35,
        "active": "1",
        "home": "1",
        "title": "Preparación al parto y ayuda con los primeros pasos",
        "short_description": "",
        "description": "<p>Información del taller de preparación al parto.</p>",
        "image": "default_image.jpg",
        "subtitle": "",
        "price": null,
        "address": "Dummy Address",
        "session_date": "0000-00-00",
        "session_start": "00:00:00",
        "session_end": "00:00:00",
        "hours": "2",
        "places": "10",
        "free_places": "5",
        "new_workshop": "1",
        "impart": "Matronas",
        "create_date": "2021-08-21 13:10:50",
        "update_date": "2021-10-27 20:21:41",
        "user_id": "1"
      },
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
      },
      {
        "id": 38,
        "active": "1",
        "home": "1",
        "title": "Porteo bebe",
        "short_description": "Transporte del bebe..",
        "description": "<h3 class=\"fancy\">Transporte del bebe</h3><hr><p class=\"fancy\">Porteo del bebe.</p><p><img class=\"image_resized\" style=\"width:37.27%;\" src=\"https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/porteo_1.jpg\"></p>",
        "image": "default_image.jpg",
        "subtitle": "",
        "price": "0",
        "address": "Calle Aurora, 18",
        "session_date": "2021-08-31",
        "session_start": "11:00:00",
        "session_end": "12:00:00",
        "hours": "1",
        "places": "5",
        "free_places": "5",
        "new_workshop": "1",
        "impart": "Matronas",
        "create_date": "2021-08-21 13:13:17",
        "update_date": "2021-11-16 21:20:18",
        "user_id": "1"
      }
    ];

    service.getAllWorkshops().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/allWorkshops`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get all active workshops', () => {
    const dummyData = [
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
      },
      {
        "id": 38,
        "active": "1",
        "home": "1",
        "title": "Porteo bebe",
        "short_description": "Transporte del bebe..",
        "description": "<h3 class=\"fancy\">Transporte del bebe</h3><hr><p class=\"fancy\">Porteo del bebe.</p><p><img class=\"image_resized\" style=\"width:37.27%;\" src=\"https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/porteo_1.jpg\"></p>",
        "image": "default_image.jpg",
        "subtitle": "",
        "price": "0",
        "address": "Calle Aurora, 18",
        "session_date": "2021-08-31",
        "session_start": "11:00:00",
        "session_end": "12:00:00",
        "hours": "1",
        "places": "5",
        "free_places": "5",
        "new_workshop": "1",
        "impart": "Matronas",
        "create_date": "2021-08-21 13:13:17",
        "update_date": "2021-11-16 21:20:18",
        "user_id": "1"
      }
    ];

    service.getAllActiveWorkshops().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/activeWorkshops`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get workshop by ID', () => {
    const dummyData = [
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
    ];

    service.getWorkshopById(36).subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toEqual(36);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/workshop/36`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Opinions information
describe('Opinions Information', () => {
  it('Should get opinions information', () => {
    const dummyData = [
      {
        "id": 18,
        "home": "0",
        "image": "default-avatar.png",
        "name": "Dumy Name",
        "commentary": "<p>Comment</p>",
        "rating": "1",
        "create_date": "2021-08-14 14:59:34",
        "update_date": "2021-10-27 19:12:05",
        "user_id": "1"
      },
      {
        "id": 17,
        "home": "1",
        "image": "default-avatar.png",
        "name": "Dumy Name",
        "commentary": "<p><i>Lorem ipsum dolor sit amet</i>, consectetur adipiscing elit. Cras ac eleifend nibh. Integer eget ipsum nisl. Cras laoreet porttitor ipsum. Sed sit amet semper nisi. Nullam euismod neque neque, vitae lobortis eros posuere faucibus. In ultricies condimentum auctor. Fusce placerat cursus quam quis dignissim. Integer nec tincidunt ex. Phasellus in elit mi. Aenean at risus vel arcu fringilla laoreet porttitor in leo. Cras in dolor quis turpis lacinia rhoncus. Ut vestibulum, ligula at finibus vestibulum, elit mauris convallis sapien, dictum dignissim leo justo at urna.</p>",
        "rating": "3",
        "create_date": "2021-08-05 18:27:38",
        "update_date": "2021-10-09 13:29:53",
        "user_id": "1"
      },
      {
        "id": 16,
        "home": "1",
        "image": "06052021-609422ad8a7b3-perfil-avatar.jpg",
        "name": "Dumy Name",
        "commentary": "<p><strong>Crask</strong> ac eleifend nibh. Integer eget ipsum nisl. Cras laoreet porttitor ipsum. Sed sit amet semper nisi. Nullam euismod neque neque, vitae lobortis eros posuere faucibus. In ultricies condimentum auctor. Fusce placerat cursus dignissim. Integer nec tincidunt ex.</p>",
        "rating": "3",
        "create_date": "2021-05-06 19:09:01",
        "update_date": "2021-10-09 12:32:51",
        "user_id": "1"
      },
    ];

    service.getAllOpinions().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/allOpinion`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Courses information
describe('Courses Information', () => {
  it('Should get all courses information', () => {
    const dummyData = [
      {
        "id": 8,
        "active": "0",
        "title": "Preparación al parto.",
        "short_description": "",
        "description": "<p>Descripción del nuevo curso.</p>",
        "image": "default_image.jpg",
        "new_course": "0",
        "offer": "1",
        "address": "Dirección ",
        "session_date": "2021-08-07",
        "session_start": "18:00:00",
        "session_end": "19:00:00",
        "sessions": "1",
        "hours": "1",
        "impart": "Matrona",
        "places": "10",
        "free_places": "0",
        "price": "30",
        "create_date": "2021-03-30 20:39:30",
        "update_date": "2021-10-27 19:00:58",
        "user_id": "1"
      },
      {
        "id": 12,
        "active": "1",
        "title": "Curso 2",
        "short_description": "Dummy Short",
        "description": "Dummy description",
        "image": "default_image.jpg",
        "new_course": "1",
        "offer": "1",
        "address": "Dirección del curso",
        "session_date": "2021-12-24",
        "session_start": "11:00:00",
        "session_end": "12:00:00",
        "sessions": "1",
        "hours": "1",
        "impart": "Matrona",
        "places": "10",
        "free_places": "0",
        "price": "0",
        "create_date": "2021-08-04 20:36:13",
        "update_date": "2021-12-23 14:45:33",
        "user_id": "1"
      }
    ];

    service.getAllCourses().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/courses`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get all active courses', () => {
    const dummyData = [
      {
        "id": 15,
        "active": "1",
        "title": "Curso",
        "short_description": "Dummy description",
        "description": "<h3 class=\"fancy\">Titulo Ultimo Curso.</h3><hr><p class=\"fancy\">Toda la información del ultimo curso estructurado según el operador.</p>",
        "image": "19102021-616f075b7c59c-taller.png",
        "new_course": "1",
        "offer": "0",
        "address": "",
        "session_date": "0000-00-00",
        "session_start": "00:00:00",
        "session_end": "00:00:00",
        "sessions": "1",
        "hours": "2",
        "impart": "",
        "places": "10",
        "free_places": "5",
        "price": "20",
        "create_date": "2021-10-19 19:58:51",
        "update_date": "2021-12-17 12:10:54",
        "user_id": "1"
      },
      {
        "id": 12,
        "active": "1",
        "title": "Curso 2",
        "short_description": "",
        "description": "Dummy Description",
        "image": "default_image.jpg",
        "new_course": "1",
        "offer": "1",
        "address": "Dirección del curso",
        "session_date": "2021-12-24",
        "session_start": "11:00:00",
        "session_end": "12:00:00",
        "sessions": "1",
        "hours": "1",
        "impart": "Matrona",
        "places": "10",
        "free_places": "0",
        "price": "0",
        "create_date": "2021-08-04 20:36:13",
        "update_date": "2021-12-23 14:45:33",
        "user_id": "1"
      }
    ];

    service.getAllActiveCourses().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/activeCourses`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get course by ID', () => {
    const dummyData = [
      {
        "id": 11,
        "active": "1",
        "title": "Título del curso",
        "short_description": "Subtitulo del curso.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nunc lorem, maximus non eleifend ut, cursus nec dolor. Donec tristique congue sapien, a blandit purus sodales sit amet. Integer semper tincidunt leo, sit amet suscipit sem semper non. Morbi nec tempus nibh. Curabitur vestibulum vestibulum purus, ac maximus neque tempor et. Proin ipsum risus, laoreet quis feugiat et, tincidunt in tortor. Proin fringilla at neque vel iaculis. Cras eget fermentum felis. Donec posuere feugiat elementum. Curabitur in dui sed lectus lobortis porta id eget est. Proin sit amet ante quis mi sollicitudin imperdiet sed at ligula. Quisque et ipsum et ipsum commodo faucibus sit amet at velit. Morbi ornare quam neque, eu scelerisque mauris pellentesque in. Donec tincidunt nibh quis posuere tempor.",
        "image": "21082021-6120e04a58fe5-imgCourse.jpg",
        "new_course": "1",
        "offer": "0",
        "address": "",
        "session_date": "2021-10-19",
        "session_start": "00:00:00",
        "session_end": "00:00:00",
        "sessions": null,
        "hours": null,
        "impart": "",
        "places": "5",
        "free_places": "3",
        "price": "15",
        "create_date": "2021-08-04 20:33:12",
        "update_date": "2021-11-16 20:26:39",
        "user_id": "1"
      }
    ];

    service.getCourseById(11).subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toEqual(11);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/course/11`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// AboutUs information
describe('AboutUs Information', () => {
  it('Should get about us information', () => {
    const dummyData = [
      {
        "id": 5,
        "name": "Dumy Name",
        "surname1": "Dumy Surname",
        "surname2": "Dumy Surname 2",
        "image": "default-avatar.png",
        "position": "Dumy Position",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molesti. Tuto commodo.",
        "academic_degree": "Dumy",
        "user_fcbk": "https://www.facebook.com/",
        "user_ytube": "",
        "user_insta": "",
        "create_date": "2021-05-05 20:43:45",
        "update_date": "2021-09-15 20:34:20",
        "user_id": "1"
      },
      {
        "id": 7,
        "name": "Dummy Name",
        "surname1": "Dummy Surname",
        "surname2": "Dummy Surname 2",
        "image": "default-avatar.png",
        "position": "Dumy Position",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molesti.",
        "academic_degree": "Dumy",
        "user_fcbk": "https://www.facebook.com/",
        "user_ytube": "https://www.youtube.com/",
        "user_insta": "",
        "create_date": "2021-05-29 21:44:27",
        "update_date": "2021-09-13 21:05:31",
        "user_id": "1"
      }
    ];

    service.getAllAboutUs().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/allAboutUs`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Service information
describe('Services Information', () => {
  it('Should get all services information', () => {
    const dummyData = [
      {
        "id": 30,
        "active": "1",
        "title": "Valoración y tratamiento",
        "image": "default_image.jpg",
        "subtitle": "Seguramente hayas escuchado hablar de las famosas correas.",
        "description": "Si tu bebé nace con el frenillo lingual corto (anquiloglosia) puede (o no) tener dificultad durante la lactancia como succión ineficaz, mala transferencia de leche, puede provocarte dolor en el pecho durante el amamantamiento por mal agarre, grietas, mastitis de repetición… A medida que tu bebé crece el frenillo lingual corto puede ocasionar problemas de mala oclusión dental, dificultad a la hora de pronunciar algunas letras, problemas de respiración… Esto no significa que un bebé con anquiloglosia vaya a sufrir todas estas dificultades, puede sufrir alguna o ninguna porque nunca sabemos, a priori, qué dificultades puede causar un frenillo lingual corto hasta que las dificultades se manifiestan. En caso de que fuera necesario, la intervención más habitual para intervenir la anquiloglosias.\r\n",
        "create_date": "2021-09-07 19:10:47",
        "update_date": "2021-10-19 20:58:07",
        "user_id": "1"
      },
      {
        "id": 34,
        "active": "0",
        "title": "Acondicionamiento del suelo pélvico",
        "image": "default_image.jpg",
        "subtitle": "Dummy Subtitle",
        "description": "Dummy Description",
        "create_date": "2021-08-04 20:19:14",
        "update_date": "2021-09-20 20:22:24",
        "user_id": "1"
      },
      {
        "id": 39,
        "active": "1",
        "title": "Control del crecimiento y peso saludable",
        "image": "default_image.jpg",
        "subtitle": "",
        "description": "Descripción del servicio",
        "create_date": "2021-08-04 20:19:14",
        "update_date": "2021-09-20 20:22:24",
        "user_id": "1"
      }
    ];

    service.getAllServices().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/allServices`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get all active services', () => {
    const dummyData = [
      {
        "id": 30,
        "active": "1",
        "title": "Valoración y tratamiento del frenillo lingual",
        "image": "default_image.jpg",
        "subtitle": "Seguramente hayas escuchado hablar de las famosas “correas”asda sdas dasd asd asd asdasd as asdd sdasdds a asasd cas assdads.",
        "description": "Si tu bebé nace con el frenillo lingual corto (anquiloglosia) puede (o no) tener dificultad durante la lactancia como succión ineficaz, mala transferencia de leche, puede provocarte dolor en el pecho durante el amamantamiento por mal agarre, grietas, mastitis de repetición… A medida que tu bebé crece el frenillo lingual corto puede ocasionar problemas de mala oclusión dental, dificultad a la hora de pronunciar algunas letras, problemas de respiración… Esto no significa que un bebé con anquiloglosia vaya a sufrir todas estas dificultades, puede sufrir alguna o ninguna porque nunca sabemos, a priori, qué dificultades puede causar un frenillo lingual corto hasta que las dificultades se manifiestan. En caso de que fuera necesario, la intervención más habitual para intervenir la anquiloglosias.\r\n",
        "create_date": "2021-09-07 19:10:47",
        "update_date": "2021-10-19 20:58:07",
        "user_id": "1"
      },
      {
        "id": 39,
        "active": "1",
        "title": "Control del crecimiento y peso saludable",
        "image": "default_image.jpg",
        "subtitle": "",
        "description": "Descripción del servicio",
        "create_date": "2021-08-04 20:19:14",
        "update_date": "2021-09-20 20:22:24",
        "user_id": "1"
      }
    ];

    service.getAllActiveServices().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/activeServices`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('Should get service by ID', () => {
    const dummyData = [
      {
        "id": 34,
        "active": "1",
        "title": "Acondicionamiento del suelo pélvico",
        "image": "default_image.jpg",
        "subtitle": "",
        "description": "desc",
        "create_date": "2021-08-04 20:19:14",
        "update_date": "2021-09-20 20:22:24",
        "user_id": "1"
      }
    ];

    service.getServiceById(34).subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toEqual(34);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/service/34`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
});

// Send Email
describe('Send Email', () => {
  it('Should be send email', () => {
    const dummyData = [
      {
        "cod": 200,
        "message": "Email enviado"
      }
    ];

    const dummyRequest = {
      name: "DummyName",
      surname: "DummySurname",
      email: "dummyemail@email.com",
      subject: "DummySubject",
      message: "DummyMessage",
      acceptRGPD: false
    };

    service.sendEmailContact(dummyRequest).subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.url}/api/sendEmail`);
    expect(req.request.method).toBe("POST");
    req.flush(dummyData);
  });
});
});
