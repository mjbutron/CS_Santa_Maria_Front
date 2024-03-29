import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { Router } from '@angular/router';
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
  assetsImg = environment.pathImage;
  // Services list
  services: ServiceInterface[] = [];
  // Load
  isLoaded: boolean;
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * constructor
   * @param dataApi  Data API Object
   * @param router   Router Object
   */
  constructor(private dataApi: DataApiService, private router: Router) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getServices();
  }

  /**
   * Get services information
   * @return List filled with active services
   */
  getServices() {
    this.dataApi.getAllActiveServices().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        this.services = data.allServices;
        this.isLoaded = true;
      }
      else {
        this.isLoaded = true;
      }
    });
  }

  /**
   * Redirection to service details
   * @param  id Id service
   */
  onServiceDetail(id: number) {
    this.router.navigate(['/servicio', id]);
  }
}
