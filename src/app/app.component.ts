import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'centrosanitario-santamaria';
  loading: boolean;

  constructor(){
    this.loading = false;
    //this.loading = setInterval(()=>{this.setLoading();}, 3000);
  }

  setLoading() {
      this.loading = false;
  }
}
