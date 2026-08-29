import {IProduct} from "../../types/index.ts";

export class Basket {
    private items: IProduct[] = [];
    private products: IProduct[];

    constructor (products: IProduct[]) {
        this.products = products;
    }

    getItems (): IProduct[] {
        return [...this.items]
    }

    addItem (enteredId: string): void {
        const product = this.products.find((product: IProduct) => product.id === enteredId);
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
            const price = product.price as number;
            return total + price
        }, 0);
    }

    quantity (): number {
        return this.items.length
    }

    checkingAvailability (enteredId: string): boolean {
        return this.products.some((product: IProduct) => product.id === enteredId);
    }
}