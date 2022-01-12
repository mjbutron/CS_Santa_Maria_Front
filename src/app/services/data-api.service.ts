import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { of, throwError } from 'rxjs';
import { delay, mergeMap, catchError, retry, retryWhen, shareReplay } from 'rxjs/operators';
// Interfaces
import { SliderInterface } from '../models/slider-interface';
// Number of retries
const DEFAULT_MAX_RETRIES = 5;

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  // API url
  url = environment.urlApiRest;

  /**
   * Constructor
   * @param http  HttpClient Object
   */
  constructor(private http: HttpClient) { }

  /**
   * Headers options
   * @return HttpHeaders
   */
  getHeadersOptions() {
    return {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      })
    };
  }

  /**
   * Delay retry
   * @param  delayMs  Delay in milliseconds
   * @param  maxRetry = DEFAULT_MAX_RETRIES Maximum number of retries
   * @return Observable modified with retry logic
   */
  delayRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
    let retries = maxRetry;

    return (src: Observable<any>) =>
      src.pipe(
        retryWhen((errors: Observable<any>) => errors.pipe(
          delay(delayMs),
          mergeMap(error => retries-- > 0 ? of(error) : throwError(of(error)))
        ))
      );
  }

  /**
   * Get slider information
   * @return An Observable of the response body as a JSON object
   */
  getAllSlider() {
    const url_api = this.url + '/api/allSlider';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get information for home
   * @return An Observable of the response body as a JSON object
   */
  getInfoHome() {
    const url_api = this.url + '/api/home/info';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get information for footer
   * @return An Observable of the response body as a JSON object
   */
  getInfoFooter() {
    const url_api = this.url + '/api/footer/info';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get information for contact page
   * @return An Observable of the response body as a JSON object
   */
  getInfoContact() {
    const url_api = this.url + '/api/contact/info';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get workshop information
   * @return An Observable of the response body as a JSON object
   */
  getAllWorkshops() {
    const url_api = this.url + '/api/allWorkshops';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get workshop information by ID
   * @param  id Workshop ID
   * @return An Observable of the response body as a JSON object
   */
  getWorkshopById(id: number) {
    const url_api = this.url + '/api/workshop/' + id;
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Obtain information on all active workshops
   * @return An Observable of the response body as a JSON object
   */
  getAllActiveWorkshops() {
    const url_api = this.url + '/api/activeWorkshops';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get all opinions
   * @return An Observable of the response body as a JSON object
   */
  getAllOpinions() {
    const url_api = this.url + '/api/allOpinion';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get all courses
   * @return An Observable of the response body as a JSON object
   */
  getAllCourses() {
    const url_api = this.url + '/api/courses';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get course information by ID
   * @param  id Course ID
   * @return An Observable of the response body as a JSON object
   */
  getCourseById(id: number) {
    const url_api = this.url + '/api/course/' + id;
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Obtain information on all active courses
   * @return An Observable of the response body as a JSON object
   */
  getAllActiveCourses() {
    const url_api = this.url + '/api/activeCourses';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get information for about us page
   * @return An Observable of the response body as a JSON object
   */
  getAllAboutUs() {
    const url_api = this.url + '/api/allAboutUs';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get all service
   * @return An Observable of the response body as a JSON object
   */
  getAllServices() {
    const url_api = this.url + '/api/allServices';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Get service information by ID
   * @param  id Service ID
   * @return  An Observable of the response body as a JSON object
   */
  getServiceById(id: number) {
    const url_api = this.url + '/api/service/' + id;
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }

  /**
   * Obtain information on all active services
   * @return An Observable of the response body as a JSON object
   */
  getAllActiveServices() {
    const url_api = this.url + '/api/activeServices';
    return this.http.get(url_api)
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }


  /**
   * Send email with the request information
   * @param  infoRequest  Object with the request information
   * @return An Observable of the response body as a JSON object
   */
  sendEmailContact(infoRequest: any) {
    const url_api = this.url + '/api/sendEmail';
    return this.http.post(url_api, JSON.stringify(infoRequest), this.getHeadersOptions())
      .pipe(
        this.delayRetry(2000, 3),
        catchError(err => {
          return of(err.value.error);
        }),
        shareReplay()
      )
  }
}
