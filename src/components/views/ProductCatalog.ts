import { ensureElement } from '../../utils/utils';
import { Product } from "./Product";
import { ProductData, ICardActions } from "../../types/index";
import { colorCategory } from "../Function/ColorCategory";

interface ProductCatalogData extends ProductData {
    category: string;
    image: string;
};

export class ProductCatalog extends Product<ProductCatalogData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
    }

    protected set category(value: string) {
        this.categoryElement.textContent = value;
        colorCategory(this.categoryElement);
    }

    protected set image(value: string) {
        this.imageElement.src = value;
    }
}