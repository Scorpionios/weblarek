import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { FormData } from "../../types/index";

export class Form<T extends FormData> extends Component<T> {
    protected errorForm: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.errorForm = ensureElement<HTMLElement>(".form__errors", this.container);
    }

    protected set error (value: string) {
        this.errorForm.textContent = value;
    }
}