import { Component, OnInit } from '@angular/core';
import * as globalsConstants from 'src/app/common/globals';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  /**
   * [Picture list]
   */
  slides = globalsConstants.K_BRANDS_IMG_VECTOR;

  /**
   * [Carousel configuration]
   */
  slideConfig = globalsConstants.K_BRANDS_CAROUSEL_CONFIG;

  /**
   * [constructor]
   */
  constructor() {}

  /**
   * [ngOnInit]
   */
  ngOnInit() { }
}
