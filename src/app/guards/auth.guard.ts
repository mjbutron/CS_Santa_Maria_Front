import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
