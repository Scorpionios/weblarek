import './scss/styles.scss';
import { apiProducts } from "./utils/data"
import { Catalog } from "./components/Catalog/Catalog";
import { Basket } from "./components/Basket/Basket";
import { Customer } from "./components/Customer/Customer";
import { ApiFromServer } from "./components/ApiFromServer/ApiFromServer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { Order, Response } from "./types/index";

// переменные
const api = new Api(API_URL);
const pop = new ApiFromServer(api);
const productsModel = new Catalog();
const getApi: Response = await pop.getApi("/product/");
const basketModel = new Basket((getApi).items);
const user = new Customer();

// проверка методов каталога
productsModel.setItems((getApi).items);
console.log("Массив товаров из каталога", productsModel.getItems());
console.log("Поиск по id 854cef69-976d-4c2a-a18c-2aa45046c390: ", productsModel.setFindId("854cef69-976d-4c2a-a18c-2aa45046c390"));
productsModel.setCard("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
console.log("Выбранная карточка товара: ", productsModel.getCard());

// проверка методов корзины
basketModel.addItem("854cef69-976d-4c2a-a18c-2aa45046c390");
basketModel.addItem("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
basketModel.addItem("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// этого товара нет в каталоге
basketModel.addItem("412bc");
console.log("Массив товаров из корзины: ", basketModel.getItems());
console.log("Сумма товаров в корзине: ", basketModel.sumProducts());
console.log("Количество товаров в корзине: ", basketModel.quantity());


basketModel.deletItem("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Массив товаров из корзины: ", basketModel.getItems());
basketModel.cleaning()
console.log("Массив товаров из корзины: ", basketModel.getItems());
console.log("проверка наличия товара из корзины в каталоге: ", basketModel.checkingAvailability("854cef69-976d-4c2a-a18c-2aa45046c390"));
basketModel.addItem("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");

// проверка методов пользователя
user.setuser("card","raspm.ru","+7(800) 555 53-8","Улица Гайдара");
console.log("Данные пользователя до проверки: ", user.getuser());
user.validation();
console.log("Данные пользователя после проверки: ", user.getuser());
user.deleteUser();
console.log("Данные пользователя после очистки: ", user.getuser());
user.setuser("card","raspm.ru","+7(800) 555 53-8","Улица Гайдара");

const order: Order = {
    items: basketModel.getItems().map((product) => {
        return product.id
    }),
    ...user.getuser(),
    total: basketModel.sumProducts(),
}
console.log("Полученый ответ от сервера: ", await pop.postApi("/order", order));