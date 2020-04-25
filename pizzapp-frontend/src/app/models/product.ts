import { Ingredient } from './ingredient';

export class Product {
    _id?: string;
    image_url: string;
    ingredients: Ingredient[] = [];
}