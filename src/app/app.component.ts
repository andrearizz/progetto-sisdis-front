import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;

  isMenuCollapsed: boolean;

  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {
    this.isMenuCollapsed = true;
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if ( this.isLoggedIn ) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    $('#menu-toggle').on('click',
      (e) => (e.preventDefault(),
        $('#wrapper').toggleClass('toggled')));
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
