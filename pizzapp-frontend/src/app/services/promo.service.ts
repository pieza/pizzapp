import { Injectable } from '@angular/core';
import { BaseHttpService } from './BaseHttpService';
import { Promo } from '../models/promo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromoService extends BaseHttpService<Promo> {
  constructor(private http: HttpClient) { 
    super(http, '/promos')
  }
}