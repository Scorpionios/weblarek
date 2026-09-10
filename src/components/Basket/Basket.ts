import {IProduct} from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Basket {
    private items: IProduct[] = [];

    constructor (protected events: IEvents) {}

    getItems (): IProduct[] {
        return this.items
    }

    addItem (item: IProduct): void {
        this.items.push(item);
        this.events.emit(`basket:changed`);
    }

    deletItem (enteredId: string): void {
        this.items = this.items.filter((product: IProduct) => product.id !== enteredId);
        this.events.emit(`basket:changed`);
    }

    cleaning (): void {
        this.items = [];
        this.events.emit(`basket:changed`);
    }

    sumProducts (): number {
         return this.items.reduce((total, item) => total + (item.price || 0), 0);
    }

    quantity (): number {
        return this.items.length
    }

    checkingAvailability (enteredId: string): boolean {
        return this.items.some((product: IProduct) => product.id === enteredId);
    }
}