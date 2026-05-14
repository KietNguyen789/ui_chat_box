import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StoreContext } from './store/store_context.ts'
import { productStore } from './store/product_store/product_store.ts'
import { userStore } from './store/product_store/user_store.ts'
import { cartStore } from './store/cart_store/cart_store.ts'
import { authStore } from './store/auth_store/auth_store.ts'
import AppRouters from './routes/app_router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={{ productStore, userStore, cartStore, authStore }}>
      <AppRouters />
    </StoreContext.Provider>
  </StrictMode>,
)
