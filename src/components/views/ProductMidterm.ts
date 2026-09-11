import { ensureElement } from '../../utils/utils';
import { Product } from "./Product";
import { ProductMidtermData } from "../../types/index";
import { categoryMap } from "../../utils/constants";

type CategoryKey = keyof typeof categoryMap;

export abstract class ProductMidterm<T extends ProductMidtermData> extends Product<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    protected set category(value: string) {
        this.categoryElement.textContent = value;
        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value
            );
        }
    }
    
    protected set image(value: string) {
        this.imageElement.src = value;
    }
}