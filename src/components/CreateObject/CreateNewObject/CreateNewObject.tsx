import { Link } from "react-router-dom"
import { useState } from "react";
import styles from "./styles.module.css"
import tokenManager from "../../../libs/token.manager"
import NewDropMenu from "../NewDropMenu/NewDropMenu";
import NewFormObject from "../NewFormObject/NewFormObject";




export default function CreateNewObject() {
    tokenManager.subscribe("CreateNewObject")
    // Отображение Drop меню задачи
    const [hiddenTasks, setHiddenTasks] = useState("")
    // Сохраняется выбранные задачи
    const [tasks, setTasks] = useState<ITasks[]>([])
    // Выбраная задача
    const [selectedTask, setSelectedTask] = useState("")
    
    // Переопределил интерфейс что бы добавить массив
    const directings = tokenManager.getMe()?.roles[0] as IRoles
    // console.log(selectedTask)
    return (
        <div className={styles.root}>
            <p>{tokenManager.getMe()?.roles[0].title}</p>
            <form onSubmit={(event) => console.log(1)}>
                <Link  to="/createObject/OldList" className="btn btn-outline-light ms-4 mb-4" onClick={() => console.log("button back")}>Отмена</Link>
                <div className={styles.dropLi}>
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Отдел</span>
                        <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                            {directings?.directings.map((value, index) => 
                                <p key={value?.id} 
                                className="dropdown-item"
                                onClick={() => stateHiddenAndTasks(value.title, value.tasks, setHiddenTasks, setTasks)}>{value?.title}
                                </p>)}
                        </div>
                    </li>
                    <NewDropMenu hiddenTasks={hiddenTasks} tasks={tasks} setSelectedTask={setSelectedTask}/>                    
                </div>                
                <NewFormObject />              
            </form>      
        </div>
    )
}

function stateHiddenAndTasks(
    title: string, 
    tasks: Array< ITasks>, 
    setHiddenTasks: React.Dispatch<React.SetStateAction<string>>, 
    setTasks: React.Dispatch<React.SetStateAction<ITasks[]>>) {

    setHiddenTasks(title);
    setTasks(tasks);
}

// function clickDropMenuDispleyNone(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
//     console.log(event.type)
//     event.target.addEventListener("click", () => event.currentTarget.classList.toggle("show"))
//     event.target.addEventListener("onmouseleave", () => event.currentTarget.classList.toggle("show"))
//     // onClick={(event) => event.currentTarget.classList.toggle("show")} 
//     // onMouseOut={(event) => event.currentTarget.classList.toggle("show")}
// }