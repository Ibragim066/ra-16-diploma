import {addToCart, checkCart, cleanCart, removeFromCart} from "./slices/cart/cartSlice.ts"
import {cleanStore, fetchCatalogList, toActiveCategory, toSearchStr} from "./slices/catalogListSlice.ts"
import {saveOwner, sendData} from "./slices/orderForm/orderFormSlice.ts";
import type {TypedAddListener, TypedStartListening} from '@reduxjs/toolkit'
import {Action, addListener, createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import type {AppDispatch, RootState} from './store'

export const listenerMiddleware = createListenerMiddleware()
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
    listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
    RootState,
    AppDispatch
>


startAppListening({
    matcher: isAnyOf(removeFromCart, addToCart),
    effect: (_action: Action, listenerApi) => {
        listenerApi.dispatch(checkCart())
    }
})

startAppListening({
    matcher: isAnyOf(toActiveCategory, toSearchStr),
    effect: (_action: Action, listenerApi) => {
        listenerApi.dispatch(cleanStore())
        listenerApi.dispatch(fetchCatalogList())
    }
})

startAppListening({
    matcher: isAnyOf(saveOwner),
    effect: (_action: Action, listenerApi) => {
        listenerApi.dispatch(checkCart())
        listenerApi.dispatch(sendData())
    }
})

startAppListening({
    matcher: isAnyOf(sendData.fulfilled),
    effect: (_action: Action, listenerApi) => {
        const success = listenerApi.getState().orderForm.success
        console.log("startAppListening success",success)
        if(success){
            listenerApi.dispatch(cleanCart())
        }
    }
})