import {Alert} from "react-bootstrap";
import {useAppSelector} from "../../redux/hooks.ts";
import {orderFormError} from "../../redux/slices/orderForm/orderFormSlice.ts";
import {useEffect, useState} from "react";
import {loadingCartErrors, updatingCartErrors} from "../../redux/slices/cart/cartSlice.ts";
import {topSalesError} from "../../redux/slices/topSalesListSlice.ts";
import {loadingCategoriesError, loadingListError} from "../../redux/slices/catalogListSlice.ts";
import {loadingProductError} from "../../redux/slices/productCardSlice.ts";

export default function ModalError() {

    const sendOrderFormError = useAppSelector(orderFormError)
    //console.log("ModalError sendOrderFormError", sendOrderFormError)
    const topSalesLoadingError = useAppSelector(topSalesError)
    const listLoadingError = useAppSelector(loadingListError)
    const categoriesLoadingError = useAppSelector(loadingCategoriesError)
    const productLoadingError = useAppSelector(loadingProductError)
    const cartLoadingErrors = useAppSelector(loadingCartErrors)
    const cartUpdatingErrors = useAppSelector(updatingCartErrors)

    const [show, setShow] = useState(false)
    const [error, setError] = useState({variant: "", text: ""})
    const hideAlert = () =>{
        setShow(false)
    }

    useEffect(() => {
        const text = cartUpdatingErrors.join("")
        const errorStr = `${sendOrderFormError} ${cartLoadingErrors}`.trim();

        if(!text && !errorStr){
            setShow(false)
        }
        else {
            let variant = "warning"
            if((!text && errorStr) ||(text && errorStr)){
                variant = "danger"

            }
            setError({variant, text: `${text} ${errorStr}`})

            setShow(true)
            setTimeout(hideAlert,10000)
        }

    }, [sendOrderFormError, cartUpdatingErrors, cartLoadingErrors])

    useEffect(() => {
        const errorStr = `${topSalesLoadingError} ${listLoadingError} ${categoriesLoadingError} ${productLoadingError}`.trim();
        setError({variant: "danger", text: `Упс! Что-то пошло не так: ${errorStr}`})

        if (errorStr) {
            setShow(true)
            setTimeout(hideAlert, 10000)
        }
        else {
            setShow(false)
        }
    }, [topSalesLoadingError, listLoadingError, categoriesLoadingError, productLoadingError])

    return (
        <>{error.text ?
            <Alert variant={error.variant}
                   show={show}
                   className="d-flex justify-content-between"><span>{error.text}</span>
            </Alert> : null}
        </>
    )
}