import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User | null = null;
  private apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) { 
    //this.login("teszt@elek.hu", "qwertzu").subscribe();
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer +"/login", {email: email, password: password}).pipe(tap((res: any) => {
      if(res.success){
        this.user = res.data;
        console.log(this.user);
        this.saveTokenAsCookie(res.data.token);
      }
    }))
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer +"/register", {name: name, email: email, password: password}).pipe(tap((res: any) => {
      if(res.success){
        this.user = res.data;
        console.log(this.user);
        this.saveTokenAsCookie(res.data.token);
      }
    }))
  }

  public saveTokenAsCookie(token: string): void {
    this.cookieService.set(
      "DocOrgToken",
      token,
      1,
      '/',
      undefined,
      true,
      'Lax'
    );

  }

}
export interface User {
  userId: string,
  name: string,
  role: string,
  email: string,
  token: string,
}