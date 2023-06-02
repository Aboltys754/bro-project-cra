import { useNavigate, useLoaderData, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import { responseNotIsArray } from "../../../middleware/response.validator";
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import EditForm from "../EditForm/EditForm";
import styles from "./styles.module.css"
import classNames from "classnames";
import BackArrow from "../BackArrow/BackArrow";
import { Converter } from "md-conv";
import {ReactComponent as IconEdit} from "../../../img/SVG/edit.svg"
import {ReactComponent as IconEye} from "../../../img/SVG/eye.svg"
import {ReactComponent as IconOk} from "../../../img/SVG/ok.svg"
import {ReactComponent as IconDelete} from "../../../img/SVG/delete.svg"
import {ReactComponent as IconYes} from "../../../img/SVG/yes.svg"
import {ReactComponent as IconNo} from "../../../img/SVG/no.svg"
import { Link } from "react-router-dom";


type propsAcceptor = {
  accept: string | boolean,
  email: string,
  fullName: string,
  name: string,
  uid: string,
}

const converter = new Converter()

export default function DocPage() {
  session.subscribe('NewsPage');
  const navigate = useNavigate();
  const [news, setNews] = useState(useLoaderData() as INews);
  const [showForm, setShowForm] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  console.log(news)


  // if (showForm) {
  //   const typeDoc: DocType = {
  //     directing: doc.directing as IDirecting,
  //     task: doc.task as ITask
  //   }

  //   return <div className={styles.root}>
  //     <EditForm />
  //   </div>
  // }

  return  (
    <div className={styles.root}>
      <div className={styles.linkAndTitle}>
        <div className={styles.backArrow}>
          <BackArrow />
          <small>Назад</small> 
        </div>       

        <div className={styles.buttons}>
          {/* {_checkUpdateAction(doc.directing.id, doc.task.id, 'Редактировать') ? */}
          <Link to={`/newsLine/editForm`}>Редактировать</Link>
                <div
                  className={classNames(styles.buttonUp)}
                  onClick={() => setShowForm(true)}>
                  <IconEdit height="60px" width="60px" className={styles.svgButton}/>
                  <Link to={`/newsLine/editForm`}></Link>
                  Редактировать                            
                </div>
            {/* // : <></>} */}

          {/* {_checkUpdateAction(doc.directing.id, doc.task.id, 'Удалить') ? */}
                  <div className={classNames(styles.buttonUp)}
                  onClick={() => {
                    _delNews(news.id);
                    navigate('/newsLine');
                  }}>
                    <IconDelete height="60px" width="55px" className={styles.svgButton}/>
                  Удалить               
                  </div>            
            {/* : <></>} */}
        </div>          
      </div>
      
      <h3 className="mt-2">{news.title}</h3>

      

      <p className={classNames(styles.textBoard, "mt-2")}
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(news.message) }}
      ></p>

      {news.files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}
      
      <ul>
        {news.files.map(file => {
          return <li key={file.fileName + news.id}>
            <a
              className="text-muted"
              href={`${serviceHost('informator')}/api/mnote/scan/${file.fileName}`}
              download={true}
            >{file.originalName}</a>
          </li>
        })}
      </ul>
    </div>
)}

function _delNews(id: string) {
  
  fetchWrapper(() => fetch(`${serviceHost('mnote')}/api/mnote/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
  // .finally(() => navigate('/docflow'))
}