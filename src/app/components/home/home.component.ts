import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { Router } from '@angular/router';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { SliderInterface } from 'src/app/models/slider-interface';
import { WorkshopInterface } from 'src/app/models/workshop-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Sliders
  sliders: SliderInterface[] = [];
  // Workshops
  wspInHome: WorkshopInterface[] = [];
  // Load
  isLoaded: boolean;
  // No date
  noDate = globalsConstants.K_NO_DATE_STR;
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * constructor
   * @param dataApi  Data API Object
   * @param router   Router Object
   */
  constructor(private dataApi: DataApiService, private router: Router) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getSlider();
    this.getAllWorkshops();
  }

  /**
   * Get slider information
   * @return List filled with slider information and images
   */
  getSlider() {
    this.dataApi.getAllSlider().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        this.sliders = data.allSliders;
        this.isLoaded = true;
      }
      else {
        this.isLoaded = false;
      }
    });
  }

  /**
   * It get all the active workshops that are visible on the home page.
   * @return List filled with workshops information
   */
  getAllWorkshops() {
    this.dataApi.getAllWorkshops().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        if (0 < data.allWorkshops.length) {
          for (let wspHome of data.allWorkshops) {
            if (wspHome.home == 1 && wspHome.active == 1) {
              this.wspInHome.push(wspHome);
            }
          }
        }
      }
    });
  }

  /**
   * Redirection to workshop details
   * @param  id Id workshop
   */
  onWorkshopDetail(id: number) {
    this.router.navigate(['/taller', id]);
  }

}
