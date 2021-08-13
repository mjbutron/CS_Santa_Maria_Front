import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { DataApiService } from 'src/app/services/data-api.service';

import { ContactInterface } from 'src/app/models/contact-interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Path
  pathBackEnd = environment.urlBackEnd;
  // Information
  informationObj: ContactInterface;
  // Contact Information
  hasContactInfo: boolean;
  hasAdress: boolean;
  hasEmail: boolean;
  hasPhone: boolean;
  hasSchedule: boolean;

  constructor(private dataApi: DataApiService) {
    this.informationObj = new ContactInterface();
  }

  ngOnInit() {
    this.hasAdress = false;
    this.hasEmail = false;
    this.hasPhone = false;
    this.hasSchedule = false;
    this.getFooterInfo();
  }

  getFooterInfo(){
    this.dataApi.getInfoFooter().subscribe((data) =>{
      if (200 == data.cod && 0 < data.footerInfo.length){
        for(let i = 0; i < data.footerInfo.length; i++){
          this.informationObj.footer_address = data.footerInfo[i].footer_address;
          this.informationObj.footer_email = data.footerInfo[i].footer_email;
          this.informationObj.footer_ph = data.footerInfo[i].footer_ph;
          this.informationObj.footer_schdl = data.footerInfo[i].footer_schdl;
        }
        this.checkContactInformation();
        // this.isLoaded = true;
      } else {
        // this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

  checkContactInformation(){
    this.hasContactInfo = true;
    if(this.informationObj.footer_address){
      this.hasAdress = true;
    }
    if(this.informationObj.footer_email){
      this.hasEmail = true;
    }
    if(this.informationObj.footer_ph){
      this.hasPhone = true;
    }
    if(this.informationObj.footer_schdl){
      this.hasSchedule = true;
    }
    if(!this.hasAdress && !this.hasEmail && !this.hasPhone && !this.hasSchedule){
      this.hasContactInfo = false;
    }
  }

}
