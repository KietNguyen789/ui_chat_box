import { makeAutoObservable } from "mobx";
import type { ProductModelWithLike } from "../../pages/dashboard/product_component/productModel";

export const priceFilter = ["all", "<500K", "500K-1M", ">1M"];

class UserStore {
    list_click: number[] = [];
    love_pro: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addNewId(product_id: number) {
        if (!this.list_click.includes(product_id)) {
            this.list_click = [...this.list_click, product_id]
            console.log('addList: ', this.list_click);

        }
        else return

    }

    get getListClick() {
        console.log(this.list_click);

        return this.list_click
    }



}

export const userStore = new UserStore();
