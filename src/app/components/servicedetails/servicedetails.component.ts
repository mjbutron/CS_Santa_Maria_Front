import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-custom';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { ServiceInterface } from 'src/app/models/service-interface';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.css']
})
export class ServicedetailsComponent {
  // Editor
  public Editor = ClassicEditor;
  // Path
  path = environment.imageRootPath;
  // Services
  serviceId = 0;
  service: ServiceInterface;
  // Load
  isLoaded: boolean;
  // Global Constants
  globalCnstns = globalsConstants;

  /**
   * constructor
   * @param dataApi         Data API Object
   * @param activatedRoute  Active Router Object
   * @param router          Router Object
   */
  constructor(private dataApi: DataApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isLoaded = false;
    this.service = new ServiceInterface();
    this.activatedRoute.params.subscribe(param => {
      this.serviceId = param['id'];
      this.getDetailsService();
    });
  }

  /**
   * Obtain service details information
   */
  getDetailsService(): void {
    this.dataApi.getServiceById(this.serviceId).subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        if (data.service.length > 0 && data.service[0].active == 1) {
          this.service = data.service[0];
          this.isLoaded = true;
        }
        else {
          this.router.navigateByUrl('/servicios');
        }
      }
      else {
        this.isLoaded = true;
      }
    });
  }
}
