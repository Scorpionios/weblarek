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
basketModel.addItem({
    category: "софт-скил",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    id: "854cef69-976d-4c2a-a18c-2aa45046c390",
    image: "/5_Dots.avif",
    price: 750,
    title: "+1 час в сутках"
}, productsModel.getItems());
basketModel.addItem({
    category: "другое",
    description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    image: "/Shell.avif",
    price: 1450,
    title: "HEX-леденец"
}, productsModel.getItems());
basketModel.addItem({
    category: "софт-скил",
    description: "Будет стоять над душой и не давать прокрастинировать.",
    id: "b06cde61-912f-4663-9751-09956c0eed67",
    image: "/Asterisk_2.avif",
    price: null,
    title: "Мамка-таймер"
}, productsModel.getItems());
console.log("Массив товаров из корзины: ", basketModel.getItems());
console.log("Сумма товаров в корзине: ", basketModel.sumProducts());
console.log("Количество товаров в корзине: ", basketModel.quantity());


basketModel.deletItem("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Массив товаров из корзины: ", basketModel.getItems());
basketModel.cleaning()
console.log("Массив товаров из корзины: ", basketModel.getItems());
console.log("проверка наличия товара из корзины в каталоге: ", basketModel.checkingAvailability("854cef69-976d-4c2a-a18c-2aa45046c390", productsModel.getItems()));
basketModel.addItem({
    category: "другое",
    description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    image: "/Shell.avif",
    price: 1450,
    title: "HEX-леденец"
}, productsModel.getItems());

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
const pop = new ApiFromServer(api);

async function initApi() {
  const data = await pop.getApiProduct();
  return data
}
initApi().then(data => {
    console.log("Данные с сервера: ", data);
})
.catch(console.error);

const order: Order = {
    items: basketModel.getItems().map((product) => {
        return product.id
    }),
    ...user.getuser(),
    total: basketModel.sumProducts(),
}