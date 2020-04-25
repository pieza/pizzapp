export class Order {
    _id?: string;
    user_id: string;
    products: any;
    promo_id?: string;
    status?: string;
    date?: Date;
}