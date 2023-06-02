import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import classNames from "classnames";

import session from "../../../libs/token.manager";
import finder from "../../../libs/deep.finder";
import NewsRow from "../NewsRow/NewsRow";
import SearchForm from "../SearchForm/SearchForm";
import NextSearch from "../NextSearch/NextSearch";
import TaskPage from "../TaskPage/TaskPage";
import EditForm from "../EditForm/EditForm";
import { Link } from "react-router-dom";


export default function NewsList() {
  session.subscribe('SlidesList');
  const [docs, setDocs] = useState(useLoaderData() as INews[])
  const [showForm, setShowForm] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  return <div className={styles.root} >
    <h3>Слайды</h3>  

    <Link to={`/newsLine/editForm`} className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`, styles.button)}>Создать слайд</Link>
    
    {docs?.map(news => <NewsRow key={news.id} {...news} />)}

        {/* {docs.length > 0 ? <NextSearch
          setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
          lastId={docs[docs.length - 1]?.id}
          limit={docsLimit}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
          : <></>} */}
  </div>
}



