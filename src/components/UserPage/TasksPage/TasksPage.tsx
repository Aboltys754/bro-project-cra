import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"
import TaskPage from "../TaskPage/TaskPage";
import SearchForm from "../SearchForm/SearchForm";
import DocRow from "../DocRow/DocRow";
import NextSearch from "../NextSearch/NextSearch";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"

const docsLimit = 25;

export default function TasksPage() {
    session.subscribe('userPageTask');
    const [docs, setDocs] = useState(useLoaderData() as IDoc[])
    const [showNextButton, setShowNextButton] = useState(true)
    const meTasks = docs.filter(user => user?.author.email === session.getMe()?.email)
    const notMeTasks = docs.filter(user => user?.author.email !== session.getMe()?.email)
    return (
        <div className={styles.root}>
            <SearchForm setDocs={setDocs} limit={docsLimit} setShowNextButton={setShowNextButton}/>
            <div className={styles.tasks}>            
                <div className={styles.task}>
                    <TaskPage value={"Мои поручения"} index={0} ListTasks={meTasks} Path={"/userPage/listMeTasks"}/>
                    <TaskPage value={"Поручения мне"} index={1} ListTasks={notMeTasks} Path={"/userPage/listOtherTasks"}/>
                    {finder(session.getMe()?.roles, 'Создать') ?
                        <TaskPage value={"Создать документ"} index={1} ListTasks={notMeTasks} Path={"/userPage/createTasks"}/>
                        : <></>
                        }
                </div>
            </div>
            <div>
                {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

                {docs.length > 0 ? <NextSearch
                setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
                lastId={docs[docs.length - 1]?.id}
                limit={docsLimit}
                showNextButton={showNextButton}
                setShowNextButton={setShowNextButton}
                />
                : <></>} 
            </div>                                
        </div>    
    )
}