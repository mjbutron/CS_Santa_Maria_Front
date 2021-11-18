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
  noDate = globalsConstants.K_NO_DATE_STR;
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
    this.course = new CourseInterface();
    this.activatedRoute.params.subscribe(param => {
      this.dataApi.getCourseById(param['id']).subscribe((data) => {
        if (globalsConstants.K_COD_OK == data.cod) {
          if (data.course.length > 0 && data.course[0].active == 1) {
            this.course = data.course[0];
            this.isLoaded = true;
          }
          else {
            this.router.navigateByUrl('/cursos');
          }
        }
        else {
          this.isLoaded = false;
        }
      });
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() { }

  /**
   * Inscription to the course
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
      if (result.value) {
        this.router.navigateByUrl('/contacto');
      }
    });
  }
}
