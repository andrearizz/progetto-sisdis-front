import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const GEN_API = 'http://localhost:8080/api/generator';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GenService {

  constructor(private http: HttpClient) { }

  generate(lenght: number, containsChar: boolean, containsDigit: boolean, containsSymbols: boolean): Observable<any> {
      return this.http.post(GEN_API + '/password', {
        lenght,
        containsChar,
        containsDigit,
        containsSymbols,
        httpOptions
      } );
  }
}
