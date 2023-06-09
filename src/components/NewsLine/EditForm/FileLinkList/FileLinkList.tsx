import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"

import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  docId?: string
  files?: IDocFile[]
}

export default function FileLinkList({ docId, files }: Props) {
  console.log(files)
  if (!files || !files.length) {
    return <></>
  }

  return <div className={classNames("mt-4", styles.root)}>
    {files.length ? <><legend>Прикреплённые файлы:</legend><hr></hr></> : <></>}

    <div>
      <img src="" alt="" id="imageFileLinkList" className={styles.image} hidden/>
    </div>

    <ul>
      {files.map((f, i) => (
        <li key={i}
          onClick={() => _showImage(f)}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {f.originalName}

          <span hidden
            onClick={(event) => {               
              if(!confirm('Удалить файл?')){
                return;
              }
              event.currentTarget.parentElement?.remove();
              if (docId) {
                _delFile(docId, f.fileName)
              }
            }}
          ><small>удалить файл</small></span>
        </li>))}
    </ul>
  </div>
}

function _delFile(docId: string, fileName: string) {
  const fd = new FormData()
  fd.append('fileName', fileName);

  fetchWrapper(() => fetch(`${serviceHost('mnote')}/api/mnote/file/${docId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        const tagImageId = document.getElementById('imgFileNameList')
          if (tagImageId) {
            tagImageId.hidden = true
              }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}

function _showImage(f: IDocFile) {
  const tagImageId = document.getElementById('imageFileLinkList')
  if (tagImageId) {
    tagImageId.hidden = !tagImageId.hidden;
    tagImageId.setAttribute('src', `http://localhost:3300/api/mnote/static/images/${f.fileName}`)
    tagImageId.onclick = (() => tagImageId.hidden = !tagImageId.hidden)    
    // tagImageIdFoo.onmouseleave = (() => tagImageIdFoo.hidden = !tagImageIdFoo.hidden)    
  }
}