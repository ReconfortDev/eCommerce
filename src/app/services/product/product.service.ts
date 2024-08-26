import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import ProductModel from "../../modals/productModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = '/assets/db/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error('Error fetching products', error);
        return of([]);
      }
    ));
  }
}
