import {CartItem} from "../cart/cartSlice.ts";

const basedUrl = import.meta.env.VITE_URL

type PostBody = {
    owner: {
        phone: string,
        address: string,
    },
    items:
        {
            id: number,
            price: number,
            count: number
        }[]
}

export function getItemsData(cartItems: { [id: string]: CartItem }) {
    return Object.values(cartItems).map(item => ({
            id: item.id,
            price: item.price,
            count: item.count
        })
    )
}

export async function sendDataToServer(content: PostBody) {
    const fullUrl = `${basedUrl}/api/order`
    const body = JSON.stringify(content)

    return await fetch(fullUrl, {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: body
    });
}