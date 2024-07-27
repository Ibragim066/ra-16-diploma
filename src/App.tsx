import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import {Container} from "react-bootstrap";
import {Route, Routes} from 'react-router-dom';
import Main from "./components/main.tsx";
import Contacts from "./components/info/contacts.tsx";
import AboutStore from "./components/info/aboutStore.tsx";
import Banner from "./components/banner.tsx";
//import Catalog from "./components/lists/catalog/catalog.tsx";
import ProductCard from "./components/productCard/productCard.tsx";
import Cart from "./components/cart/Cart.tsx";
import ModalError from "./components/utilsComponents/modalError.tsx";
import CatalogFunc from "./components/lists/catalog/catalogFunc.tsx";
import NotFound from "./components/utilsComponents/notFound.tsx";


function App() {

    return (
        <>
            <Header/>
            <Container>
                <Banner/>
            </Container>
            <Container>
                <ModalError/>
                <div className="row">
                    <div className="col">
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path="/about" element={<AboutStore/>}/>
                            <Route path="/catalog" element={<CatalogFunc isHasSearchForm={true}/>}/>
                            <Route path="/productCard/:id" element={<ProductCard/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </Container>
            <Container>
                <Footer/>
            </Container>
        </>
    );
}

export default App;
