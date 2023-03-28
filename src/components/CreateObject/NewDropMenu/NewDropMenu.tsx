import styles from "./styles.module.css"
import tokenManager from "../../../libs/token.manager"
import { title } from "process"

export default function NewDropMenu({hiddenTasks, tasks}: {hiddenTasks: string, tasks: ITasks[]}) {
    tokenManager.subscribe("NewDropMenuCreateObject")
    console.log(tasks)
    tasks.map((value, index) => console.log(value.title))
    return (
        <li className="nav-item dropdown" hidden={hiddenTasks === "" ? true : false}>
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Задача</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                        {tasks.map((value, index) => <p key={value?.id} className="dropdown-item" onClick={() => console.log(value)}>{value?.title}</p>)}
                    </div>
                </li>
    )
}