import { ensureElement } from '../../utils/utils';
import { ProductMidtermData, IProduct } from "../../types/index";
import { IEvents } from "../base/Events";
import { ProductMidterm } from "./ProductMidterm";

type ProductPreviewData = Pick<IProduct, 'description'> 
& ProductMidtermData 
& {
    button: string;
    valid: boolean;
};

export class ProductPreview extends ProductMidterm<ProductPreviewData> {
    protected descriptionElement: HTMLElement;
    protected buyButtonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buyButtonElement = ensureElement<HTMLButtonElement>('.card__row .card__button', this.container);

        this.buyButtonElement.addEventListener(`click`, () => {
            this.events.emit(`product:changedStatus`);
        });
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