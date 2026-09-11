import { ProductMidterm } from "./ProductMidterm";
import { ICardActions, ProductMidtermData } from "../../types/index";

export class ProductCatalog extends ProductMidterm<ProductMidtermData> {
    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
    }
}