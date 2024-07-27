import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {FullItem, initialStateFullItem} from "../../config.ts";

const basedUrl = import.meta.env.VITE_URL

export type ProductCard = {
    item: FullItem,
    error: string,
    loading: boolean,
}

const initialState: ProductCard = {
    item: initialStateFullItem,
    error: "",
    loading: true
}

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

export const productCardSlice = createSliceWithThunk({
    name: "productCard",
    initialState,
    selectors: {
        item: (state) => state.item,
        loadingProductError: (state => state.error)
    },
    reducers: (create) => ({
        fetchProductCard: create.asyncThunk<FullItem, string>(
            async (pattern: string, {rejectWithValue}) => {
                try {
                    const fullUrl = `${basedUrl}/api/items/${pattern}`;
                    //const response = await fetch(fullUrl, {method: "GET", mode: "no-cors"})
                    const response = await fetch(fullUrl)
                    if (Math.floor(response.status / 100) !== 2) {
                        return rejectWithValue(`Loading error ${response.statusText}`)
                    }

                    return await response.json()
                } catch (e) {
                    return rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.item = initialState.item;
                    state.loading = true
                    state.error = ""
                },
                fulfilled: (state, action) => {
                    state.item = action.payload
                },
                rejected: (state, action) => {
                    state.error = action.payload as string ? action.payload as string : "Loading categories error"
                    console.log("error fetchProductCard")
                },
                settled: (state) => {
                    state.loading = false
                }
            }
        ),

    }),
})

export const {fetchProductCard} = productCardSlice.actions
export const {item, loadingProductError} = productCardSlice.selectors

const productCardReducer = productCardSlice.reducer
export default productCardReducer