import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { ServiceInterface } from 'src/app/models/service-interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Services list
  services: ServiceInterface[] = [];
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.getServices();
  }

  getServices(){
    this.dataApi.getAllActiveServices().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        this.services = data.allServices;
        this.isLoaded = true;
      }
      else{
        this.isLoaded = true;
      }
    });
  }
}
