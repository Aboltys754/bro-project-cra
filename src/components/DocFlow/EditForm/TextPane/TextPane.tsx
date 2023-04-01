import classNames from "classnames"

import addDescIcon from "./image/addDescIcon.svg"
import styles from "./styles.module.css"

export default function TextPane() {
  return <div className={classNames("form-group mb-4", styles.root)}>

    <p className="mt-4" onClick={_showTextarea}>
    <img src={addDescIcon} loading="lazy"/>
      <small>Добавить пояснительную записку</small></p>

    <div hidden>
      <label htmlFor="descTextarea" className="form-label mt-4">Пояснительная записка</label>
      <textarea className="form-control" id="descTextarea" name="description"></textarea>
    </div>
  </div>
}

function _showTextarea(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const textarea = event.currentTarget.nextElementSibling as HTMLDivElement
  textarea.hidden = !textarea.hidden;

  event.currentTarget.remove();
}