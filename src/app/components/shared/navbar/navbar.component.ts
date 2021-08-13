import { Component, OnInit } from '@angular/core';

import { DataApiService } from 'src/app/services/data-api.service';

import { ContactInterface } from 'src/app/models/contact-interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Navbar
  public navbarOpen = false;
  // Information
  informationObj: ContactInterface;
  // Phones information
  hasPhones: boolean;
  phonesStr: string;
  // Social links
  hasSocialLinks: boolean;
  hasFbk: boolean;
  hasYtb: boolean;
  hasItg: boolean;

  constructor(private dataApi: DataApiService) {
    this.informationObj = new ContactInterface();
  }

  ngOnInit() {
    this.phonesStr = " Contactanos: ";
    this.hasFbk = false;
    this.hasYtb = false;
    this.hasItg = false;
    this.getHomeInfo();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  getHomeInfo(){
    this.dataApi.getInfoHome().subscribe((data) =>{
      if (200 == data.cod && 0 < data.homeInfo.length){
        for(let i = 0; i < data.homeInfo.length; i++){
          this.informationObj.home_first_ph = data.homeInfo[i].home_first_ph;
          this.informationObj.home_second_ph = data.homeInfo[i].home_second_ph;
          this.informationObj.home_fcbk = data.homeInfo[i].home_fcbk;
          this.informationObj.home_ytube = data.homeInfo[i].home_ytube;
          this.informationObj.home_insta = data.homeInfo[i].home_insta;
        }
        this.checkPhones();
        this.checkSocialLinks();
        // this.isLoaded = true;
      } else{
        // this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

  checkPhones(){
    this.hasPhones = true;
    if((null != this.informationObj.home_first_ph) && (null != this.informationObj.home_second_ph)){
      this.phonesStr = this.phonesStr
      + this.formatPhones(this.informationObj.home_first_ph)
      + " | " + this.formatPhones(this.informationObj.home_second_ph);
    }
    else if((null != this.informationObj.home_first_ph) || (null != this.informationObj.home_second_ph)){
      this.phonesStr = this.phonesStr
      + this.formatPhones(this.informationObj.home_first_ph)
      + this.formatPhones(this.informationObj.home_second_ph);
    }
    else{
      this.hasPhones = false;
    }
  }

  checkSocialLinks(){
    this.hasSocialLinks = true;
    if(this.informationObj.home_fcbk){
      this.hasFbk = true;
    }
    if(this.informationObj.home_ytube){
      this.hasYtb = true;
    }
    if(this.informationObj.home_insta){
      this.hasItg = true;
    }
    if(!this.hasFbk && !this.hasYtb && !this.hasItg){
      this.hasSocialLinks = false;
    }
  }

// Format number - Crear pipe
  formatPhones(phone: number): string {
    if(null != phone){
      // Format
      var splitted = phone.toString().split('');
      return splitted[0]+splitted[1]+splitted[2]+" - "
      +splitted[3]+splitted[4]+splitted[5]+" - "
      +splitted[6]+splitted[7]+splitted[8];
    }
    else {
      return "";
    }
  }

}
