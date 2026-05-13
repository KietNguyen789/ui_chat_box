import { makeAutoObservable } from "mobx";

const HISTORY_KEY = 'view_history';

class UserStore {
    list_click: number[] = [];

    constructor() {
        makeAutoObservable(this);
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            try {
                this.list_click = JSON.parse(saved);
            } catch {
                this.list_click = [];
            }
        }
    }

    addNewId(product_id: number) {
        if (!this.list_click.includes(product_id)) {
            this.list_click = [...this.list_click, product_id];
            localStorage.setItem(HISTORY_KEY, JSON.stringify(this.list_click));
        }
    }

    get getListClick() {
        return this.list_click;
    }

    clearHistory() {
        this.list_click = [];
        localStorage.removeItem(HISTORY_KEY);
    }
}

export const userStore = new UserStore();
