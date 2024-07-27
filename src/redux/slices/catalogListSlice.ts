import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {countLoadItems, Item} from "../../config.ts";

const basedUrl = import.meta.env.VITE_URL

export type CatalogListStore = {
    loadingList: boolean,
    loadingCategories: boolean,
    hasMore: boolean,
    categories: Array<{ id: number, title: string }>,
    activeCategory: number,
    catalogList: Array<Item>,
    searchStr: string,
    loadingListError: string,
    loadingCategoriesError: string
}

const initialState: CatalogListStore = {
    loadingList: true,
    loadingCategories: true,
    hasMore: false,
    categories: [],
    activeCategory: 0,
    catalogList: [],
    searchStr: "",
    loadingListError: "",
    loadingCategoriesError: ""
}

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

export const catalogListSlice = createSliceWithThunk({
    name: "catalogList",
    initialState,
    selectors: {
        loadingListError: (state => state.loadingListError),
        loadingCategoriesError: (state => state.loadingCategoriesError)
    },
    reducers: (create) => ({
        cleanStore: create.reducer((state) => {
            state.loadingList = true
            state.loadingCategories = true
            state.hasMore = false
            state.catalogList = []
            state.loadingListError = ""
        }),
        fetchCategories: create.asyncThunk<Array<Item>, string>(
            async (pattern, api) => {
                try {
                    const fullUrl = `${basedUrl}${pattern}`;
                    //const response = await fetch(fullUrl, {method: "GET", mode: "no-cors"})
                    const response = await fetch(fullUrl)
                    if (Math.floor(response.status / 100) !== 2) {
                        return api.rejectWithValue(`Loading error ${response.statusText}`)
                    }

                    return await response.json();
                } catch (e) {
                    return api.rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.loadingCategories = true;
                    state.loadingCategoriesError = "";
                    state.categories = []
                },
                fulfilled: (state, action) => {
                    state.categories = action.payload
                    state.loadingCategoriesError = ""
                },
                rejected: (state, action) => {
                    state.loadingCategoriesError = action.payload as string ? action.payload as string : "Loading categories error"
                    console.log("error fetchCategories")
                },
                settled: (state) => {
                    state.loadingCategories = false
                }
            }
        ),
        toSearchStr: create.reducer((state, action: PayloadAction<string>) => {
            state.loadingList = true
            state.searchStr = action.payload
        }),
        toActiveCategory: create.reducer((state, action: PayloadAction<number>) => {
            state.loadingList = true
            state.activeCategory = action.payload
        }),

        fetchCatalogList: create.asyncThunk<Array<Item>>(
            async (_, api) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const catalogStore = api.getState().catalogList
                    const activeCategory = catalogStore.activeCategory
                    const searchStr = catalogStore.searchStr
                    const size = catalogStore.catalogList.length
                    let fullUrl = `${basedUrl}/api/items?`;

                    if (searchStr) {
                        fullUrl += `q=${searchStr}&`;
                    }

                    if (activeCategory) {
                        fullUrl += `categoryId=${activeCategory}&`
                    }

                    fullUrl += `offset=${size}&`

                   // const response = await fetch(fullUrl, {method: "GET", mode: "no-cors"})
                    const response = await fetch(fullUrl)

                    if (Math.floor(response.status / 100) !== 2) {
                        return api.rejectWithValue(`Loading error ${response.statusText}`)
                    }

                    return await response.json()
                } catch (e) {
                    return api.rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.loadingList = true;
                    state.loadingListError = "";
                    state.hasMore = false

                },
                fulfilled: (state, action) => {
                    state.catalogList = [...state.catalogList, ...action.payload]
                    state.hasMore = action.payload.length >= countLoadItems
                    state.loadingListError = ""
                },
                rejected: (state, action) => {
                    state.loadingListError = action.payload as string ? action.payload as string : "Loading categories error"
                    console.log("error fetchCatalogList")
                },
                settled: (state) => {
                    state.loadingList = false
                    state.loadingCategories = false
                }
            }
        ),
    }),
})


export const {cleanStore, fetchCatalogList, toActiveCategory, toSearchStr, fetchCategories} = catalogListSlice.actions
export const {loadingListError, loadingCategoriesError} = catalogListSlice.selectors

const catalogListReducer = catalogListSlice.reducer
export default catalogListReducer