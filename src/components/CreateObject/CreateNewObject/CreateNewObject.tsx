import styles from "./styles.module.css"
import tokenManager from "../../../libs/token.manager"
import { Link } from "react-router-dom"
import { title } from "process"

type PropToken = {
    id: number;
    title: string;
    directings: Array<IPropsArray>;
}

type IPropsArray = {
    id: number;
    title: string;
    tasks: Array<1>
}

export default function CreateNewObject() {
    tokenManager.subscribe("user")
    const directings = tokenManager.getMe()?.roles[0] as unknown as PropToken
    // console.log(directings?.directings[0])
    directings?.directings.map((index, value) => console.log(index, value))
    return (
        <div className={styles.root}>
            <p>{tokenManager.getMe()?.roles[0].title}</p>
            <form onSubmit={(event) => console.log(1)}>
                <Link  to="/createObject/OldList" className="btn btn-outline-light ms-4 mb-4" onClick={() => console.log("button back")}>Отмена</Link>
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Настройки</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                        {/* {directings?.directings.map((index) => <p className="dropdown-item">{directings?.directings[index]?.id}</p>)}                         */}
                    </div>
                </li>
            </form>      
        </div>
    )
}