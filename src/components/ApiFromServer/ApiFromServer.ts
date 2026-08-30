import { IApi, Order, ResponseProducts, ResponseOrder } from "../../types/index";

export class ApiFromServer {
    private api: IApi
    constructor(api: IApi) {
        this.api = api
    }

    getApiProduct (): Promise<ResponseProducts> {
        return this.api.get<ResponseProducts>("/product/")
    }

    postApiOrder (order: Order): Promise<ResponseOrder> {
        return this.api.post<ResponseOrder>("/order", order)
    }
}