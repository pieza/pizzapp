import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './BaseHttpService';
import { Ingredient } from 'src/app/models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends BaseHttpService<Ingredient> {
  constructor(private http: HttpClient) { 
    super(http, '/ingredients')
  }
}
