import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
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
  // Social links
  hasSocialLinks: boolean;
  showSocialLinks: boolean;
  hasFbk: boolean;
  hasYtb: boolean;
  hasItg: boolean;
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * Constructor
   * @param dataApi  Data API Object
   */
  constructor(private dataApi: DataApiService) {
    this.informationObj = new ContactInterface();
    this.showSocialLinks = false;
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.hasAdress = false;
    this.hasEmail = false;
    this.hasPhone = false;
    this.hasSchedule = false;
    this.hasFbk = false;
    this.hasYtb = false;
    this.hasItg = false;
    this.getHomeInfo();
    this.getFooterInfo();
  }

  /**
   * Obtain navigation bar information
   */
  getHomeInfo(): void {
    this.dataApi.getInfoHome().subscribe((data) => {
      /* istanbul ignore else */
      if (globalsConstants.K_COD_OK == data.cod && 0 < data.homeInfo.length) {
        for (let i = 0; i < data.homeInfo.length; i++) {
          this.informationObj.home_first_ph = data.homeInfo[i].home_first_ph;
          this.informationObj.home_second_ph = data.homeInfo[i].home_second_ph;
          this.informationObj.home_fcbk = data.homeInfo[i].home_fcbk;
          this.informationObj.home_ytube = data.homeInfo[i].home_ytube;
          this.informationObj.home_insta = data.homeInfo[i].home_insta;
        }
        this.checkSocialLinks();
      }
    });
  }

  /**
   * Get footer information
   * @return Object filled with footer information
   */
  getFooterInfo() {
    this.dataApi.getInfoFooter().subscribe((data) => {
      /* istanbul ignore else */
      if (globalsConstants.K_COD_OK == data.cod && 0 < data.footerInfo.length) {
        for (let i = 0; i < data.footerInfo.length; i++) {
          this.informationObj.footer_address = data.footerInfo[i].footer_address;
          this.informationObj.footer_email = data.footerInfo[i].footer_email;
          this.informationObj.footer_ph = data.footerInfo[i].footer_ph;
          this.informationObj.footer_schdl = data.footerInfo[i].footer_schdl;
          this.showSocialLinks = (data.footerInfo[i].footer_social_links == 1) ? true : false;
        }
        this.checkContactInformation();
      }
    });
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

  /**
   * Check what data we should show in the footer
   */
  checkContactInformation() {
    this.hasContactInfo = true;
    if (this.informationObj.footer_address) {
      this.hasAdress = true;
    }
    if (this.informationObj.footer_email) {
      this.hasEmail = true;
    }
    if (this.informationObj.footer_ph) {
      this.hasPhone = true;
    }
    if (this.informationObj.footer_schdl) {
      this.hasSchedule = true;
    }
    if (!this.hasAdress && !this.hasEmail && !this.hasPhone && !this.hasSchedule) {
      this.hasContactInfo = false;
    }
  }
}
