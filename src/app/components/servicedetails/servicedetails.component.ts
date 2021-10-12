import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { ActivatedRoute } from '@angular/router';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { ServiceInterface } from 'src/app/models/service-interface';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.css']
})
export class ServicedetailsComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Services
  service: ServiceInterface;
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService, private activatedRoute: ActivatedRoute) {
    this.isLoaded = false;
    this.service = new ServiceInterface();
    this.activatedRoute.params.subscribe( param => {
      this.dataApi.getServiceById(param['id']).subscribe((data) =>{
        if (globalsConstants.K_COD_OK == data.cod){
          this.service = data.service;
          this.isLoaded = true;
          console.log(this.service[0].title);
        }
        else{
          this.isLoaded = true;
        }
      });
    });
  }

  ngOnInit() {
  }

}
