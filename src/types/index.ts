export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
};

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

export type payment = "card" | "cash" | "";

export interface IBuyer {
    payment: payment;
    email: string;
    phone: string;
    address: string;
};

export type Response = {
    items: IProduct[],
    id: IProduct['id'],
    total: number
};

export type Order = IBuyer & {total: number, items: string[]};