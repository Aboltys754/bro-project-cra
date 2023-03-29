import styles from "./styles.module.css"
import {useState} from "react"
import tokenManager from "../../../libs/token.manager"


export default function NewFormObject() {
    tokenManager.subscribe("NewFormObject")
    const [count, setCount] = useState(0)
    return (
        <div className={styles.root}>
            <textarea className={styles.textareaone} name="title" placeholder="Тема Задачи" cols={50} rows={3} required autoComplete="off"></textarea>
            <textarea className={styles.textareatwo} name="bodyTask" placeholder="Тело Задачи" cols={50} rows={20} required autoComplete="off"></textarea>
            <div className={styles.inputText}>
                <label htmlFor="Doc"></label>
                <input type="file" id="Doc" multiple onChange={(event) => newInput(event, count, setCount)}/>
            </div>            
        </div>
    )
}

function newInput(event: React.ChangeEvent<HTMLInputElement>, count: number, setCount: React.Dispatch<React.SetStateAction<number>>) {
    // console.log(event.target.files)
    console.log(typeof(count))
    if (event.target.files?.length !== 0) {
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        setCount(count + 1);
        newLabel.htmlFor = `Doc${count + 1}`;
        newInput.type = "file";
        newInput.id=`Doc${count + 1}`;
        newInput.multiple;
        newInput.onchange = ((event) => newInput(event, count, setCount))
        console.log(newInput)
    }
}