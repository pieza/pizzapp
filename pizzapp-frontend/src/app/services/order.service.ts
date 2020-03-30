import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './BaseHttpService';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService<Order> {
  constructor(private http: HttpClient) { 
    super(http, '/orders')
  }
}
