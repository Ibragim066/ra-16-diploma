import {Col, Container, Nav, Row} from "react-bootstrap";

export default function Footer() {
    return (
        <Container className="footer">
            <Row className="bg-light">
                <Col>
                    <section>
                        <h5>Информация</h5>
                        <Nav className="flex-column">
                            <Nav.Item>
                                <Nav.Link className="text-secondary" href="/about">О магазине</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-secondary" href="/catalog">Каталог</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-secondary" href="/contacts">Контакты</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </section>
                </Col>
                <Col>
                    <section>
                        <h5>Принимаем к оплате:</h5>
                        <div className="footer-pay">
                            <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                            <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                            <div className="footer-pay-systems footer-pay-systems-visa"></div>
                            <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                            <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                            <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                        </div>
                    </section>
                    <section>
                        <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                            аксессуаров.
                            Все права защищены.
                            <div>Доставка по всей России!</div>
                        </div>
                    </section>
                </Col>
                <Col className="text-right">
                    <section className="footer-contacts">
                        <h5>Контакты:</h5>
                        <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                        <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
                        <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
                        <div className="footer-social-links">
                            <div className="footer-social-link footer-social-link-twitter"></div>
                            <div className="footer-social-link footer-social-link-vk"></div>
                        </div>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}