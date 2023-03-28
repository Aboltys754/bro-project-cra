import Navigate from "../navigate/Navigate"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.css"


export default function CreateObject() {    
    return (
        <>
            <Navigate />
            <div className={styles.root}>
                <h1>Создание объекта</h1>
                <hr />
                <Outlet />
            </div>
        </>
    )
}