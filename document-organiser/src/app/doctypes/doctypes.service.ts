import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctypesService {

  private apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTypes(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + "/types").pipe(tap((res: any) => {
    }))
  }
}