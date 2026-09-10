import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from "../base/Events";

interface HeaderData {
    counter: number
};

export class Header extends Component<HeaderData> {
    protected basketButton: HTMLButtonElement;
    protected basketCounter: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.basketButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);
        this.basketCounter = ensureElement<HTMLElement>(".header__basket-counter", this.container);

        this.basketButton.addEventListener(`click`, () => {
            this.events.emit(`basket:open`);
        });
    }

    protected set counter (value: number) {
        this.basketCounter.textContent = String(value);
    }
}