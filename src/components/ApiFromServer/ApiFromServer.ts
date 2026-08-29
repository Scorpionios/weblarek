import { IApi, Order, Response } from "../../types/index";

export class ApiFromServer {
    api: IApi
    constructor(api: IApi) {
        this.api = api
    }

    async getApi (uri: string): Promise<Response> {
        return await this.api.get(uri)
    }

    async postApi (uri: string, order: Order): Promise<Response> {
        return await this.api.post(uri, order)
    }
}