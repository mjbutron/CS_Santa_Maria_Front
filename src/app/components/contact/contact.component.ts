import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

import { DataApiService } from 'src/app/services/data-api.service';

import { ContactInterface } from 'src/app/models/contact-interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Coordinates
  lat = 0.0;
  lon = 0.0;
  // Information
  informationObj: ContactInterface;
  formatEmails: string;
  // request
  infoRequest = {
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
    acceptRGPD: false
  };
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService, public toastr: ToastrService) {
    this.informationObj = new ContactInterface();
    this.formatEmails = "";
  }

  ngOnInit() {
    this.isLoaded = false;
    this.getContactInfo();
  }

  getContactInfo(){
    this.dataApi.getInfoContact().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod && 0 < data.contactInfo.length){
        for(let i = 0; i < data.contactInfo.length; i++){
          this.informationObj.cnt_address = data.contactInfo[i].cnt_address;
          this.informationObj.cnt_ph_appo = data.contactInfo[i].cnt_ph_appo;
          this.informationObj.cnt_emails = data.contactInfo[i].cnt_emails;
          this.informationObj.cnt_ph_mwives = data.contactInfo[i].cnt_ph_mwives;
          this.informationObj.cnt_ph_physio = data.contactInfo[i].cnt_ph_physio;
          this.informationObj.cnt_lat = data.contactInfo[i].cnt_lat;
          this.informationObj.cnt_lon = data.contactInfo[i].cnt_lon;
        }
        this.lat = +this.informationObj.cnt_lat;
        this.lon = +this.informationObj.cnt_lon;
        if(this.informationObj.cnt_emails){
          this.checkEmails(this.informationObj.cnt_emails);
        }
        this.isLoaded = true;
      } else {
        this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

  checkEmails(dataEmails: string){
    var splitted = dataEmails.split(";");
    for (var email of splitted) {
      this.formatEmails += email + "<br>";
    }

  }

  onSubmit(form: NgForm){
    this.isLoaded = false;
    if(form.invalid){
      this.isLoaded = true;
      return;
    }
    this.dataApi.sendEmailContact(this.infoRequest).subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        form.resetForm();
        this.isLoaded = true;
        this.toastr.success("Responderemos a su solicitud lo antes posible.", "¡Solicitud enviada!", {
          progressBar: true,
          positionClass: 'toast-top-full-width'
        });
      }
      else{
        this.isLoaded = true;
        this.toastr.error("No se ha podido enviar su solicitud. Por favor, intentelo de nuevo mas tarde.", "¡Error!", {
          progressBar: true,
          positionClass: 'toast-top-full-width'
        });
      }
    });
  }

}
