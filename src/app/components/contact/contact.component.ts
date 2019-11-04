import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  lat = 36.591538;
  lng = -6.230237;
  checkAcceptRGPD = false;
  inputDisabled = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log("Formulario");
    console.log(form);
  }

  checkValue(event: any, form: NgForm){
   this.inputDisabled = !event;
   console.log("evento:" + event);
   console.log("active:" + this.inputDisabled);
}

}
