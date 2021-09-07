import { Component, OnInit, TemplateRef  } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  // Sliders
  courses: CourseInterface[] = [];
  courseDetail: CourseInterface;
  // Load
  isLoaded: boolean;
  // Modal
  modalRef?: BsModalRef;

  constructor(private dataApi: DataApiService, private modalService: BsModalService, private router: Router) {
    this.courseDetail = new CourseInterface();
  }

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
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

  openModal(course: CourseInterface, template: TemplateRef<any>) {
    this.courseDetail.title = course.title;
    this.courseDetail.image = course.image;
    this.courseDetail.description = course.description;
    this.courseDetail.price = course.price;
    this.courseDetail.session_date = course.session_date;
    this.courseDetail.session_start = course.session_start;
    this.courseDetail.session_end = course.session_end;
    this.courseDetail.sessions = course.sessions;
    this.courseDetail.hours = course.hours;
    this.courseDetail.address = course.address;
    this.courseDetail.impart = course.impart;
    this.courseDetail.free_places = course.free_places;
    this.modalRef = this.modalService.show(template);
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
