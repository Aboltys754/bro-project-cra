import { useLocation, Link } from "react-router-dom"
import { Converter } from "md-conv";
import classNames from "classnames"
import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host";
import BackArrow from "../../DocFlow/BackArrow/BackArrow";
import SearchForm from "../SearchForm/SearchForm";
import DocRow from "../DocRow/DocRow";

const converter = new Converter()
const docsLimit = 25;


export default function ListTasks (){
    const docs = useLocation().state.ListTasks as IDoc[];
    const path = useLocation().state.Path;
    return (
    <div className={styles.root}>
        <div className={styles.backArrow}>
            <BackArrow />
            <small>Назад</small> 
        </div>

        {docs?.map(doc => <DocRow key={doc.id} doc={doc} path={path}/>)}
    </div>
)}