import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


const GROUP_API = 'http://localhost:8080/api/group';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsEtag = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe: 'response'
  })
};


@Injectable({
  providedIn: 'root'
})


export class GroupsService {

  constructor(private http: HttpClient) { }

  createGroup(name: string): Observable<any> {
    return this.http.post(GROUP_API + '/createGroup', {
      name,
      httpOptions
    });
  }

  getAllGroups(): Observable<any> {
    return this.http.get(GROUP_API + '/getAll', httpOptions);
  }

  join(code: string): Observable<any> {
    return this.http.post(GROUP_API + '/join', {
      code,
      httpOptions
    });
  }

  getAllCredentials(groupId: string): Observable<any> {
    return this.http.get(GROUP_API + '/getAllCredentials/' + groupId, httpOptions);
  }

  getAllNotes(groupId: string): Observable<any> {
    return this.http.get(GROUP_API + '/getAllNotes/' + groupId, httpOptions);
  }

  saveCredential(groupId: string, url: string, login: string, password: string): Observable<any> {
    return this.http.post(GROUP_API + '/addCredential/' + groupId, {
      url,
      login,
      password,
      httpOptions
    });
  }

  getPassword(groupId: string, credentialId: string): Observable<any> {
    return this.http.get(GROUP_API + '/getCredential/' + groupId + '/' + credentialId, {
      observe: 'response'
    });
  }

  deleteCredential(groupId: string, credentialId: string): Observable<any> {
    return this.http.delete(GROUP_API + '/deleteGroupCredential/' + groupId + '/' + credentialId, httpOptions);
  }

  editCredential(groupId: string, credentialId: string, url: string,
                 login: string, password: string, eTag: string): Observable<any> {
    return this.http.put(GROUP_API + '/editGroupCredential/' + groupId + '/' + credentialId, {
      url,
      login,
      password,
      httpOptions
    });
  }

  getMembers(groupId: string): Observable<any> {
    return this.http.get(GROUP_API + '/getMembers/' + groupId, httpOptions);
  }

  changeRole(groupId: string, usernameToChange: string, permission: string): Observable<any> {
    return this.http.put(GROUP_API + '/changePermisison/' + groupId, {
      usernameToChange,
      permission,
      httpOptions
    });
  }

  saveNote(groupId: string, title: string, content: string): Observable<any> {
    return this.http.post(GROUP_API + '/saveGroupNote/' + groupId, {
      title,
      content,
      httpOptions
    });
  }

  deleteNote(groupId: string, noteId: string): Observable<any> {
    return this.http.delete(GROUP_API + '/deleteNote/' + groupId + '/' + noteId, httpOptions);
  }

  editNote(groupId: string, noteId: string, title: string, content: string): Observable<any> {
    return this.http.put(GROUP_API + '/editNote/' + groupId + '/' + noteId, {
      title,
      content,
      httpOptions
    });
  }


  getContent(groupId: string, noteId: string): Observable<any> {
    return this.http.get(GROUP_API + '/getContent/' + groupId + '/' + noteId, {
      observe: 'response'
    });
  }
}
