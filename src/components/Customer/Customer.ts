import { IBuyer, payment } from "../../types/index";

export class Customer {
    private user: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: ""
    };

    constructor() {
        
    }

    setuser (payment: payment, email: string, phone: string, address: string): void {
        this.user = {
            ...this.user,
            payment,
            email,
            phone,
            address
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

    validation (): {} {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[78]?\d{11}$/;
        let errorValidation: {} = {
            payment: "",
            email: "",
            phone: "",
            address: ""
        };

        if (!this.user.payment) {
            errorValidation = {
                ...errorValidation,
                payment: "не выбран вид оплаты" as string
            }
        };

        if (!this.user.email) {
            errorValidation = {
                ...errorValidation,
                email: "Укажите email"
            }
        } else if (!emailRegex.test(this.user.email)) {
            errorValidation = {
                ...errorValidation,
                email: "Укажите корректный email"
            }
            this.user = {
                ...this.user, 
                email: ""
            }
        };

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
        } else if (/[^+\(\)-\s\d]/g.test(this.user.phone)) {
            errorValidation = {
                    ...errorValidation,
                    phone: "Введите корректный номер телефона"
            }
            this.user = {
                ...this.user, 
                phone: ""
            }
        } else {
            let phone = this.user.phone.replace(/[^\d+]/g, '')
            if (!phoneRegex.test(phone)) {
                errorValidation = {
                    ...errorValidation,
                    phone: "Введите корректный номер телефона"
                }
                this.user = {
                    ...this.user, 
                    phone: ""
                }
            }
        }
        
        return errorValidation
    }
}