import styles from "./styles.module.css"
import { Link } from "react-router-dom";
import session from "../../../libs/token.manager"
import { ReactComponent as Icon0 } from "./image/0.svg";
import { ReactComponent as Icon1 } from "./image/1.svg";

export default function TaskPage({ value, index, ListTasks, Path}: { value: string, index: number, ListTasks: IDoc[], Path: string}) {
    const Icons = [<Icon0 key={0}/>, <Icon1 key={1}/>]
        return (
            <Link to={Path} className={styles.root} state={{ListTasks, Path}}>
                <div>{value}</div>
                <div>{Icons[index]}</div>
                <div>{ListTasks.length}</div>        
            </Link>
        )
    }