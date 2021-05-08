import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

const SAVE_API = 'http://localhost:8080/pw/savepw';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SavepwService {

  constructor() { }
}
