import { Component, OnInit } from '@angular/core';
import {SavepwService} from '../_services/savepw.service';
import {SidebarService} from '../_services/sidebar.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  form: any = {
    url: null,
    login: null,
    password: null
  };

  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';

  credentials = [];
  form2: any = {
    id: '',
    title: '',
    loginName: '',
    protocol: '',
    password: '',

    titleEdited: '',
    loginNameEdited: '',
    protocolEdited: '',
    passwordEdited: ''
  };

  ifAdd = false;
  isShow = false;
  isPasswordModified = false;
  isUrlModified = false;
  isLoginModified = false;
  roles: string[] = [];

  constructor(private savePwService: SavepwService, private sideBarService: SidebarService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.roles = this.tokenStorage.getUser().roles;
    this.savePwService.getAllPassword().subscribe(data => {
      this.credentials = data.credentials;
    });
  }

  onSubmit(): void {
    const { url, login, password } = this.form;
    this.savePwService.savePw(url, login, password).subscribe(data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSaveFailed = false;
      window.location.reload();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  toggleAddSideBar(): void {
    this.ifAdd = true;
    this.form.url = null;
    this.form.login = null;
    this.form.password = null;
    this.sideBarService.setShowNav(true);
  }

  toggleEditSideBar(credential: any): void {
    this.ifAdd = false;
    this.form2.id = credential.id;
    this.form2.title = credential.url;
    this.form2.titleEdited = credential.url;
    this.form2.loginName = credential.login;
    this.form2.loginNameEdited = credential.login;
    this.savePwService.getPw(this.form2.title, this.form2.loginName).subscribe( data => {
        this.form2.password = data.message;
        this.form2.passwordEdited = this.form2.password;
      },
      err => {
        this.errorMessage = err.error.message;
      });
    this.sideBarService.setShowNav(true);
    console.log(this.form2.title);
  }

  onDelete(): void {

    // onDelete with id
    this.savePwService.deletePw(this.form2.id).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
      });

    /*
    const url = this.form2.title.split('://');
    const protocol = url[0];
    const site = url[1];
    console.log(protocol);
    console.log(site);
    this.savePwService.deletePw(protocol, site, this.form2.loginName).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
      });

     */
  }

  onShow(): void {
    this.isShow = true;

  }

  onHide(): void {
    this.isShow = false;
  }

  onEdit(): void {
    let isModified = false;

    if (this.form2.password !== this.form2.passwordEdited) {
      this.isPasswordModified = true;
      isModified = true;
    }
    if (this.form2.title !== this.form2.titleEdited) {
      this.isUrlModified = true;
      isModified = true;
    }
    if (this.form2.loginName !== this.form2.loginNameEdited) {
      this.isLoginModified = true;
      isModified = true;
    }

    if (!isModified) {
      return null;
    }


    this.savePwService.updateCredentials(this.form2.id, this.form2.titleEdited, this.isUrlModified,
      this.form2.loginNameEdited, this.isLoginModified, this.form2.passwordEdited, this.isPasswordModified)
      .subscribe(data => {
        window.location.reload();
      },
        err => {
          this.errorMessage = err.error.message;
        });
  }
}
