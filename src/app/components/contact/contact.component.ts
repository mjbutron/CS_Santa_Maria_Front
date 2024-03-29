import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
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
  // Request
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
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * constructor
   * @param dataApi  Data API Object
   * @param toastr   Toastr service
   */
  constructor(private dataApi: DataApiService, public toastr: ToastrService) {
    this.informationObj = new ContactInterface();
    this.formatEmails = "";
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getContactInfo();
  }

  /**
   * Get contact information
   * @return Object filled with contact information
   */
  getContactInfo() {
    this.dataApi.getInfoContact().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod && 0 < data.contactInfo.length) {
        this.informationObj = data.contactInfo[0];
        this.lat = +this.informationObj.cnt_lat;
        this.lon = +this.informationObj.cnt_lon;
        /* istanbul ignore else */
        if (this.informationObj.cnt_emails) {
          this.checkEmails(this.informationObj.cnt_emails);
        }
        this.isLoaded = true;
      } else {
        this.isLoaded = true;
      }
    });
  }

  /**
   * Check if there are multiple emails
   * @param  dataEmails Emails stored in data base
   * @return            Email formatting
   */
  checkEmails(dataEmails: string) {
    var splitted = dataEmails.split(";");
    for (var email of splitted) {
      this.formatEmails += email + "<br>";
    }
  }

  /**
   * Sending the request
   * @param  form NgForm
   * @return      It informs if the request has been sent or not.
   */
  onSubmit(form: NgForm) {
    this.isLoaded = false;
    if (form.invalid) {
      this.isLoaded = true;
      return;
    }
    this.dataApi.sendEmailContact(this.infoRequest).subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        form.resetForm();
        this.infoRequest.name = "";
        this.infoRequest.surname = "";
        this.infoRequest.email = "";
        this.infoRequest.subject = "";
        this.infoRequest.message = "";
        this.infoRequest.acceptRGPD = false;
        this.isLoaded = true;
        this.toastr.success(globalsConstants.K_CONTACT_RESP_REQUEST_STR, globalsConstants.K_CONTACT_SUCCESS_REQUEST_STR, {
          progressBar: true,
          positionClass: 'toast-top-full-width'
        });
      }
      else {
        this.isLoaded = true;
        this.toastr.error(globalsConstants.K_CONTACT_ERROR_REQUEST_STR, globalsConstants.K_ERROR_EXC_STR, {
          progressBar: true,
          positionClass: 'toast-top-full-width'
        });
      }
    });
  }
}
