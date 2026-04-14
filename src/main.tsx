import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StoreContext } from './store/store_context.ts'
import { productStore } from './store/product_store/product_store.ts'
import AppRouters from './routes/app_router.tsx'
import { userStore } from './store/product_store/user_store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={{ productStore, userStore }}>
      <AppRouters />
    </StoreContext.Provider>
  </StrictMode>,
)
