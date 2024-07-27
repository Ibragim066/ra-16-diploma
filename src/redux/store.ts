import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice.ts";
import catalogListReducer from "./slices/catalogListSlice.ts";
import topSalesListReducer from "./slices/topSalesListSlice.ts";
import productCardReducer from "./slices/productCardSlice.ts";
import {listenerMiddleware} from "./listenerMiddleware.ts";
import orderFormReducer from "./slices/orderForm/orderFormSlice.ts";


const rootReducer = combineReducers({
    cart: cartReducer,
    catalogList: catalogListReducer,
    topSalesList:topSalesListReducer,
    productCard: productCardReducer,
    orderForm:orderFormReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

