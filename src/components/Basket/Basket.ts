import {IProduct} from "../../types/index.ts";

export class Basket {
    private items: IProduct[] = [];

    constructor () {

    }

    getItems (): IProduct[] {
        return this.items
    }

    addItem (item: IProduct, products: IProduct[]): void {
        const product = products.find((product: IProduct) => product.id === item.id);
        if ((product) && (product.price !== null)) {
            this.items.push(product);
        }
    }

    deletItem (enteredId: string): void {
        this.items = this.items.filter((product: IProduct) => product.id !== enteredId);
    }

    cleaning (): void {
        this.items = [];
    }

    sumProducts (): number {
        return this.items.reduce((total, product) => {
            let price = product.price;
            if (price == null) {
                price = 0
            }
            return total + price
        }, 0);
    }

    quantity (): number {
        return this.items.length
    }

    checkingAvailability (enteredId: string, products: IProduct[]): boolean {
        return products.some((product: IProduct) => product.id === enteredId);
    }
}