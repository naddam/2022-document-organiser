import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTypes(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + "/types").pipe(tap((res: any) => {
    }))
  }

  public newType(type: any): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "/types", type).pipe(tap((res: any) => {
    }))
  }

  public patchType(type: any, id: any): Observable<any> {
    return this.httpClient.patch<any>(this.apiServer + "/types/" + id, type).pipe(tap((res: any) => {
    }))
  }

  public deleteType(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + "/types/" + id).pipe(tap((res: any) => {
    }))
  }
}