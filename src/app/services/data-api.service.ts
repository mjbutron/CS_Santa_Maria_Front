import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

import { of, throwError } from 'rxjs';
import { delay, mergeMap, catchError, retry, retryWhen, shareReplay } from 'rxjs/operators';

import { SliderInterface } from '../models/slider-interface';

const DEFAULT_MAX_RETRIES = 5;

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private url = environment.urlApiRest;

  constructor(private http: HttpClient) { }

// Headers
  getHeadersOptions(){
    return {
    headers: new HttpHeaders({
      "Content-type": "application/json"
      })
    };
  }

// Delay retry
  delayRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES){
    let retries = maxRetry;

    return (src:Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap(error => retries-- > 0 ? of(error) : throwError(of(error)))
      ))
    );
  }

// Slider
  getAllSlider(){
    const url_api = this.url + '/api/allSlider';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// Contact information
  getInfoHome(){
    const url_api = this.url + '/api/home/info';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getInfoFooter(){
    const url_api = this.url + '/api/footer/info';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getInfoContact(){
    const url_api = this.url + '/api/contact/info';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// Workshops
  getAllWorkshops(){
    const url_api = this.url + '/api/allWorkshops';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getWorkshopById(id: number){
    const url_api = this.url + '/api/workshop/' + id;
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getAllActiveWorkshops(){
    const url_api = this.url + '/api/activeWorkshops';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// Opinions
  getAllOpinions(){
    const url_api = this.url + '/api/allOpinion';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// Courses
  getAllCourses(){
    const url_api = this.url + '/api/courses';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getCourseById(id: number){
    const url_api = this.url + '/api/course/' + id;
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getAllActiveCourses(){
    const url_api = this.url + '/api/activeCourses';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// About Us
  getAllAboutUs(){
    const url_api = this.url + '/api/allAboutUs';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

// Services
  getAllServices(){
    const url_api = this.url + '/api/allServices';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getServiceById(id: number){
    const url_api = this.url + '/api/service/' + id;
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }

  getAllActiveServices(){
    const url_api = this.url + '/api/activeServices';
    return this.http.get(url_api)
    .pipe(
      this.delayRetry(2000, 3),
      catchError( err => {
        return of( err.value.error );
      }),
      shareReplay()
    )
  }


// Send email
sendEmailContact(infoRequest: any){
  const url_api = this.url + '/api/sendEmail';
  return this.http.post(url_api, JSON.stringify(infoRequest), this.getHeadersOptions())
  .pipe(
    this.delayRetry(2000, 3),
    catchError( err => {
      return of( err.value.error );
    }),
    shareReplay()
  )
}


}
