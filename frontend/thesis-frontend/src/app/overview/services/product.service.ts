import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProductsByTaskProducts(taskProducts: { sku: string, quantity: number }[]): Observable<Product[]> {
    const skus = taskProducts.map(tp => tp.sku).filter(sku => !!sku);
    const filteredSkus = skus.filter((sku, idx, arr) => arr.indexOf(sku) === idx);
    let params = new HttpParams();
    if (filteredSkus.length) {
      params = params.set('ids', filteredSkus.join(','));
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
