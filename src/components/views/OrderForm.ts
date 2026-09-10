import { ensureElement, ensureAllElements } from '../../utils/utils';
import { Form } from "./Form";
import { FormData, Payment } from "../../types/index";
import { IEvents } from "../base/Events.ts";

interface OrderFormData extends FormData {
    payment: Payment | null;
    address: string;
}

export class OrderForm extends Form<OrderFormData> {
    protected buttonPayment: HTMLButtonElement[];
    protected buttonOrder: HTMLButtonElement;
    protected inputForm: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(container);

        this.buttonPayment = ensureAllElements<HTMLButtonElement>(
            '.button_alt',
            this.container
        );
        this.buttonOrder = ensureElement<HTMLButtonElement>('.order__button', this.container);
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
        
        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('formOrder:submitted');
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

    protected set valid(value: boolean) {
        this.buttonOrder.disabled = !value;
    }
}