import { createContext, useContext } from "react";
import { productStore } from "./product_store/product_store";
import { userStore } from "./product_store/user_store";
import { cartStore } from "./cart_store/cart_store";

export const StoreContext = createContext({
    productStore,
    userStore,
    cartStore,
});

export const useStores = () => useContext(StoreContext);
