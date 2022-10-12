import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = environment.apiServer;
  private authenticated = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    if (localStorage.getItem('DocOrgToken')) {
      this.authenticate().subscribe();
    }
  }

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public get user$(): Observable<User | null> {
    return this.user.asObservable();
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "/login", { email: email, password: password }).pipe(tap((res: any) => {
      if (res.success) {
        this.user.next(res.data);
        this.authenticated = true;
        this.saveTokenToStorage(res.data.token);
      }
    }))
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "/register", { name: name, email: email, password: password }).pipe(tap((res: any) => {
      if (res.success) {
        this.user.next(res.data);
        this.authenticated = true;
        this.saveTokenToStorage(res.data.token);
      }
    }))
  }

  public authenticate(): Observable<any> {
    if (this.authenticated) {
      return this.user$;
    }
    return this.httpClient.get<any>(this.apiServer + "/authenticate").pipe(tap((res: any) => {
      if (res.success) {
        this.user.next(res.data);
        this.authenticated = true;
        console.log("Logged in as " + res.data.name);
        this.saveTokenToStorage(res.data.token);
        if (this.router.url === '/login') {
          this.router.navigate(['/documents']);
        }
      }
      if (!res.success) {
        this.logout();
      }
    }),
      switchMap((res) => {
        if (res.success) {
          return of(res.data);
        }
        else {
          return of(null);
        }
      }))
  }

  public logout() {
    localStorage.removeItem('DocOrgToken');
    this.router.navigate(['/login']);
    this.user.next(null);
    this.authenticated = false;
  }

  public saveTokenToStorage(token: string): void {
    localStorage.setItem('DocOrgToken', token)
  }

}
export interface User {
  userId: string,
  name: string,
  role: string,
  email: string,
  token: string,
}