import {Button, Card, Form} from "react-bootstrap";
import * as React from "react";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {saveOwner} from "../../redux/slices/orderForm/orderFormSlice.ts";
import Preloader from "../utilsComponents/preloader.tsx";

export default function OrderForm() {
    const dispatch = useAppDispatch()
    const {loading, owner} = useAppSelector(state => state.orderForm)

    const [inputValuePhone, setInputValuePhone] = useState(owner.phone)
    const [inputValueAddress, setInputValueAddress] = useState(owner.address)

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const phoneNumberData = Object.fromEntries(formData).phone.toString()
        const addressData = Object.fromEntries(formData).address.toString()
        dispatch(saveOwner({phone: formatNumber(phoneNumberData), address: addressData}))
    }

    const formatNumber = (str: string) => {
        const firstSymbol = str[0] === '+' ? '+' : '+7';
        const formatStr = str.split('').filter(x => parseInt(x)).join('')
        return `${firstSymbol}${formatStr.slice(1).replace(/\D/g, '')}`;
    }

    return (
        <section className="order">
            {loading ? <Preloader/> :
                <>
                    <h2 className="text-center mb-4">Оформить заказ</h2>
                    <Card style={{maxWidth: "30rem", margin: "0 auto"}}>
                        <Form onSubmit={(e) => onFormSubmit(e)}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phone">Телефон</Form.Label>
                                    <Form.Control id="phone" name="phone" placeholder="Ваш телефон"
                                                  pattern="^[0-9+][0-9\(\) \-]{4,14}[0-9]$"
                                                  onChange={(e) => setInputValuePhone(e.target.value)}
                                                  value={inputValuePhone}
                                                  required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="address">Адрес доставки</Form.Label>
                                    <Form.Control id="address" name="address" placeholder="Адрес доставки"
                                                  onChange={(e) => setInputValueAddress(e.target.value)}
                                                  value={inputValueAddress}
                                                  required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" id="agreement" label="Согласен с правилами
                                доставки" required/>
                                </Form.Group>
                                <Button variant="outline-secondary" type="submit">Оформить</Button></Card.Body>
                        </Form>
                    </Card>
                </>}
        </section>
    )

}