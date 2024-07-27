import CartTable from "./cartTable.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import OrderForm from "./orderForm.tsx";
import {useEffect} from "react";
import {checkCart} from "../../redux/slices/cart/cartSlice.ts";

export default function Cart() {

    const dispatch = useAppDispatch()
    const {cartItems, loading} = useAppSelector(state => state.cart)
    const success = useAppSelector(state => state.orderForm.success)

    useEffect(() => {
        dispatch(checkCart())
    }, [])

    return (
        <>{success ?
            <div className="small-block">
                <h2 className="text-center m-5">Заказ успешно оформлен!</h2>
            </div> :
            <>
                <section className="cart small-block">
                    <h2 className="text-center mb-4">Корзина</h2>
                    <CartTable/>
                    {Object.keys(cartItems).length > 0 && !loading && <OrderForm/>}
                </section>
            </>}
        </>
    )
}