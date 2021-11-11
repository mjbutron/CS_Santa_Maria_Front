import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  /**
   * [Picture list]
   */
  slides = [
    { img: "../../assets/img/asisa.png" },
    { img: "../../assets/img/allianz.png" },
    { img: "../../assets/img/adeslas.png" },
    { img: "../../assets/img/zurich.png" },
    { img: "../../assets/img/reale.png" },
    { img: "../../assets/img/aegon.png" },
    { img: "../../assets/img/liberty.png" },
    { img: "../../assets/img/mapfre.png" },
    { img: "../../assets/img/sanitas.png" }
  ];

  /**
   * [Carousel configuration]
   */
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "centerMode": true,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "arrows": false,
    "dots": true,
    "infinite": true,
    "pauseOnHover": false,
    "variableWidth": true,
    "responsive": [{
      "breakpoint": 768,
      "settings": {
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }, {
      "breakpoint": 520,
      "settings": {
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }]
  };

  /**
   * [constructor]
   */
  constructor() {}

  /**
   * [ngOnInit]
   */
  ngOnInit() { }
}
