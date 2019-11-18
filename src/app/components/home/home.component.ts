import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { DataApiService } from 'src/app/services/data-api.service';
import { SliderInterface } from '../../models/slider-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders: SliderInterface;
  loading: boolean;

  constructor(private dataApi: DataApiService) {

  }

  ngOnInit() {
    this.loading = true;
    this.getSlider();
  }

  getSlider(){
    this.dataApi.getAllSlider()
    .subscribe((allSliders: SliderInterface) => {
      this.sliders = allSliders;
      this.loading = false;
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
