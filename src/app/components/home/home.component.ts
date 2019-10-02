import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  private sliders: SliderInterface;

  constructor(private dataApi: DataApiService) {
    this.pathImgSlider1 = environment.pathImage + "/massagePrenatal.jpg";
    this.pathImgSlider2 = environment.pathImage + "/blw.jpg";
    this.pathImgSlider3 = environment.pathImage + "/classPrenatal.png";
    this.pathImgService = environment.pathImage + "/girl.png";
  }

  ngOnInit() {
    this.getSlider();
  }

  getSlider(){
    this.dataApi.getAllSlider()
    .subscribe((allSliders: SliderInterface) => (this.sliders = allSliders));
  }

}
