import {Item} from "../../config.ts";
import {Button, Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type Props = {
    item: Item
}

export default function ListItem({item}: Props) {
    const navigate = useNavigate()

    return (
        <Col md={4}>
            <div className="h-100  d-flex">
                <Card className="catalog-item-card w-100 overflow-hidden">
                    <div className="image-wrap d-flex justify-content-center flex-column">
                        <Image src={item.images[0]}
                               alt={`Здесь должно быть фото товара "${item.title}", но что-то пошло не так`}
                               fluid className="mh-100"/>
                    </div>
                    <Card.Body className="d-flex flex-column align-items-start">
                        <Card.Text>{item.title}</Card.Text>
                        <div className="flex-fill"></div>
                        <Card.Text>{item.price} руб.</Card.Text>
                        <Button variant="outline-secondary" className="align-content-end"
                                onClick={() => navigate(`/productCard/${item.id}`)}>Заказать</Button>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    )
}