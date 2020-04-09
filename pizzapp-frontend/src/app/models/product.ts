import { Ingredient } from './ingredient';

export class Product {
    _id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    ingredients: Ingredient[] = [];
}