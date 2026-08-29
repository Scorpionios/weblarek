import {IProduct} from "../../types/index.ts";

export class Catalog {
    private items: IProduct[] = [];
    private card: IProduct | undefined;

    constructor () {
        
    }

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems (): IProduct[] {
        return this.items
    }

    searchId (enteredId: string): IProduct | undefined {
        return this.items.find((product: IProduct) => product.id === enteredId)
    }

    setCard (enteredId: string): void {
        this.card = this.items.find((product: IProduct) => product.id === enteredId);
    }

    getCard (): IProduct | undefined {
        return this.card
    }
}