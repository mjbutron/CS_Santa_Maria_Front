import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DataApiService } from 'src/app/services/data-api.service';

import { CourseInterface } from 'src/app/models/course-interface';

const K_CONFIRM_BUTTON_COLOR = '#d33';
const K_CANCEL_BUTTON_COLOR = '#0095A6';
const K_OK_BUTTON_STR = 'Enviar solicitud';
const K_CANCEL_BUTTON_STR = 'Cancelar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Courses
  courses: CourseInterface[] = [];
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService, private router: Router) {}

  ngOnInit() {
    this.isLoaded = false;
    this.getCourses();
  }

  getCourses(){
    this.dataApi.getAllActiveCourses().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        this.courses = data.allCourses;
        this.isLoaded = true;
      }
      else{
        this.isLoaded = true;
      }
    });
  }

  onCourseDetail(id:number){
    this.router.navigate(['/curso', id]);
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
