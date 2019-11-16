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

  pathImgSlider1: String;
  pathImgSlider2: String;
  pathImgSlider3: String;
  pathImgService: String;

  sliders: SliderInterface;
  loading: boolean;

  constructor(private dataApi: DataApiService) {
    this.pathImgSlider1 = environment.pathImage + "/massagePrenatal.jpg";
    this.pathImgSlider2 = environment.pathImage + "/blw.jpg";
    this.pathImgSlider3 = environment.pathImage + "/classPrenatal.png";
    this.pathImgService = environment.pathImage + "/girl.png";
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
