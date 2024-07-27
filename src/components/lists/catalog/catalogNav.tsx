import {Nav} from "react-bootstrap";

type Props = {
    activeCategory: number;
    categories: Array<{ id: number, title: string }>;
    changeActiveCategory: (id: number) => void
}

export default function CatalogNav({activeCategory, categories, changeActiveCategory}: Props) {

    return (
        <Nav className="justify-content-center catalog-categories mb-5">
            <Nav.Item>
                <Nav.Link href="#"
                          className={`${activeCategory === 0 ? "active" : "text-secondary"}`}
                          onClick={() => {
                              changeActiveCategory(0)
                          }}>Все</Nav.Link>
            </Nav.Item>
            {categories.map(x => <Nav.Item key={x.id}>
                <Nav.Link href="#"
                          className={`${activeCategory === x.id ? "active" : "text-secondary"}`}
                          data-id={x.id}
                          onClick={() => {
                              changeActiveCategory(x.id)
                          }}>{x.title}</Nav.Link>
            </Nav.Item>)}
        </Nav>
    )
}
