import { useState } from "react"
import styles from "./styles.module.css"

export default function UsersInput() {
    const [listUsers, setListUsers] = useState<Array<string>>([])
    return (
    <div className={styles.root}>
            {listUsers.length === 0 
            ? <></> 
            : <div className={styles.panel}>
                {listUsers.map((value, index) => <p key={index}>{value}</p>)}
            </div>            
            }
            <button onClick={() => {setListUsers([...listUsers, "1"])}}>Добавить Подписанта</button>        
    </div>
)}