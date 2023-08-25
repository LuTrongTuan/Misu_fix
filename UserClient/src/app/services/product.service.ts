import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private router: Router, private http: HttpClient) { }

  getList(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/get-list', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getByFilter(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/get-list', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getImage(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/productattribute/image')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getDetail(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/productattribute/detail')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getListAll(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/product_all')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getColor(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/productattribute/color')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertImage(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/productattribute/image', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertDetail(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/productattribute/detail/save', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertColor(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/productattribute/color', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(product: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product', product)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  minusAmount(product_attribue: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/minus-amount', product_attribue)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  
  increaseAmount(product_attribue: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/increase-amount', product_attribue)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  increasesAmountCart(cartItem: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/increases-amountCart', cartItem)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/product/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteImage(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/productattribute/image/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteDetail(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/productattribute/detail/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getProductAttribute(id: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + `api/v1/productattribute/detail/${id}`)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteColor(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/productattribute/color/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  filter(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/v1/product/filter', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getListSize(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/product/sizes')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
