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
      {fileList.map((file, index) => (
        <li key={index}
        onClick={(event) => _showImage(file, event)}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {file.fileList.item(0)?.name}

          <span hidden
            onClick={() => {
              const tagImageId = document.getElementById('imgFileNameList')
              if (tagImageId) {
                tagImageId.hidden = true
              }             
              fileList.splice(index, 1);
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

function _showImage(file: fileListProps, event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const tagImageId = document.getElementById('imgFileNameList')
  if (tagImageId && event.target === event.currentTarget) {
    tagImageId.hidden = !tagImageId.hidden;
    tagImageId.setAttribute('src', file.fileImage)
    tagImageId.onclick = (() => tagImageId.hidden = !tagImageId.hidden)    
    // tagImageIdFoo.onmouseleave = (() => tagImageIdFoo.hidden = !tagImageIdFoo.hidden)    
  }
}