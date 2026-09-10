import './scss/styles.scss';
import { Catalog } from "./components/Catalog/Catalog";
import { Basket } from "./components/Basket/Basket";
import { Customer } from "./components/Customer/Customer";
import { ApiFromServer } from "./components/ApiFromServer/ApiFromServer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { Order, IProduct, Payment } from "./types/index";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Header } from "./components/views/Header";
import { Gallery } from "./components/views/Gallery";
import { ProductCatalog } from "./components/views/ProductCatalog";
import { ProductBasket } from "./components/views/ProductBasket";
import { Modal } from "./components/views/Modal";
import { ProductPreview } from "./components/views/ProductPreview";
import { BasketView } from "./components/views/Basket";
import { EventEmitter } from "./components/base/Events";
import { OrderForm } from "./components/views/OrderForm";
import { ContactsForm } from "./components/views/ContactsForm";
import { Success } from "./components/views/Success";

// переменные
const events = new EventEmitter();
const productsModel = new Catalog(events);
const basketModel = new Basket(events);
const user = new Customer(events);

const basketv = new BasketView(events, cloneTemplate<HTMLElement>("#basket"));
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const catalog = new Gallery(ensureElement<HTMLElement>(".gallery"));
const modal = new Modal(events, ensureElement<HTMLElement>("#modal-container"));
const cardPreview = new ProductPreview(events, cloneTemplate<HTMLElement>("#card-preview"))
const formOrder = new OrderForm(events, cloneTemplate<HTMLFormElement>("#order"));
const formContacts = new ContactsForm(events, cloneTemplate<HTMLFormElement>("#contacts"));
const success = new Success(events, cloneTemplate<HTMLElement>("#success"));

const api = new Api(API_URL);
const receivingProducts = new ApiFromServer(api);

events.on('catalog:changed', () => {
    const itemcards = productsModel.getItems().map((item) => {
        const card = new ProductCatalog(cloneTemplate<HTMLElement>("#card-catalog"), {
            onClick: () => events.emit('card:select', item),
        });

        return card.render(item)
    });
    catalog.render({catalog: itemcards})
});

events.on('basket:changed', () => {
    header.render({
        counter: basketModel.quantity()
    });
    const itemcards = basketModel.getItems().map((item, index) => {
        const displayIndex = index + 1;
        const card = new ProductBasket(cloneTemplate<HTMLElement>("#card-basket"), {
            onClick: () => events.emit('card:deleted', item),
        });
        return card.render({
            ...item,
            index: displayIndex
        })
    });
    basketv.render({
        content: itemcards,
        total: basketModel.sumProducts(),
        valid: basketModel.quantity() !== 0
    })
});

events.on('basket:open', () => {
    modal.render({content: basketv.render({
        valid: basketModel.quantity() !== 0
    })});
});

events.on('modal:closed', () => {
    modal.close();
});

events.on('card:select', (item: IProduct) => {
    productsModel.setCard(item.id);
});

events.on('card:changed', () => {
    const item = productsModel.getCard();
    if (item) {
        const button = item.price
        ? basketModel.checkingAvailability(item.id)
        ? {button: "Удалить из корзины", valid: true}
        : {button: "В корзину", valid: true}
        : {button: "Недоступно", valid: false}

        modal.render({
            content: cardPreview.render({
                ...item,
                ...button
            })
        })
    }
})

events.on('product:changedStatus', () => {
    const item = productsModel.getCard();
    if (item) {
        if (basketModel.checkingAvailability(item.id)) {
            events.emit('card:deleted', item);
            cardPreview.render({ button: "В корзину" });
        } else {
            basketModel.addItem(item);
            cardPreview.render({ button: "Удалить из корзины" });
        }
    }
})

events.on('card:deleted', (item: IProduct) => {
    basketModel.deletItem(item.id);
});

events.on('basket:arrange', () => {
    modal.render({content: formOrder.render()});
});

events.on('formOrder:changed', (data: { field: 'payment' | 'address'; value: Payment }) => {
    if (data.field === 'payment') {
        user.setuser({payment: data.value});
    } else {
        user.setuser({address: data.value});
    }
});

events.on('user:changed', () => {
    const state = user.getuser();
    const errors = user.validation();
    const orderFields = ['address', 'payment'] as const
    const contactsFields = ['email', 'phone'] as const
    const orderErrors = orderFields
        .filter(key => errors[key]) 
        .map(key => errors[key]);
    const contactsErrors = contactsFields
        .filter(key => errors[key]) 
        .map(key => errors[key]);
    const orderTouched = state.payment !== '' || state.address !== '';
    const contactsTouched = state.email !== '' || state.phone !== '';
    
    formOrder.render({
        ...state,
        valid: Object.keys(orderErrors).length === 0,
        error: orderTouched ? Object.values(orderErrors).join('; ') : ''
    })

    formContacts.render({
        ...state,
        valid: Object.keys(contactsErrors).length === 0,
        error: contactsTouched ? Object.values(contactsErrors).join('; ') : ''
    })
})

events.on('formOrder:submitted', () => {
    modal.render({content: formContacts.render()});
});

events.on('formContacts:changed', (data: { field: 'phone' | 'email'; value: string }) => {
    if (data.field === 'phone') {
        user.setuser({phone: data.value});
    } else {
        user.setuser({email: data.value});
    }
})

events.on('form:arrange', () => {
    const order: Order = {
        items: basketModel.getItems().map((product) => {
            return product.id
        }),
        ...user.getuser(),
        total: basketModel.sumProducts(),
    }
    receivingProducts.postApiOrder(order)
    .then(data => {
        modal.render({content: success.render({
            total: data.total
        })});
        basketModel.cleaning();
        user.deleteUser();
    })
    .catch(console.error);
});

receivingProducts.getApiProduct()
.then(data => {
    productsModel.setItems(data.items);
    console.log("Данные с сервера: ", productsModel.getItems());
})
.catch(console.error);