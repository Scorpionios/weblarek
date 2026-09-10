import { ensureElement, ensureAllElements } from '../../utils/utils';
import { Form } from "./Form";
import { FormData } from "../../types/index";
import { IEvents } from "../base/Events.ts";

interface ContactsFormData extends FormData {
    email: string;
    phone: string;
}

export class ContactsForm extends Form<ContactsFormData> {
    protected buttoncontacts: HTMLButtonElement;
    protected inputForm: HTMLInputElement[];

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(container);

        this.buttoncontacts = ensureElement<HTMLButtonElement>('.button', this.container);
        this.inputForm = ensureAllElements<HTMLInputElement>(".form__input", this.container);

        this.inputForm.forEach((input) => {
            input.addEventListener('input', () => {
                if (input.name == 'phone') {
                    this.events.emit('formContacts:changed', { 
                        field: 'phone', 
                        value: input.value
                    });
                } else {
                    this.events.emit('formContacts:changed', { 
                        field: 'email', 
                        value: input.value 
                    });
                }
            });
        });

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('form:arrange');
        });
    }

    protected set email(value: string) {
        const input = this.inputForm.find((input: HTMLInputElement) => input.name === 'email');
        if (input) input.value = value
    }

    protected set phone(value: string) {
        const input = this.inputForm.find((input: HTMLInputElement) => input.name === 'phone');
        if (input) input.value = value
    }

    protected set valid(value: boolean) {
        this.buttoncontacts.disabled = !value;
    }
}