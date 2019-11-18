import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'centrosanitario-santamaria';
  showLoading = false;

  constructor() {
    // console.log("Init " + this.showLoading);
    // setTimeout (() => {
    //   this.showLoading = false;
    //      console.log("Start " + this.showLoading);
    //   }, 3000);
    // this.showLoading = false;
  }

  ngOnInit() {}

}
