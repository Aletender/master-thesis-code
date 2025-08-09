import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  isNeutered?: boolean;
  birthDate?: string;
}

export interface Customer {
  _id: string;
  customerNumber: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  pets: Pet[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomerById(id: string): Observable<Customer> {
    console.log(`${this.apiUrl}/${id}`)
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
