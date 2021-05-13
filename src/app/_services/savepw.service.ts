import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const SAVE_API = 'http://localhost:8080/api/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SavepwService {

  constructor(private http: HttpClient) { }

  savePw(url: string, login: string, password: string): Observable<any> {
    return this.http.post(SAVE_API + '/savePw', {
      url,
      login,
      password,
      httpOptions
    });
  }

  getAllPassword(): Observable<any> {
    return this.http.get(SAVE_API + '/getAll', httpOptions);
  }

  deletePw(id: string): Observable<any> {
    return this.http.delete(SAVE_API + '/' + id + '/delPw', httpOptions);
  }

  getPw(url: string, login: string): Observable<any> {
    return this.http.post(SAVE_API + '/seePw', {
      url,
      login,
      httpOptions
    });
  }

  updateCredentials(id: string, url: string, isUrlModified: boolean, login: string, isLoginModified: boolean,
                    password: string, isPasswordModified): Observable<any> {
    console.log(isUrlModified);

    return this.http.post(SAVE_API + '/edit', {
      id,
      url,
      isUrlModified,
      login,
      isLoginModified,
      password,
      isPasswordModified,
      httpOptions
    });

  }
}
