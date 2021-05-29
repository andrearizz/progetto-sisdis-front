import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './_services/auth.service';
import {TokenStorageService} from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    const isLoggedIn = !!this.tokenStorageService.getToken();
    if (isLoggedIn){
      return true;
    }
    return this.router.parseUrl('/login');
  }

}
