import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

import { DataApiService } from 'src/app/services/data-api.service';

import { CourseInterface } from 'src/app/models/course-interface';

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
  // Load
  isLoaded: boolean;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.getCourses();
  }

  getCourses(){
    this.dataApi.getAllCourses().subscribe((data) =>{
      if (globalsConstants.K_COD_OK == data.cod){
        this.courses = data.allCourses;
        this.isLoaded = true;
        console.log("DATA: " + JSON.stringify(this.courses));
      }
      else{
        this.isLoaded = true;
        // this.toastr.error(data.message, globalsConstants.K_ERROR_STR);
      }
    });
  }

}
