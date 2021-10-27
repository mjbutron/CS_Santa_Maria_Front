import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { Router } from '@angular/router';

import { DataApiService } from 'src/app/services/data-api.service';

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

  constructor(private dataApi: DataApiService, private router: Router) {
  }

  ngOnInit() {
    this.isLoaded = false;
    this.getSlider();
    this.getAllWorkshops();
  }

  getSlider(){
    this.dataApi.getAllSlider().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        this.sliders = data.allSliders;
        this.isLoaded = true;
      }
      else{
        this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

  getAllWorkshops(){
    this.dataApi.getAllWorkshops().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod){
        if(0 < data.allWorkshops.length){
          for(let wspHome of data.allWorkshops){
            if(wspHome.home == 1 && wspHome.active == 1){
              this.wspInHome.push(wspHome);
            }
          }
        }
      }
    });
  }

  onWorkshopDetail(id:number){
    this.router.navigate(['/taller', id]);
  }

}
