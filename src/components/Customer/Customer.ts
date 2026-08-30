import { IBuyer, TBuyerErrors } from "../../types/index";

export class Customer {
    private user: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: ""
    };

    constructor() {
        
    }

    setuser (updates: Partial<IBuyer>): void {
        this.user = {
            ...this.user,
            ...updates
        }
    }

    getuser (): IBuyer {
        return this.user
    }

    deleteUser (): void {
        this.user = {
            payment: "",
            email: "",
            phone: "",
            address: ""
        };
    }

    validation (): TBuyerErrors {
        let errorValidation: TBuyerErrors = {};

        if (!this.user.payment) {
            errorValidation = {
                ...errorValidation,
                payment: "не выбран вид оплаты"
            }
        };

        if (!this.user.email) {
            errorValidation = {
                ...errorValidation,
                email: "Укажите email"
            }
        }

        if (!this.user.address) {
            errorValidation = {
                ...errorValidation,
                address: "Укажите адрес"
            }
        };

        if (!this.user.phone) {
            errorValidation = {
                ...errorValidation,
                phone: "Укажите номер телефона"
            }
        }
        
        return errorValidation
    }
}