import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(
    private cookieService: CookieService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //TODO get from local storage
    const token = this.cookieService.get('DocOrgToken');
    
    const auth = req.clone({ headers: new HttpHeaders().set(`Authorization`, `Bearer ${token}`) });
    return next.handle(auth);
  }
}