import {useEffect, useState} from "react";
import {
    cleanStore,
    fetchCatalogList,
    fetchCategories,
    loadingListError,
    toActiveCategory,
    toSearchStr
} from "../../../redux/slices/catalogListSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks.ts";
import {Button, Form} from "react-bootstrap";
import CatalogNav from "./catalogNav.tsx";
import Preloader from "../../utilsComponents/preloader.tsx";
import CatalogList from "./catalogList.tsx";

type Props = {
    isHasSearchForm: boolean,
}

export default function CatalogFunc({isHasSearchForm}: Props) {

    const dispatch = useAppDispatch()
    const {
        categories,
        activeCategory,
        hasMore,
        searchStr,
        loadingList,
        loadingCategories
    } = useAppSelector(state => state.catalogList)

    const [inputValue, setInputValue] = useState(searchStr)

    useEffect(() => {
        dispatch(cleanStore())
        dispatch(fetchCategories("/api/categories/"))
        dispatch(fetchCatalogList())
    }, [])

    useEffect(() => {
        setInputValue(searchStr)
    }, [searchStr])

    const searchField = !isHasSearchForm ? null :
        <Form className="catalog-search-form"
              onSubmit={(e) => e.preventDefault()}>
            <Form.Control name="search"
                          className={`${inputValue === searchStr ? "text-primary" : ""}`}
                          value={inputValue}
                          placeholder="Поиск"
                          onKeyUp={e => e.key === "Enter" && dispatch(toSearchStr(e.currentTarget.value))}
                          onChange={(e) => setInputValue(e.target.value)}
            />
        </Form>;

    const categoriesList = categories.length === 0 ? null :
        <CatalogNav activeCategory={activeCategory} categories={categories}
                    changeActiveCategory={(categoryId) => dispatch(toActiveCategory(categoryId))}/>;

    const preloaderCategories = loadingCategories ? <Preloader/> : null;
    const preloaderList = loadingList ? <Preloader/> : null;
    const moreButton = hasMore ?
        <div className="text-center">
            <Button variant="outline-secondary" disabled={loadingList}
                    onClick={() => dispatch(fetchCatalogList())}>Загрузить
                ещё</Button>
        </div> : null;

    return (
        <section className={`${useAppSelector(loadingListError) ? "small-block" : "catalog"}`}>
            <h2 className="text-center mb-5">Каталог</h2>
            {searchField}
            {loadingList && loadingCategories ? <Preloader/> :
                <> {preloaderCategories}
                    {categoriesList}
                    <CatalogList/>
                    {preloaderList}
                    {moreButton}</>
            }
        </section>
    );
}
