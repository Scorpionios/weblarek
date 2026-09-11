import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface ModalData {
    content: HTMLElement;
};

export class Modal extends Component<ModalData> {
    protected modalButton: HTMLButtonElement;
    protected modalContent: HTMLElement;
    protected modalWindow: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.modalButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
        this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);
        this.modalWindow = ensureElement<HTMLElement>(".modal__container", this.container);

        this.modalButton.addEventListener(`click`, this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.modalWindow.addEventListener('click', (event) => event.stopPropagation());
    }

    protected set content (value: HTMLElement) {
        this.modalContent.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.modalContent.replaceChildren();
    }
}