import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

import { SliderInterface } from '../models/slider-interface';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private url = environment.urlApiRest;
  headers : HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllSlider(){
    const url_api = this.url + '/api/allSlider';
    return this.http.get(url_api);
  }

  /*getHomeServices(){
    const url_api = 'url_del_servicio/api/homeServices';
    return this.http.get(url_api);
  }

  getAllServices(){
    const url_api = 'url_del_servicio/api/allServices';
    return this.http.get(url_api);
  }*/
}
