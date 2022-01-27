import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  /**
   * Path images
   */
  assetsImg = environment.pathImage;

  /**
   * Picture list
   */
  slides = globalsConstants.K_BRANDS_IMG_VECTOR;

  /**
   * Carousel configuration
   */
  slideConfig = globalsConstants.K_BRANDS_CAROUSEL_CONFIG;

  /**
   * constructor
   */
  constructor() { }
}
