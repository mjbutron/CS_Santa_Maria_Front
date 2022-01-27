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
  assetsImg = environment.pathImage;
  // About Us list
  aboutusList: AboutUsInterface[] = [];
  // Load
  isLoaded: boolean;
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * constructor
   * @param dataApi  Data API Object
   */
  constructor(private dataApi: DataApiService) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getAboutUs();
  }

  /**
   * Get about us information
   * @return List filled with team members
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
