import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  pathImgSlider: String;

  constructor() {
    this.pathImgSlider = environment.pathImageDev + "/massagePrenatal.jpg";
  }

  ngOnInit() {
  }

}
