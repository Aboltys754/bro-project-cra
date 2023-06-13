import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import classNames from "classnames"
import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host";
import { Converter } from "md-conv";
import BackArrow from "../../DocFlow/BackArrow/BackArrow";

const converter = new Converter()


export default function ListTasks (){
    const state = useLocation().state.ListTasks;
    const path = useLocation().state.Path;
    console.log(state)
    return <div className={styles.root}>
        <div className={styles.backArrow}>
            <BackArrow />
            <small>Назад</small> 
        </div>
                     
        {state?.map((doc: IDoc) => { return <div key={doc.id} className={classNames(styles.rootDoc, "mt-2")}>
        <small>{doc.directing?.title} / {doc.task?.title}</small>

        <h5 className="mt-2"><Link to={`${path}/${doc.id}`} className="nav-link">{doc.title}</Link></h5>

        <ul>
        {doc.files.map(file => {
            return <li key={file.fileName + doc.id}>
            <a
                className="text-muted"
                href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
                download={true}
            >{file.originalName}</a>
            </li>
        })}
        </ul>

        <p
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(doc.description) }}
        ></p>
        </div>
        })}
    </div>
}