import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { WorkshopInterface } from 'src/app/models/workshop-interface';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Workshops
  workshops: WorkshopInterface[] = [];
  noDate = globalsConstants.K_NO_DATE_STR;
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
    this.getWorkshops();
  }

  /**
   * Get workshop information
   * @return List filled with active workshop
   */
  getWorkshops() {
    this.dataApi.getAllActiveWorkshops().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        this.workshops = data.allWorkshops;
        this.isLoaded = true;
      }
      else {
        this.isLoaded = true;
      }
    });
  }

  /**
   * Redirection to workshop details
   * @param  id Id workshop
   */
  onWorkshopDetail(id: number) {
    this.router.navigate(['/taller', id]);
  }

  /**
   * Inscription to the workshop
   */
  onInscription() {
    Swal.fire({
      title: globalsConstants.K_INSCRIPTION_STR,
      html: globalsConstants.K_INSCRIPTION_TEXT_STR + globalsConstants.K_INSCRIPTION_NOTE_STR,
      showCancelButton: true,
      background: globalsConstants.K_BACKGROUND_INSC_COLOR,
      confirmButtonColor: globalsConstants.K_CONFIRM_BUTTON_COLOR,
      cancelButtonColor: globalsConstants.K_CANCEL_BUTTON_COLOR,
      confirmButtonText: globalsConstants.K_INSCRIPTION_OK_BUTTON_STR,
      cancelButtonText: globalsConstants.K_CANCEL_BUTTON_STR
    }).then((result) => {
      /* istanbul ignore else */
      if (result.value) {
        this.router.navigateByUrl('/contacto');
      }
    });
  }
}
