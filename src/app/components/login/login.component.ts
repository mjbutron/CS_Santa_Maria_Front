import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  rememberUser = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    if(localStorage.getItem('email')){
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Por favor, espere...'
    });
    Swal.showLoading();

    this.auth.login(this.user).subscribe(res => {
      console.log(res);
      Swal.close();

      if(this.rememberUser){
        localStorage.setItem('email', this.user.email);
      }else{
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/admin/dashboard');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al iniciar sesión',
        text: err.error.error.message
      });
    });
  }

}
