import styles from "./styles.module.css"
import {useState} from "react"
import tokenManager from "../../../libs/token.manager"
import NewInputCreateObject from "../NewInputCreateObject/NewInputCreateObject"


export default function NewFormObject({selectedTask}: {selectedTask: string}) {
    tokenManager.subscribe("NewFormObject")
    const [count, setCount] = useState(["0"])
    return (
        <div className={styles.root} hidden={selectedTask === "" ? true : false}>
            <textarea className={styles.textareaone} name="title" placeholder="Тема Задачи" cols={50} rows={3} required autoComplete="off"></textarea>
            <textarea className={styles.textareatwo} name="bodyTask" placeholder="Тело Задачи" cols={50} rows={20} required autoComplete="off"></textarea>
            <div className={styles.inputText}>
                {count.map((value, index) => <NewInputCreateObject key={index} index={index} count={count} setCount={setCount}/>)}
            </div>       
        </div>
    )
}