import { Product } from './product';

export class Cart {
    _id?: string;
    user_id: string;
    products: Product[];
}