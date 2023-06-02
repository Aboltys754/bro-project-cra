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


type propsAcceptor = {
  accept: string | boolean,
  email: string,
  fullName: string,
  name: string,
  uid: string,
}

const converter = new Converter()

export default function DocPage() {
  session.subscribe('doc');
  const navigate = useNavigate();
  const [doc, setDoc] = useState(useLoaderData() as IDoc);
  const [showForm, setShowForm] = useState(false);

  console.log(doc)


  if (showForm) {
    const typeDoc: DocType = {
      directing: doc.directing as IDirecting,
      task: doc.task as ITask
    }

    return <div className={styles.root}>
      <EditForm setShowForm={setShowForm} updDoc={setDoc} doc={doc} typeDoc={typeDoc} />
    </div>
  }

  return  (
    <div className={styles.root}>
      <div className={styles.linkAndTitle}>
        <div className={styles.backArrow}>
          <BackArrow />
          <small>{doc.directing?.title} / {doc.task?.title}</small> 
        </div>       

        <div className={styles.buttons}>
          {_checkUpdateAction(doc.directing.id, doc.task.id, 'Редактировать') ?
                <div
                  className={classNames(styles.buttonUp)}
                  onClick={() => setShowForm(true)}>
                  <IconEdit height="60px" width="60px" className={styles.svgButton}/>
                  Редактировать                            
                </div>
            : <></>}

          {_checkUpdateAction(doc.directing.id, doc.task.id, 'Удалить') ?
                  <div className={classNames(styles.buttonUp)}
                  onClick={() => {
                    _delDoc(doc.id);
                    navigate('/docflow');
                  }}>
                    <IconDelete height="60px" width="55px" className={styles.svgButton}/>
                  Удалить               
                  </div>            
            : <></>}
        </div>          
      </div>

      <h3 className="mt-2">{doc.title}</h3>

      {doc.acceptor.length ? <p className="mt-4">Подписанты:</p> : <></>}

      <ul>
        {doc.acceptor.map(user => {
          return <li key={user.uid}>
            {user.accept 
            ? <IconYes height="15px" width="15px" className={styles.svgButton}/> 
            : <IconNo height="15px" width="15px" className={styles.svgButton}/>}
            <span>{user.name}</span>          
          </li>
        })}
      </ul>

      {doc.recipient.length ? <p className="mt-4">Ознокомители:</p> : <></>}

      <ul>
        {doc.recipient.map(user => {
          return <li key={user.uid}>
            {user.accept 
            ? <IconYes height="15px" width="15px" className={styles.svgButton}/> 
            : <IconNo height="15px" width="15px" className={styles.svgButton}/>}
            <span>{user.name}</span>          
          </li>
        })}
      </ul>

      {doc.files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}

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

      <p className={classNames(styles.textBoard, "mt-2")}
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(doc.description) }}
      ></p>
        
      <div className={styles.buttons}>
        {_checkUpdateAction(doc.directing.id, doc.task.id, 'Согласовать') ?
              <div
                className={classNames(styles.buttonDown)}
                onClick={() => {
                  _acceptDoc(doc.acceptor, doc.id);
                  navigate('/docflow');
                }}>
                <IconOk height="60px" width="60px" className={styles.svgButton}/>
                Согласовать
              </div>
          : <></>}

        {_checkUpdateAction(doc.directing.id, doc.task.id, 'Ознакомиться') ?
                <div className={classNames(styles.buttonDown)}
                onClick={() => {
                  _recipientDoc(doc.recipient, doc.id);
                  navigate('/docflow');
                }}>
                  <IconEye height="60px" width="60px" className={styles.svgButton}/>
                  Ознакомиться         
                </div>            
          : <></>}
      </div> 
      <footer>
          <div className={styles.userName}>{session.getMe()?.email}</div>
          <div className={styles.signature}>Подпись <div className={styles.line}></div></div>
      </footer>
    </div>
)}


function _checkUpdateAction(idDirecting: number, idTask: number, action: string) {
  return session.getMe()?.roles[0]?.directings.find(e => e.id === idDirecting)?.tasks.find(e => e.id === idTask)?.actions.find(e => e.title === action);
        
}

function _delDoc(id: string) {
  if (!confirm('Удалить этот документ?')) {
    return;
  }
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${id}`, {
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

function _acceptDoc (acceptors: IDocSignatory[], docId: string) {
  acceptors.map((acceptor, index) => {
    if(session.getMe()?.email === acceptor.email) {
      acceptors[index].accept = true
    }
  })

  const fd = new FormData();
  acceptors.map((e: propsAcceptor) => {
    if (e.email === session.getMe()?.email) {
      fd.append(`acceptor[${e.uid}]`, 'true')
    } else {            
      if (e.accept === false) {
        fd.append(`acceptor[${e.uid}]`, '')                
      } else {fd.append(`acceptor[${e.uid}]`, 'true')}
}})

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/accepting/${docId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })).catch(error => console.log(error.message))
}

function _recipientDoc (recipients: IDocSignatory[], docId: string) {
  recipients.map((recipient, index) => {
    if(session.getMe()?.email === recipient.email) {
      recipients[index].accept = true
    }
  })

  const fd = new FormData();

  recipients.map((e: propsAcceptor) => {
    if (e.email === session.getMe()?.email) {
      fd.append(`recipient[${e.uid}]`, 'true')
    } else {            
      if (e.accept === false) {
        fd.append(`recipient[${e.uid}]`, '')                
      } else {fd.append(`recipient[${e.uid}]`, 'true')}
}})


  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/recipienting/${docId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })).catch(error => console.log(error.message))
}