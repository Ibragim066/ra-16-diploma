import {Table} from "react-bootstrap";

type Props = {
    sku: string,
    manufacturer: string,
    color: string,
    material: string,
    season: string,
    reason: string
}

export default function ProductCardTable({sku, manufacturer, color, material, season, reason}: Props) {
    return (
        <Table bordered>
            <tbody>
            <tr>
                <td>Артикул</td>
                <td>{sku}</td>
            </tr>
            <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
            </tr>
            <tr>
                <td>Цвет</td>
                <td>{color}</td>
            </tr>
            <tr>
                <td>Материалы</td>
                <td>{material}</td>
            </tr>
            <tr>
                <td>Сезон</td>
                <td>{season}</td>
            </tr>
            <tr>
                <td>Повод</td>
                <td>{reason}</td>
            </tr>
            </tbody>
        </Table>
    )
}