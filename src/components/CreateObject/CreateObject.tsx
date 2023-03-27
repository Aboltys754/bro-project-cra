import Navigate from "../navigate/Navigate"
import { Outlet } from "react-router-dom"

export default function CreateObject() {
    return (
        <>
            <Navigate />
            <div >
            <h1>Каталог</h1>
            <hr />
            <Outlet />
            </div>
        </>
    )
}