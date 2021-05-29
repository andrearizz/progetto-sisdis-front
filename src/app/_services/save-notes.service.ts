import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const SAVE_API = 'http://localhost:8080/api/secure-notes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SaveNotesService {

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<any> {
    return this.http.get(SAVE_API + '/getAllNotes', httpOptions);
  }

  saveNote(title: string, content: string): Observable<any> {
    return this.http.post(SAVE_API + '/saveNote', {
      title,
      content,
      httpOptions
    });
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(SAVE_API + '/' + id + '/deleteNote', httpOptions);
  }

  updateNote(id: string, title: string, isTitleModified: boolean, content: string, isContentModified: boolean): Observable<any> {
    return this.http.put(SAVE_API + '/editNote', {
      id,
      title,
      isTitleModified,
      content,
      isContentModified,
      httpOptions
    });
  }

  showContent(id: string): Observable<any> {
    return this.http.post(SAVE_API + '/getContent', {
      id,
      httpOptions
    });
  }
}
