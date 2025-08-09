import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

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

  getProductsBySkusWithReason(skusWithReason: { sku: string, reason?: string }[]): Observable<Product[]> {
    console.log("load products for upsell")
    const skus = skusWithReason.map(item => item.sku).filter(Boolean);
    const filteredSkus = skus.filter((sku, idx, arr) => arr.indexOf(sku) === idx);
    let params = new HttpParams();
    if (filteredSkus.length) {
      params = params.set('ids', filteredSkus.join(','));
    }
    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      // Die Reason-Infos wieder an die Produkte mappen
      map(products => products.map(product => {
        const found = skusWithReason.find(item => item.sku === product.sku);
        return found ? { ...product, reason: found.reason } : product;
      }))
    );
  }

  getProductsBySkus(skus: string[]): Observable<Product[]> {
    const filteredSkus = skus.filter((sku, idx, arr) => !!sku && arr.indexOf(sku) === idx);
    let params = new HttpParams();
    if (filteredSkus.length) {
      params = params.set('ids', filteredSkus.join(','));
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
