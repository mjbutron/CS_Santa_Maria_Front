import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { ContactInterface } from 'src/app/models/contact-interface';
// Pipes
import { PhoneFormatPipe } from 'src/app/pipes/phone-format.pipe';

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
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * Constructor
   * @param dataApi  Data API Object
   * @param pipe     Phone format pipe
   */
  constructor(private dataApi: DataApiService, private pipe: PhoneFormatPipe) {
    this.informationObj = new ContactInterface();
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.phonesStr = " Contactanos: ";
    this.hasFbk = false;
    this.hasYtb = false;
    this.hasItg = false;
    this.getHomeInfo();
  }

  /**
   * Toggle navigation bar
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  /**
   * Get Navbar information
   * @return Object filled with navigation bar information
   */
  getHomeInfo() {
    this.dataApi.getInfoHome().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod && 0 < data.homeInfo.length) {
        for (let i = 0; i < data.homeInfo.length; i++) {
          this.informationObj.home_first_ph = data.homeInfo[i].home_first_ph;
          this.informationObj.home_second_ph = data.homeInfo[i].home_second_ph;
          this.informationObj.home_fcbk = data.homeInfo[i].home_fcbk;
          this.informationObj.home_ytube = data.homeInfo[i].home_ytube;
          this.informationObj.home_insta = data.homeInfo[i].home_insta;
        }
        this.checkPhones();
        this.checkSocialLinks();
      }
    });
  }

  /**
   * Check phone settings
   * @return Phones must be displayed and format applied
   */
  checkPhones() {
    this.hasPhones = true;
    if ((null != this.informationObj.home_first_ph) && (null != this.informationObj.home_second_ph)) {
      this.phonesStr = this.phonesStr
        + this.pipe.transform(this.informationObj.home_first_ph)
        + " | " + this.pipe.transform(this.informationObj.home_second_ph);
    }
    else if ((null != this.informationObj.home_first_ph) || (null != this.informationObj.home_second_ph)) {
      this.phonesStr = this.phonesStr
        + this.pipe.transform(this.informationObj.home_first_ph)
        + this.pipe.transform(this.informationObj.home_second_ph);
    }
    else {
      this.hasPhones = false;
    }
  }

  /**
   * Check what social links we should show in the navigation bar
   */
  checkSocialLinks() {
    this.hasSocialLinks = true;
    if (this.informationObj.home_fcbk) {
      this.hasFbk = true;
    }
    if (this.informationObj.home_ytube) {
      this.hasYtb = true;
    }
    if (this.informationObj.home_insta) {
      this.hasItg = true;
    }
    if (!this.hasFbk && !this.hasYtb && !this.hasItg) {
      this.hasSocialLinks = false;
    }
  }
}
