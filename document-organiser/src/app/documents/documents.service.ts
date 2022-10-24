import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDocuments(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + "/userdocs").pipe(tap((res: any) => {
    }))
  }
}