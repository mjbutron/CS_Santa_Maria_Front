import { TestBed, getTestBed } from '@angular/core/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NgForm, FormsModule, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ContactComponent } from './contact.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

describe('Contact Component', () => {
  let component: ContactComponent;
  let injector: TestBed;
  let service: DataApiService;
  let toast: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toast = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    TestBed.configureTestingModule({
      providers: [DataApiService,
        { provide: ToastrService, useValue: toast }
      ],
      imports: [FormsModule, HttpClientModule, ToastrModule.forRoot()]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);
    // toast = TestBed.get(ToastrService);

    component = new ContactComponent(service, toast);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get contact information', () => {
    const dummyData =
    {
      "cod": "200",
      "contactInfo": [
        {
          "id": 1,
          "cnt_address": "Calle Aurora 18, El Puerto de Santa María",
          "cnt_ph_appo": 999555111,
          "cnt_emails": "info@cssantamaria.es;solicitud@cssantamaria.es",
          "cnt_ph_mwives": 888777444,
          "cnt_ph_physio": 999888444,
          "cnt_lat": "36.59193918122772",
          "cnt_lon": "-6.229819476603375"
        }
      ]
    };

    const spy = spyOn(service, 'getInfoContact').and.returnValue(of(dummyData));

    component.getContactInfo();

    expect(component.informationObj).toEqual(dummyData.contactInfo[0]);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Error getting contact information', () => {
    const dummyData =
    {
      "cod": "503",
      "contactInfo": []
    };

    const spy = spyOn(service, 'getInfoContact').and.returnValue(of(dummyData));

    component.getContactInfo();

    expect(component.isLoaded).toBeTruthy();
  });

  it('Should send email', () => {
    const dummyData =
    {
      "cod": "200",
      "message": "Email enviado"
    };

    let validators: any[], asyncValidators: any[];
    let form = new NgForm(validators, asyncValidators);

    const spy = spyOn(service, 'sendEmailContact').and.returnValue(of(dummyData));

    component.onSubmit(form);

    expect(component.isLoaded).toBeTruthy();
    expect(toast.success).toHaveBeenCalledWith(
      'Responderemos a su solicitud lo antes posible.',
      '¡Solicitud enviada!', {
        progressBar: true,
        positionClass: 'toast-top-full-width'
      });
  });

  it('It shouldn\'t send email', () => {
    const dummyData =
    {
      "cod": "503",
      "message": "Failed to connect to mailserver"
    };

    let validators: any[], asyncValidators: any[];
    let form = new NgForm(validators, asyncValidators);

    const spy = spyOn(service, 'sendEmailContact').and.returnValue(of(dummyData));

    component.onSubmit(form);

    expect(component.isLoaded).toBeTruthy();
    expect(toast.error).toHaveBeenCalledWith(
      'No se ha podido enviar su solicitud. Por favor, intentelo de nuevo mas tarde.',
      '¡Error!', {
        progressBar: true,
        positionClass: 'toast-top-full-width'
      });
  });

  it('Invalid request', () => {
    const dummyData =
    {
      "cod": "200",
      "message": "Email enviado"
    };

    let validators: any[], asyncValidators: any[];
    let dummyForm = new NgForm(validators, asyncValidators);
    dummyForm.form.addControl('email', new FormControl('', Validators.required));
    dummyForm.form.controls['email'].setErrors({'incorrect': true});

    console.log(dummyForm);

    const spy = spyOn(service, 'sendEmailContact').and.returnValue(of(dummyData));

    component.onSubmit(dummyForm);

    expect(component.isLoaded).toBeTruthy();
  });
});
