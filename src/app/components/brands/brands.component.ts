import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  slides = [
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"},
    {img: "https://cdn.blisk.io/square-promo-logo-256.jpg?v=d9954ab765a2471d985e27862d3d940c"}
  ];

  slideConfig = {
   "slidesToShow": 1,
   "slidesToScroll": 1,
   "autoplay": true,
   "autoplaySpeed": 5000,
   "arrows": false,
   "dots":true,
   "infinite": true,
   "pauseOnHover": false,
   "variableWidth": true,
   "responsive": [{
            "breakpoint": 768,
            "settings": {
                "slidesToShow": 4
            }
        }, {
            "breakpoint": 520,
            "settings": {
                "slidesToShow": 3
            }
        }]
  };

  constructor() {
  }

  ngOnInit() {}

  addSlide() {
   this.slides.push({img: "http://placehold.it/350x150/777777"})
 }

 removeSlide() {
   this.slides.length = this.slides.length - 1;
 }

 slickInit(e) {
   console.log('slick initialized');
 }

 breakpoint(e) {
   console.log('breakpoint');
 }

 afterChange(e) {
   console.log('afterChange');
 }

 beforeChange(e) {
   console.log('beforeChange');
 }

}
