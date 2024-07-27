import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {sendDataToServer, getItemsData} from "./orderFormUtils.ts";


export type OrderFormData = {
    owner: {
        phone: string,
        address: string,
    },
    loading: boolean,
    errors: string,
    success: boolean
}

const initialState: OrderFormData = {
    owner: {
        phone: "",
        address: "",
    },
    loading: false,
    errors: "",
    success: false
}

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

export const orderFormSlice = createSliceWithThunk({
    name: "orderForm",
    initialState,
    selectors: {
        orderFormError: (state => state.errors),
        sendOrderFormSuccess: (state => state.success)
    },
    reducers: (create) => ({
        saveOwner: create.reducer((state, action: PayloadAction<{ phone: string, address: string }>) => {
            state.loading = true
            state.owner = action.payload
        }),

        sendData: create.asyncThunk<boolean>(async (_, api) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const cartItems = api.getState().cart.cartItems
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const owner = api.getState().orderForm.owner
                    const items = getItemsData(cartItems)
                    const answer = await sendDataToServer({owner, items})

                    if (answer.status === 500) {
                        return api.rejectWithValue("Сервер недоступен")
                    }

                    if (Math.floor(answer.status / 100) !== 2) {
                        return api.rejectWithValue(answer.statusText)
                    }
                    return true

                } catch (e) {
                    return api.rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.errors = ""
                    state.success = false
                },
                fulfilled: (state) => {
                    state.success = true
                    state.errors = ""
                },
                rejected: (state, action) => {
                    state.errors = action.payload as string
                },
                settled: (state) => {
                    state.loading = false
                }
            }
        ),
    }),
})


export const {saveOwner, sendData} = orderFormSlice.actions
export const {orderFormError,sendOrderFormSuccess} = orderFormSlice.selectors
const orderFormReducer = orderFormSlice.reducer
export default orderFormReducer
