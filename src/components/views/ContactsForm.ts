import { ensureElement } from '../../utils/utils';
import { Form } from "./Form";
import { IFormState, IBuyer } from "../../types/index";
import { IEvents } from "../base/Events.ts";

type ContactsFormData = Pick<IBuyer, 'email' | 'phone'> & IFormState 

export class ContactsForm extends Form<ContactsFormData> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.events.emit('formContacts:changed', {
                field: this.emailInput.name,
                value: this.emailInput.value,
            }); 
        })
        this.phoneInput.addEventListener('input', () => {
            this.events.emit('formContacts:changed', {
                field: this.phoneInput.name,
                value: this.phoneInput.value,
            }); 
        })
    }

    protected set email(value: string) {
        this.emailInput.value = value
    }

    protected set phone(value: string) {
        this.phoneInput.value = value
    }
}