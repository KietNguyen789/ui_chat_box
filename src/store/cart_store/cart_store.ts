import { makeAutoObservable } from 'mobx';

const CART_KEY = 'cart_items';

export interface CartItem {
    productId: number;
    quantity: number;
}

class CartStore {
    items: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);
        try {
            const saved = localStorage.getItem(CART_KEY);
            if (saved) this.items = JSON.parse(saved);
        } catch {
            this.items = [];
        }
    }

    private save() {
        localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    }

    addToCart(productId: number) {
        const existing = this.items.find(i => i.productId === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items = [...this.items, { productId, quantity: 1 }];
        }
        this.save();
    }

    removeFromCart(productId: number) {
        this.items = this.items.filter(i => i.productId !== productId);
        this.save();
    }

    updateQuantity(productId: number, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        const item = this.items.find(i => i.productId === productId);
        if (item) {
            item.quantity = quantity;
            this.save();
        }
    }

    clearCart() {
        this.items = [];
        localStorage.removeItem(CART_KEY);
    }

    get totalItems() {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }
}

export const cartStore = new CartStore();
