import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  public patchUser(current: boolean, id: string, name: string, email: string, password?: string, role?: string): Observable<any> {
    return this.httpClient.patch<any>(this.apiServer + "/users/" + id, { name: name, email: email, password: password ? password : undefined, role: role ? role : undefined }).pipe(tap((res: any) => {
      if (res.success && current) {
        window.location.reload();
      }
    }))
  }
}
