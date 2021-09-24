import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { AboutUsInterface } from 'src/app/models/aboutus-interface';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // About us list
  aboutusList: AboutUsInterface[] = [];
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.getAboutUs();
  }

  getAboutUs(){
    this.dataApi.getAllAboutUs().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        this.aboutusList = data.allAboutUs;
        this.isLoaded = true;
      }
      else{
        this.isLoaded = true;
      }
    });
  }
}
