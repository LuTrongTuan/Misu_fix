import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private router: Router, private http: HttpClient) { }

  getList(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/order/get-list', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/order/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updateStatus(id: any, status: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + `api/v1/Order/updateStatus/${id}/${status}`)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  createOrderInfor(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + `api/v1/orderInfor`, req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getOrderInfor(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + `api/v1/orderInfor/filter`, req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteOrderInfor(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/orderInfor/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  cancleOrderInfo(order_infor_id: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/orderInfor/cancleOrder/' + order_infor_id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  
  getByIdOrderInfor(order_infor_id: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/orderInfor/getById/' + order_infor_id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updateItemOrderInfo(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/orderInfor/updateItem', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updateOrder(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/orderInfor/updateOrder', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
