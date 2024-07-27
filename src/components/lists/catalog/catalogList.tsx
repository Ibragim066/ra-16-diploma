import List from "../list.tsx";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks.ts";
import {fetchCatalogList} from "../../../redux/slices/catalogListSlice.ts";
import {Button} from "react-bootstrap";

export default function CatalogList() {
    const dispatch = useAppDispatch()

    const {catalogList, searchStr, activeCategory,loadingListError} = useAppSelector(state => state.catalogList)

    const errorLoading = <div className="small-block">
        <h4 className="text-center text-secondary m-5">Упс! Что-то пошло не так.</h4>
        <Button variant="secondary" className="w-25 m-auto" onClick={() => dispatch(fetchCatalogList())}>
            Попробовать еще раз</Button>
    </div>

    const notFoundItems = <div className="small-block">
        <h4 className="text-center text-secondary m-5">Упс! Поиск не дал результатов.</h4>
    </div>
    return (
        <>
            {catalogList.length > 0 ?
                <List items={catalogList}/> : loadingListError ? errorLoading : searchStr || activeCategory ?
                    notFoundItems :
                    null}
        </>
    )
}
