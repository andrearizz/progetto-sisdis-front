import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';
import {GroupsInteractionService} from '../_services/groups-interaction.service';

const TOKEN_HEADERS_KEY = 'Authorization';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private groupsInteraction: GroupsInteractionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.token.getToken();
    if (token != null) {
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADERS_KEY, 'Bearer ' + token)
      });
    }
    const etag = this.groupsInteraction.getETag();
    if (token != null && etag != null) {
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADERS_KEY, 'Bearer ' + token)
          .set('If-Match', this.groupsInteraction.getETag())
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
