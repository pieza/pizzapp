import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './BaseHttpService';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService<Product> {
  constructor(private http: HttpClient) { 
    super(http, '/products')
  }
}