import { Link } from "react-router-dom";

import serviceHost from "../../../libs/service.host";
import classNames from "classnames"
import styles from "./styles.module.css"
import { Converter } from "md-conv";
import {ReactComponent as IconYes} from "../../../img/SVG/yes.svg"
import {ReactComponent as IconNo} from "../../../img/SVG/no.svg"
import {ReactComponent as Photo} from "../../../img/SVG/photo.svg"
import {ReactComponent as Prohibitionsignal} from "../../../img/SVG/prohibitionsignal.svg"

const converter = new Converter()

export default function DocRow(news: INews) {
  return (
  <div className={classNames(styles.root, "mt-2")}>
    <h4 className="mt-2"><Link to={`/newsLine/${news.id}`} className="nav-link">{news.title}</Link></h4>
    <div className={styles.content}>
      <div className={styles.svgIcon}>
        {news.isPublic === true ? <IconYes width="15px" height="15px" className={styles.svgButton}/> : <IconNo width="15px" height="15px" className={styles.svgButton}/>}
      </div>      
      {news.files[0] ? <Photo className={styles.svgImage}/> : <Prohibitionsignal className={styles.svgImage}/>}
      {news.message.length < 250 
        ? <p>{news.message}</p> 
        : <div className={styles.sliceMessage}><p>{news.message.slice(0, 251)}<Link to={`/newsLine/${news.id}`} className="nav-link">читать далее...</Link></p></div>}
    </div>
    
    
  </div>
)}