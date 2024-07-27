export const headerNav = [{pageName: "Главная", href: "/"},
    {pageName: "Каталог", href: "/catalog"},
    {pageName: "О магазине", href: "/about"},
    {pageName: "Контакты", href: "/contacts"}];

export type Item = {
    id: number,
    category: number,
    title: string,
    price: number,
    images: Array<string>
}

export type FullItem = {
    category: number,
    color: string,
    heelSize: string,
    id: number,
    images: Array<string>,
    manufacturer: string,
    material: string,
    price: number,
    reason: string,
    season: string,
    sizes: Array<{ size: string, available: boolean }>,
    sku: string,
    title: string,
}

export const initialStateFullItem = {
    category: -1,
    color: "",
    heelSize: "",
    id: -1,
    images: [],
    manufacturer: "",
    material: "",
    price: 0,
    reason: "",
    season: "",
    sizes: [],
    sku: "",
    title: "",
}

export const countLoadItems = 6
