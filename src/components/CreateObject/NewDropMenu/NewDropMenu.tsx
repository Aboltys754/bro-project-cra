import styles from "./styles.module.css"
import tokenManager from "../../../libs/token.manager"

export default function NewDropMenu({hiddenTasks, tasks, setSelectedTask}: {hiddenTasks: string, tasks: ITasks[], setSelectedTask: React.Dispatch<React.SetStateAction<string>>}) {
    tokenManager.subscribe("NewDropMenuCreateObject")
    return (
        <li className="nav-item dropdown" hidden={hiddenTasks === "" ? true : false}>
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Задача</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                        {tasks.map((value, index) => <p key={value?.id} className="dropdown-item" onClick={() => setSelectedTask(value?.title)}>{value?.title}</p>)}
                    </div>
                </li>
    )
}