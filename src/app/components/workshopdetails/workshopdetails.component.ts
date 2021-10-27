import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-custom';

// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
import { WorkshopInterface } from 'src/app/models/workshop-interface';

const K_CONFIRM_BUTTON_COLOR = '#d33';
const K_CANCEL_BUTTON_COLOR = '#0095A6';
const K_OK_BUTTON_STR = 'Enviar solicitud';
const K_CANCEL_BUTTON_STR = 'Cancelar';

@Component({
  selector: 'app-workshopdetails',
  templateUrl: './workshopdetails.component.html',
  styleUrls: ['./workshopdetails.component.css']
})
export class WorkshopdetailsComponent implements OnInit {
  // Editor
  public Editor = ClassicEditor;
  // Path
  path = environment.imageRootPath;
  // Workshop
  workshop: WorkshopInterface;
  noDate = globalsConstants.K_NO_DATE_STR;
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isLoaded = false;
    this.workshop = new WorkshopInterface();
    this.activatedRoute.params.subscribe( param => {
      this.dataApi.getWorkshopById(param['id']).subscribe((data) =>{
        if (globalsConstants.K_COD_OK == data.cod){
          if(data.workshop.length > 0 && data.workshop[0].active == 1){
            this.workshop = data.workshop[0];
            this.isLoaded = true;
          }
          else{
            this.router.navigateByUrl('/talleres');
          }
        }
        else{
          this.isLoaded = true;
        }
      });
    });
  }

  ngOnInit() {
  }

  onInscription(){
    Swal.fire({
      title: "Inscripción",
      html: "Para realizar la inscripción pongase en contacto con nosotras a través de teléfono o solicitud.<br><br>"
      +"<b>(*)</b>En la solicitud, recuerde indicar en el asunto 'Inscripción' y especificar el nombre del curso o taller en el mensaje.<br>Gracias.",
      showCancelButton: true,
      background: '#f1f1f1',
      confirmButtonColor: K_CANCEL_BUTTON_COLOR,
      cancelButtonColor: K_CONFIRM_BUTTON_COLOR,
      confirmButtonText: K_OK_BUTTON_STR,
      cancelButtonText: K_CANCEL_BUTTON_STR
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/contacto');
      }
    });
  }

}
