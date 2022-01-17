import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { FooterComponent } from './footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

describe('Footer Component', () => {
  let component: FooterComponent;
  let injector: TestBed;
  let service: DataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);

    component = new FooterComponent(service);

  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.hasAdress).toBeFalsy();
    expect(component.hasEmail).toBeFalsy();
    expect(component.hasPhone).toBeFalsy();
    expect(component.hasSchedule).toBeFalsy();
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
          "home_second_ph": 999888555,
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

  it('Should get footer information (With social links)', () => {
    const dummyData =
    {
      "cod": "200",
      "footerInfo": [
        {
          "id": 1,
          "footer_address": "Calle Aurora 18, El Puerto de Santa María",
          "footer_email": "info@cssantamaria.es",
          "footer_ph": 666777888,
          "footer_schdl": "Lunes a viernes: 09:00 - 14:00 y 17:00 - 20:00.",
          "footer_social_links": 1
        }
      ]
    };

    const spy = spyOn(service, 'getInfoFooter').and.returnValue(of(dummyData));

    component.getFooterInfo();

    expect(component.informationObj.footer_address).toEqual(dummyData.footerInfo[0].footer_address);
    expect(component.informationObj.footer_email).toEqual(dummyData.footerInfo[0].footer_email);
    expect(component.informationObj.footer_ph).toEqual(dummyData.footerInfo[0].footer_ph);
    expect(component.informationObj.footer_schdl).toEqual(dummyData.footerInfo[0].footer_schdl);
    expect(component.showSocialLinks).toBeTruthy();
  });

  it('Should get footer information (Without social links)', () => {
    const dummyData =
    {
      "cod": "200",
      "footerInfo": [
        {
          "id": 1,
          "footer_address": "Calle Aurora 18, El Puerto de Santa María",
          "footer_email": "info@cssantamaria.es",
          "footer_ph": 666777888,
          "footer_schdl": "Lunes a viernes: 09:00 - 14:00 y 17:00 - 20:00.",
          "footer_social_links": 0
        }
      ]
    };

    const spy = spyOn(service, 'getInfoFooter').and.returnValue(of(dummyData));

    component.getFooterInfo();

    expect(component.informationObj.footer_address).toEqual(dummyData.footerInfo[0].footer_address);
    expect(component.informationObj.footer_email).toEqual(dummyData.footerInfo[0].footer_email);
    expect(component.informationObj.footer_ph).toEqual(dummyData.footerInfo[0].footer_ph);
    expect(component.informationObj.footer_schdl).toEqual(dummyData.footerInfo[0].footer_schdl);
    expect(component.showSocialLinks).toBeFalsy();
  });

  it('Should get footer information (Empty)', () => {
    const dummyData =
    {
      "cod": "200",
      "footerInfo": [
        {
          "id": 1,
          "footer_address": "",
          "footer_email": "",
          "footer_ph": null,
          "footer_schdl": "",
          "footer_social_links": 0
        }
      ]
    };

    const spy = spyOn(service, 'getInfoFooter').and.returnValue(of(dummyData));

    component.getFooterInfo();

    expect(component.informationObj.footer_address).toEqual(dummyData.footerInfo[0].footer_address);
    expect(component.informationObj.footer_email).toEqual(dummyData.footerInfo[0].footer_email);
    expect(component.informationObj.footer_ph).toEqual(dummyData.footerInfo[0].footer_ph);
    expect(component.informationObj.footer_schdl).toEqual(dummyData.footerInfo[0].footer_schdl);
    expect(component.showSocialLinks).toBeFalsy();
  });
});
