import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { DataApiService } from 'src/app/services/data-api.service';

import { SliderInterface } from 'src/app/models/slider-interface';

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
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService) {
  }

  ngOnInit() {
    // this.isLoaded = false;
    this.getSlider();
  }

  getSlider(){
    this.dataApi.getAllSlider().subscribe((data) =>{
      if (200 == data.cod){
        this.sliders = data.allSliders;
        // this.isLoaded = true;
      }
      else{
        // this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

}
