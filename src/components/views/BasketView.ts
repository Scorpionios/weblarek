import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from "../base/Events";

interface BasketData {
    content: HTMLElement[];
    total: number;
    valid: boolean;
};

export class BasketView extends Component<BasketData> {
    protected basketButton: HTMLButtonElement;
    protected basketContent: HTMLElement;
    protected basketPrice: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.basketButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);
        this.basketContent = ensureElement<HTMLElement>(".basket__list", this.container);
        this.basketPrice = ensureElement<HTMLElement>(".basket__price", this.container);

        this.basketButton.addEventListener(`click`, () => {
            this.events.emit(`basket:arrange`);
        });
    }

    protected set content (value: HTMLElement[]) {
        this.basketContent.replaceChildren(...value);
    }

    protected set total (value: number) {
        this.basketPrice.textContent =`${value} синапсов`;
    }

    protected set valid(value: boolean) {
        this.basketButton.disabled = !value;
    }
}