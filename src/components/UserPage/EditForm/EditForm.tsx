import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import TextPane from "./TextPane/TextPane";
import TitleDoc from "./TitleDoc/TitleDoc";
import FileInput from "./FileInput/FileInput";
import FileLinkList from "./FileLinkList/FileLinkList"
import FileNameList from "./FileNameList/FileNameList"
import HiddenInput from "./HiddenInput/HiddenInput";
import styles from "./styles.module.css"
import classNames from "classnames";
import UsersInput from "./UsersInput/UsersInput";


type Props = {
  typeDoc: DocType
  doc?: IDoc
  addDoc?: (row: IDoc) => void
  updDoc?: (row: IDoc) => void
}

export default function EditForm({ doc, addDoc, updDoc, typeDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  const [fileList, setFileList] = useState<FileList[]>([])
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  console.log(doc)

  return <form className={styles.root}
    onSubmit={event => _onSubmit(event, setDisabled, setErrorResponse, fileList, doc, addDoc, updDoc)}
  >
    <fieldset disabled={disabled} className="form-group">

      <small>{typeDoc.directing.title} / {typeDoc.task?.title}</small>


      <legend className="mt-3">{addDoc ? "Создание документа" : "Изменение документа"}</legend>

      <TitleDoc errorMessage={errorMessage} title={doc?.title} />

      <FileLinkList docId={doc?.id} files={doc?.files} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <TextPane description={doc?.description} />

      <HiddenInput typeDoc={typeDoc} />
      
      <UsersInput/>
      
      <>
        <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

        <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} 
              onClick={() => navigate(-1)}>Отмена</span>
      </>

      <input type="hidden" name="author" defaultValue={session.getMe()?.uid} />
    </fieldset>
  </form>
}



function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  doc?: IDoc,
  addDoc?: (row: IDoc) => void,
  updDoc?: (row: IDoc) => void
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]))

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc?.id || ''}`, {
    method: addDoc ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()

        if (addDoc) {
          addDoc(res)
        }
        if (updDoc) {
          updDoc(res)
        }
        return;
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "invalid title":
      return { field: "title", message: "Введите название документа" }
    case "invalid directing id":
      return { field: "directSelect", message: "Не выбрано направление" }
    case "invalid task id":
      return { field: "taskSelect", message: "Не выбран тип документа" }
    case "bad mime type":
      return { field: "fileUpload", message: "Не поддерживаемый тип файлов" }
    default: return { field: "", message: "" }
  }
}