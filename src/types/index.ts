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

export type Payment = "card" | "cash" | "";

export interface IBuyer {
    payment: Payment;
    email: string;
    phone: string;
    address: string;
};

export interface ResponseProducts {
    items: IProduct[],
    total: number
};

export interface ResponseOrder {
    total: number,
    id: string
}

export interface Order extends IBuyer {
    total: number,
    items: string[]
};