import List from "../list.tsx";
import {useAppSelector} from "../../../redux/hooks.ts";
import {topSalesListItems} from "../../../redux/slices/topSalesListSlice.ts";

export default function TopSalesList() {

    return (
        <List items={useAppSelector(topSalesListItems)}/>
    )
}