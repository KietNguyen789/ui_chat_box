// storeContext.ts
import { createContext, useContext } from "react";
import { productStore } from "./product_store/product_store";
import { userStore } from "./product_store/user_store";
export const StoreContext = createContext({
    productStore,
    userStore,
    // uiStore,
});
export const useStores = () => useContext(StoreContext);
