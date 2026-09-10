import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { ProductData } from "../../types/index";

export class Product<T extends ProductData> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    protected set title(value: string) {
        this.titleElement.textContent = value;
    }

    protected set price(value: number) {
        if (value == null) {
            this.priceElement.textContent = `Бесценно`;
        } else {
            this.priceElement.textContent = `${value} синапсов`;
        }
    }
}