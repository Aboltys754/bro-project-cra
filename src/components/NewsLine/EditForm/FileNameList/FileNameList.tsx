import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"
import classNames from "classnames";

type fileListProps = {
  fileList: FileList,
  fileImage: string
}

type Props = {
  fileList: fileListProps[],
  setFileList: React.Dispatch<React.SetStateAction<fileListProps[]>>,
  errorMessage: IErrorMessage | undefined
}

export default function FileInput({ fileList, setFileList, errorMessage }: Props) {
  return <div className={classNames("mt-4", styles.root)}>
    {fileList.length ? <><legend>Файлы:</legend><hr></hr></> : <></>}
    <div>
      <img src="" alt="" id="imgFileNameList" className={styles.image} hidden/>
    </div>
    <ul>
      {fileList.map((f, i) => (
        <li key={i}
        onClick={() => _showImage(f)}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {f.fileList.item(0)?.name}

          <span hidden
            onClick={() => {
              const tagImageId = document.getElementById('imgFileNameList')
              if (tagImageId) {
                tagImageId.hidden = true
              }             
              fileList.splice(i, 1);
              setFileList([...fileList]);
            }}
          ><small>удалить файл</small></span>
        </li>))}
    </ul>
    {errorMessage?.field === "fileUpload" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}

function _showImage(f: fileListProps) {
  const tagImageId = document.getElementById('imgFileNameList')
  if (tagImageId) {
    tagImageId.hidden = !tagImageId.hidden;
    tagImageId.setAttribute('src', f.fileImage)
    tagImageId.onclick = (() => tagImageId.hidden = !tagImageId.hidden)    
    // tagImageIdFoo.onmouseleave = (() => tagImageIdFoo.hidden = !tagImageIdFoo.hidden)    
  }
}