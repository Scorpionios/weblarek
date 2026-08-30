import {IProduct} from "../../types/index.ts";

export class Basket {
    private items: IProduct[] = [];

    constructor () {

    }

    getItems (): IProduct[] {
        return this.items
    }

    addItem (item: IProduct): void {
        this.items.push(item);
    }

    deletItem (enteredId: string): void {
        this.items = this.items.filter((product: IProduct) => product.id !== enteredId);
    }

    cleaning (): void {
        this.items = [];
    }

    sumProducts (): number {
         return this.items.reduce((total, item) => total + (item.price || 0), 0);
    }

    quantity (): number {
        return this.items.length
    }

    checkingAvailability (item: IProduct): boolean {
        return this.items.some((product: IProduct) => product.id === item.id);
    }
}