import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IFormState } from "../../types/index";
import { IEvents } from "../base/Events.ts";

export abstract class Form<T extends IFormState> extends Component<T> {
    protected errorForm: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.errorForm = ensureElement<HTMLElement>(".form__errors", this.container);
        this.submitButton = ensureElement<HTMLButtonElement>("button[type='submit']", this.container);
    
        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submit`);
        }); 
    }

    protected set error (value: string) {
        this.errorForm.textContent = value;
    }

    protected set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }
}