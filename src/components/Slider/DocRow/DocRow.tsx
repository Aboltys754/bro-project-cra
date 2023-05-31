import { Link } from "react-router-dom";

import serviceHost from "../../../libs/service.host";
import classNames from "classnames"
import styles from "./styles.module.css"
import { Converter } from "md-conv";
import {ReactComponent as IconYes} from "../../../img/SVG/yes.svg"
import {ReactComponent as IconNo} from "../../../img/SVG/no.svg"

const converter = new Converter()

export default function DocRow({doc, path}: {doc: IDoc, path: string}) {
  return <div className={classNames(styles.root, "mt-2")}>
    <small>{doc.directing?.title} / {doc.task?.title}</small>
    <small> № {doc.num || 'б/н'} от {_makeDate(doc.createdAt)}</small>

    <h4 className="mt-2"><Link to={`/docflow/${doc.id}`} className="nav-link" state={path}>{doc.title}</Link></h4>

   
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
    
    <div className={styles.condition}>
      <div className={styles.userCondition}>
        <span>Подписанты</span>
        {doc.acceptor.map(e => 
              <div key={e.uid}>
                {e.accept ? <IconYes width="15px" height="15px" className={styles.svgButton}/> : <IconNo width="15px" height="15px" className={styles.svgButton}/>}
                <small >{e.name}</small>
              </div>)}
        <br/>
      </div>
      <div className={styles.userCondition}>
        <span>Ознакомители</span>
        {doc.recipient.map(e => 
              <div key={e.uid}>
                {e.accept ? <IconYes width="15px" height="15px" className={styles.svgButton}/> : <IconNo width="15px" height="15px" className={styles.svgButton}/>}
                <small >{e.name}</small>
              </div>)}
        <br/>
      </div>
    </div>


<small> автор: {doc.author.fullName}</small>
  </div>
}

function _makeDate(date: string){
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth()+1}`.slice(-2);
  return `${day}.${month}.${d.getFullYear()}`
}