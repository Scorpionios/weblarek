import { ensureElement, ensureAllElements } from '../../utils/utils';
import { Form } from "./Form";
import { IFormState, Payment, IBuyer } from "../../types/index";
import { IEvents } from "../base/Events.ts";

type OrderFormData = Pick<IBuyer, 'payment' | 'address'> & IFormState 

export class OrderForm extends Form<OrderFormData> {
    protected buttonPayment: HTMLButtonElement[];
    protected inputForm: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.buttonPayment = ensureAllElements<HTMLButtonElement>(
            '.button_alt',
            this.container
        );
        this.inputForm = ensureElement<HTMLInputElement>(".form__input", this.container);

        this.buttonPayment.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit('formOrder:changed', { 
                    field: 'payment', 
                    value: button.name 
                });
            });
        });

        this.inputForm.addEventListener('input', () => {
            this.events.emit('formOrder:changed', {
                field: 'address',
                value: this.inputForm.value,
            });
        });
    }

    protected set payment(value: Payment) {
        this.buttonPayment.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === value);
        });
    }

    protected set address(value: string) {
        this.inputForm.value = value;
    }
}