import { useLoaderData } from "react-router-dom"
import {ReactComponent as Icon} from "./image/icon.svg"
import classNames from "classnames";
import styles from "./styles.module.css"



export default function ProductPage() {
    const product = useLoaderData() as IProduct;
    return (
    <div className={classNames(styles.root)}>
        <div>
            <h2>{product.title}</h2>
            <p>Артикль: {product.article}</p>
            <p>Производитель: {product.manufacturer}</p>
            <p>Количество: {product.amount}</p>
            <p>Цена за штуку: {product.price}</p>            
            <p hidden={product.width === "0.00"}>Ширина: {product.width}</p>
            <p hidden={product.height === "0.00"}>Высота: {product.height}</p>
            <p hidden={product.length === "0.00"}>Длинна: {product.length}</p>
            <p hidden={product.weight === "0.00"}>Вес: {product.weight}</p>
            <p>{product.stock}</p>
        </div>
        <div>
            <Icon width="150px" height="150px" className={styles.icon}/>
            <p>Фото отсутствуе</p>
        </div>
    </div>
)}