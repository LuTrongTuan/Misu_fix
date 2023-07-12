import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {  
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration,private router: Router,private http : HttpClient) {}

  getList(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/account/get-list', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(account: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/account', account)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/account/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getDataPosition(): Observable<any> {
    return this.http.get<any>('https://provinces.open-api.vn/api/?depth=3')
      .pipe(
        map((z) => {
          return z;
        })
      )
  }
}
