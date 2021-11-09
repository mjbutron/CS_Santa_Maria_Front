import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { AboutUsInterface } from 'src/app/models/aboutus-interface';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // About Us list
  aboutusList: AboutUsInterface[] = [];
  // Load
  isLoaded: boolean;
  loadingStr = globalsConstants.K_LOADING_STR;
  // Text About Us
  sectionTitle = globalsConstants.K_ABOUT_US_SECTION_TITLE;
  historyP1 = globalsConstants.K_ABOUT_US_HISTORY_ONE;
  historyP2 = globalsConstants.K_ABOUT_US_HISTORY_TWO;
  historyP3 = globalsConstants.K_ABOUT_US_HISTORY_THREE;
  historyP4 = globalsConstants.K_ABOUT_US_HISTORY_FOUR;

  /**
   * [constructor]
   * @param dataApi  [Data API Object]
   */
  constructor(private dataApi: DataApiService) { }

  /**
   * [ngOnInit]
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getAboutUs();
  }

  /**
   * [getAboutUs Get about us information]
   * @return [List filled with team members]
   */
  getAboutUs() {
    this.dataApi.getAllAboutUs().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        this.aboutusList = data.allAboutUs;
        this.isLoaded = true;
      }
      else {
        this.isLoaded = true;
      }
    });
  }
}
