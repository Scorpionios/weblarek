import './scss/styles.scss';
import { apiProducts } from "./utils/data"
import { Catalog } from "./components/Catalog/Catalog";
import { Basket } from "./components/Basket/Basket";
import { Customer } from "./components/Customer/Customer";
import { ApiFromServer } from "./components/ApiFromServer/ApiFromServer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { Order } from "./types/index";

// переменные
const productsModel = new Catalog();
const basketModel = new Basket();
const user = new Customer();

// проверка методов каталога
productsModel.setItems(apiProducts.items);
console.log("Массив товаров из каталога", productsModel.getItems());
console.log("Поиск по id 854cef69-976d-4c2a-a18c-2aa45046c390: ", productsModel.searchId("854cef69-976d-4c2a-a18c-2aa45046c390"));
productsModel.setCard("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
console.log("Выбранная карточка товара: ", productsModel.getCard());

// проверка методов корзины
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
basketModel.addItem(apiProducts.items[2]);
console.log("Массив товаров из корзины: ", basketModel.getItems());
console.log("Сумма товаров в корзине: ", basketModel.sumProducts());
console.log("Количество товаров в корзине: ", basketModel.quantity());
console.log("проверка наличия товара в корзине: ", basketModel.checkingAvailability(apiProducts.items[0]));
basketModel.deletItem("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Массив товаров из корзины: ", basketModel.getItems());
basketModel.cleaning()
console.log("Массив товаров из корзины: ", basketModel.getItems());
basketModel.addItem(apiProducts.items[0]);

// проверка методов пользователя
user.setuser({
    email: "raspm.ru",
    address: "Улица Гайдара"
});

console.log("Валидация: ", user.validation());
user.setuser({
    payment: "card",
    email: "rasp@m.ru",
    phone: "+7(800) 555 53-85",
});
console.log("Обновлённые данные пользователя: ", user.getuser());
console.log("Валидация: ", user.validation());
user.deleteUser();
console.log("Данные пользователя после очистки: ", user.getuser());

// запрос на сервер
const api = new Api(API_URL);
const receivingProducts = new ApiFromServer(api);

receivingProducts.getApiProduct()
.then(data => {
    productsModel.setItems(data.items);
    console.log("Данные с сервера: ", productsModel.getItems());
})
.catch(console.error);

const order: Order = {
    items: basketModel.getItems().map((product) => {
        return product.id
    }),
    ...user.getuser(),
    total: basketModel.sumProducts(),
}