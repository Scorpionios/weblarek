import { ensureElement } from '../../utils/utils';
import { Product } from "./Product";
import { ProductData, ICardActions } from "../../types/index";
import { IEvents } from "../base/Events";

interface ProductBasketData extends ProductData {
    index: number;
}

export class ProductBasket extends Product<ProductBasketData> {
    protected indexElement: HTMLElement;
    protected deletButton: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deletButton = ensureElement<HTMLElement>('.basket__item-delete', this.container);
        
        if (actions?.onClick) {
            this.deletButton.addEventListener('click', actions.onClick)
        }
    }

    protected set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}