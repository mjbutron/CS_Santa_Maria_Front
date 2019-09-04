import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor() {
    this.pathImgSlider1 = environment.pathImageDev + "/massagePrenatal.jpg";
    this.pathImgSlider2 = environment.pathImageDev + "/blw.jpg";
    this.pathImgSlider3 = environment.pathImageDev + "/classPrenatal.png";
    this.pathImgService = environment.pathImageDev + "/girl.png";
  }

  ngOnInit() {
  }

}
