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
import { CourseInterface } from 'src/app/models/course-interface';

const K_CONFIRM_BUTTON_COLOR = '#d33';
const K_CANCEL_BUTTON_COLOR = '#0095A6';
const K_OK_BUTTON_STR = 'Enviar solicitud';
const K_CANCEL_BUTTON_STR = 'Cancelar';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  // Editor
  public Editor = ClassicEditor;
  // Path
  path = environment.imageRootPath;
  // Course
  course: CourseInterface;
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isLoaded = false;
    this.course = new CourseInterface();
    this.activatedRoute.params.subscribe( param => {
      this.dataApi.getCourseById(param['id']).subscribe((data) =>{
        if (globalsConstants.K_COD_OK == data.cod){
          if(data.course.length > 0 && data.course[0].active == 1){
            this.course = data.course[0];
            this.isLoaded = true;
          }
          else{
              this.router.navigateByUrl('/cursos');
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
