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

  public newDocument(document: any): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "/userdocs", document).pipe(tap((res: any) => {
    }))
  }

  public patchDocument(document: any, id: any): Observable<any> {
    return this.httpClient.patch<any>(this.apiServer + "/userdocs/" + id, document).pipe(tap((res: any) => {
    }))
  }

  public deleteDocument(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + "/userdocs/" + id).pipe(tap((res: any) => {
    }))
  }

  public downloadDocument(id: any, filename: any): Observable<any> {
    return this.httpClient.get(this.apiServer + "/userdocs/" + id + '/view/' + filename, {observe: 'response', responseType: 'blob'}).pipe(tap((res: any) => {
    }))
  }
}