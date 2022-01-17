import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';
import { PhoneFormatPipe } from 'src/app/pipes/phone-format.pipe';

describe('Navbar Component', () => {
  let component: NavbarComponent;
  let injector: TestBed;
  let service: DataApiService;
  let pipe: PhoneFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);
    pipe = new PhoneFormatPipe();

    component = new NavbarComponent(service, pipe);

  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.phonesStr).toBe(" Contactanos: ");
    expect(component.hasFbk).toBeFalsy();
    expect(component.hasYtb).toBeFalsy();
    expect(component.hasItg).toBeFalsy();
  });

  it('Should get home information', () => {
    const dummyData =
    {
      "cod": "200",
      "homeInfo": [
        {
          "id": 1,
          "home_first_ph": 666777888,
          "home_second_ph": null,
          "home_fcbk": "https://es-es.facebook.com/",
          "home_ytube": "https://www.youtube.es",
          "home_insta": "https://www.instagram.es"
        }
      ]
    };

    const spy = spyOn(service, 'getInfoHome').and.returnValue(of(dummyData));

    component.getHomeInfo();

    expect(component.informationObj.home_first_ph).toEqual(dummyData.homeInfo[0].home_first_ph);
    expect(component.informationObj.home_second_ph).toEqual(dummyData.homeInfo[0].home_second_ph);
    expect(component.informationObj.home_fcbk).toEqual(dummyData.homeInfo[0].home_fcbk);
    expect(component.informationObj.home_ytube).toEqual(dummyData.homeInfo[0].home_ytube);
    expect(component.informationObj.home_insta).toEqual(dummyData.homeInfo[0].home_insta);
  });

  it('Should get home information without phones', () => {
    const dummyData =
    {
      "cod": "200",
      "homeInfo": [
        {
          "id": 1,
          "home_first_ph": null,
          "home_second_ph": null,
          "home_fcbk": "https://es-es.facebook.com/",
          "home_ytube": "https://www.youtube.es",
          "home_insta": "https://www.instagram.es"
        }
      ]
    };

    const spy = spyOn(service, 'getInfoHome').and.returnValue(of(dummyData));

    component.getHomeInfo();

    expect(component.informationObj.home_first_ph).toEqual(dummyData.homeInfo[0].home_first_ph);
    expect(component.informationObj.home_second_ph).toEqual(dummyData.homeInfo[0].home_second_ph);
    expect(component.informationObj.home_fcbk).toEqual(dummyData.homeInfo[0].home_fcbk);
    expect(component.informationObj.home_ytube).toEqual(dummyData.homeInfo[0].home_ytube);
    expect(component.informationObj.home_insta).toEqual(dummyData.homeInfo[0].home_insta);
  });

  it('Should get home information (Without social links)', () => {
    const dummyData =
    {
      "cod": "200",
      "homeInfo": [
        {
          "id": 1,
          "home_first_ph": 666777888,
          "home_second_ph": 999888555,
          "home_fcbk": "",
          "home_ytube": "",
          "home_insta": ""
        }
      ]
    };

    const spy = spyOn(service, 'getInfoHome').and.returnValue(of(dummyData));

    component.getHomeInfo();

    expect(component.informationObj.home_first_ph).toEqual(dummyData.homeInfo[0].home_first_ph);
    expect(component.informationObj.home_second_ph).toEqual(dummyData.homeInfo[0].home_second_ph);
    expect(component.informationObj.home_fcbk).toEqual(dummyData.homeInfo[0].home_fcbk);
    expect(component.informationObj.home_ytube).toEqual(dummyData.homeInfo[0].home_ytube);
    expect(component.informationObj.home_insta).toEqual(dummyData.homeInfo[0].home_insta);
  });

  it('Should toggle Navbar', () => {
    component.navbarOpen = false;
    component.toggleNavbar();
    
    expect(component.navbarOpen).toBeTruthy();
  });
});
