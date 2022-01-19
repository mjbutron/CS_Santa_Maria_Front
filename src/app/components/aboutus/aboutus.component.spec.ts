import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { AboutusComponent } from './aboutus.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

describe('Service Component', () => {
  let component: AboutusComponent;
  let injector: TestBed;
  let service: DataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);

    component = new AboutusComponent(service);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get about us', () => {
    const dummyData =
    {
      "cod": "200",
      "allAboutUs": [
        {
          "id": 5,
          "name": "Nombre",
          "surname1": "Apellidos",
          "surname2": "Apellidos 2",
          "image": "default-avatar.png",
          "position": "Dummy",
          "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molesti. Tuto commodo.",
          "academic_degree": "Dummy",
          "user_fcbk": "https://www.facebook.com/centrosanitariosantamaria/",
          "user_ytube": "",
          "user_insta": "",
          "create_date": "2021-05-05 20:43:45",
          "update_date": "2021-09-15 20:34:20",
          "user_id": 1
        },
        {
          "id": 7,
          "name": "Marcos",
          "surname1": "Butrón",
          "surname2": "Pérez",
          "image": "default-avatar.png",
          "position": "Dummy",
          "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molesti.",
          "academic_degree": "Dummy",
          "user_fcbk": "https://www.facebook.com/centrosanitariosantamaria/",
          "user_ytube": "https://www.youtube.com/cssantamaria",
          "user_insta": "",
          "create_date": "2021-05-29 21:44:27",
          "update_date": "2021-09-13 21:05:31",
          "user_id": 1
        },
        {
          "id": 8,
          "name": "Dummy",
          "surname1": "Dummy",
          "surname2": "Dummy",
          "image": "default_image.jpg",
          "position": "Dummy",
          "description": "Dummy",
          "academic_degree": "",
          "user_fcbk": "",
          "user_ytube": "",
          "user_insta": "",
          "create_date": "2021-10-25 18:34:18",
          "update_date": "2021-10-25 20:05:15",
          "user_id": 1
        }
      ]
    };

    const spy = spyOn(service, 'getAllAboutUs').and.returnValue(of(dummyData));

    component.getAboutUs();

    expect(component.aboutusList).toEqual(dummyData.allAboutUs);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting all about us', () => {
    const dummyData =
    {
      "cod": "503",
      "allAboutUs": []
    };

    const spy = spyOn(service, 'getAllAboutUs').and.returnValue(of(dummyData));

    component.getAboutUs();

    expect(component.isLoaded).toBeTruthy();
  });
});
