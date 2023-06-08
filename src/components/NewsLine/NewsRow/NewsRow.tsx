import { Link } from "react-router-dom";

import classNames from "classnames"
import styles from "./styles.module.css"
import { Converter } from "md-conv";
import {ReactComponent as IconYes} from "../../../img/SVG/yes.svg"
import {ReactComponent as IconNo} from "../../../img/SVG/no.svg"
import {ReactComponent as Photo} from "../../../img/SVG/photo.svg"
import {ReactComponent as Prohibitionsignal} from "../../../img/SVG/prohibitionsignal.svg"

const converter = new Converter()

export default function DocRow(news: INews) {
  console.log(news.files[0]?.fileName)
  return (
  <div className={classNames(styles.root, "mt-2")}>
    <h4 className="mt-2"><Link to={`/newsLine/${news.id}`} className="nav-link">{news.title}</Link></h4>
      {news.isPublic === true 
        ? <div className={styles.isPublic}><IconYes width="15px" height="15px" className={styles.svgButton}/><p>Опубликован</p></div> 
        : <div className={styles.isPublic}><IconNo width="15px" height="15px" className={styles.svgButton}/><p>Не опубликован</p></div>}
    <div className={styles.content}>     
      {news.files[0]?.fileName
        ? <img src={`http://localhost:3300/api/mnote/static/images/${news.files[0].fileName}`} 
               alt="foto" 
               className={styles.foto}/> 

        : <div className={styles.foto}>Слайд не прикреплен</div>}
      {news.message.length < 250 
        ? <p>{news.message}</p> 

        : <div className={styles.sliceMessage}><p>{sliceMessage(news.message)}<Link to={`/newsLine/${news.id}`} className="nav-link">читать далее...</Link></p></div>}
    </div>
    
    
  </div>
)}

function sliceMessage(message: string) {
    if (message.indexOf(' ', 251) !== -1) {
      return message.slice(0, message.indexOf(' ', 251))
    } else {
      return message.slice(0, 251)
    }
  }