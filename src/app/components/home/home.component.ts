import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { DataApiService } from 'src/app/services/data-api.service';

import { SliderInterface } from '../../models/slider-interface';

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
    this.isLoaded = true;
    this.getSlider();
  }

  getSlider(){
    this.dataApi.getAllSlider().subscribe((data) =>{
      this.sliders = data.allSliders;
      // this.isLoaded = false;
    }, (err) => {
      // Swal.fire({
      //   allowOutsideClick: false,
      //   showConfirmButton: false,
      //   type: 'error',
      //   title: 'Ups!',
      //   text: "Parece que tenemos un problema. Intentelo de nuevo pasado unos minutos."
      // });
    });
  }

}
