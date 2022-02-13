import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { AboutusComponent } from './aboutus.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

describe('About Us Component', () => {
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
          "name": "Dummy Name",
          "surname1": "Dummy Surname",
          "surname2": "Dummy Surname 2",
          "image": "default-avatar.png",
          "position": "Dummy position",
          "description": "Dummy description",
          "academic_degree": "Dummy",
          "user_fcbk": "https://www.facebook.com/",
          "user_ytube": "",
          "user_insta": "",
          "create_date": "2021-05-05 20:43:45",
          "update_date": "2021-09-15 20:34:20"
        },
        {
          "id": 7,
          "name": "Dummy Name",
          "surname1": "Dummy Surname",
          "surname2": "Dummy Surname 2",
          "image": "default-avatar.png",
          "position": "Dummy",
          "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
          "academic_degree": "Dummy",
          "user_fcbk": "https://www.facebook.com/",
          "user_ytube": "https://www.youtube.com/",
          "user_insta": "",
          "create_date": "2021-05-29 21:44:27",
          "update_date": "2021-09-13 21:05:31"
        },
        {
          "id": 8,
          "name": "Dummy Name",
          "surname1": "Dummy Surname",
          "surname2": "Dummy Surname 2",
          "image": "default_image.jpg",
          "position": "Dummy",
          "description": "Dummy",
          "academic_degree": "",
          "user_fcbk": "",
          "user_ytube": "",
          "user_insta": "",
          "create_date": "2021-10-25 18:34:18",
          "update_date": "2021-10-25 20:05:15"
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
