import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NunuService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = 'https://nununu-project-production.up.railway.app/'
  private registeredEmail: string = 'morrevah10@gmail.com';


  constructor(private http: HttpClient) {}

  // login(email: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/login?email=${email}`);
  // }

  checkEmail(email: string): boolean {
    return email === this.registeredEmail;
  }

  submitOrder(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload_new_order/`, formData);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_all_orders/`);
  }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_all_drops_warehouse/`);
  }

  deleteOrder(orderId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/delete_order/${orderId}`);
  }
}
