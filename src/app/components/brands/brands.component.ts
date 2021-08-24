import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  slides = [
    {img: "http://sueiro.es/wp-content/uploads/2019/03/Asisa-200x100.png"},
    {img: "http://sueiro.es/wp-content/uploads/2019/03/Allianz-200x100.png"},
    {img: "https://hospitalangeldelmar.com.mx/wp-content/uploads/2018/01/gnp-seguros-medicos-200x100.jpg"},
    {img: "http://sueiro.es/wp-content/uploads/2019/03/Xurich-200x100.png"},
    {img: "http://www.minguezsaez.com/wp-content/uploads/2018/03/reale-200x100.jpg"},
    {img: "http://sueiro.es/wp-content/uploads/2019/03/Aegon-200x100.png"},
    {img: "https://sueiro.es/wp-content/uploads/2019/03/Liberty-200x100.png"},
    {img: "https://www.segurosequitacion.com/wp-content/uploads/2013/04/sponsor3-200x100.jpg"}
  ];

  slideConfig = {
   "slidesToShow": 1,
   "slidesToScroll": 1,
   "centerMode": true,
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
   // console.log('slick initialized');
 }

 breakpoint(e) {
   // console.log('breakpoint');
 }

 afterChange(e) {
   // console.log('afterChange');
 }

 beforeChange(e) {
   // console.log('beforeChange');
 }

}
