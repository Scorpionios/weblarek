import { ensureElement } from '../../utils/utils';
import { Product } from "./Product";
import { ProductData } from "../../types/index";
import { colorCategory } from "../Function/ColorCategory";
import { IEvents } from "../base/Events";

interface ProductPreviewData extends ProductData {
    category: string;
    image: string;
    description: string;
    button: string;
    valid: boolean;
};

export class ProductPreview extends Product<ProductPreviewData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected buyButtonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buyButtonElement = ensureElement<HTMLButtonElement>('.card__row .card__button', this.container);

        this.buyButtonElement.addEventListener(`click`, () => {
            this.events.emit(`product:changedStatus`, this);
        });
    }

    protected set category(value: string) {
        this.categoryElement.textContent = value;
        colorCategory(this.categoryElement);
    }

    protected set image(value: string) {
        this.imageElement.src = value;
    }

    protected set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    protected set button(value: string) {
        this.buyButtonElement.textContent = value;
    }

    protected set valid(value: boolean) {
        this.buyButtonElement.disabled = !value;
    }
}