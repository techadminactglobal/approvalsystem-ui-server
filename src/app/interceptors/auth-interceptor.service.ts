import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let user = JSON.parse(localStorage.getItem('userData') || '{}');      
      if (JSON.stringify(user) !== '{}') {
        if (user && user.jwtToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwtToken}`,
            }
            
          });
        }
      }
      
    return next.handle(request);
  }
}
