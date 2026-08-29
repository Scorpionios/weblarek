import {IProduct} from "../../types/index.ts";

export class Catalog {
    private items: IProduct[] = [];
    private card?: IProduct;

    constructor () {
        
    }

    setItems(items: IProduct[]): void {
        if (!Array.isArray(items)) {throw new Error('Ожидается массив')};
        this.items = items;
    }

    getItems (): IProduct[] {
        return [...this.items]
    }

    setFindId (enteredId: string): IProduct | undefined {
        return this.items.find((product: IProduct) => product.id === enteredId)
    }

    setCard (enteredId: string): void {
        this.card = this.items.find((product: IProduct) => product.id === enteredId);
    }

    getCard (): IProduct | undefined {
        return this.card
    }
}