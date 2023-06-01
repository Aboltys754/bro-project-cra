import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom"
import styles from "./styles.module.css"
import classNames from "classnames";

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
import InputUser from "./InputUser/InputUser";
import DisplayUser from "./DisplayUser/DiasplayUser";
// import SelectPane from "./SelectPane/SelectPane";


type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  doc?: IDoc
}

type PropsRoles = {
  directings: [],
  id: string,
  title: string
}

type PropsUserList = {
  uid: string,
  email: string,
  photo: string,
  name: string
  roles: Array<PropsRoles>,
}

export default function EditForm() {
  session.subscribe('DocFlow-EditList');
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  // список всех пользователей
  const [userList, setUserList] = useState(Array<PropsUserList>)
  const [fileList, setFileList] = useState<FileList[]>([])
  // список всех пользователей ознакомителей
  const [userListFamiliarizer, setUserListFamiliarizer] = useState(Array<string>)
  // список всех пользователей подписантов
  const [userListSubscribers, setUserListSubscribers] = useState(Array<string>)
  // список выбранных пользователей ознакомителей
  const [currentUserList, setCurrentUserList] = useState(Array<Array<string | undefined>>)
  // список выбранных пользователей подписантов
  const [currentUserListSubscribers, setCurrentUserListSubscribers] = useState(Array<Array<string | undefined>>)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const navigate = useNavigate(); 

  return (
      <div className={styles.root}>
        <form 
          onSubmit={event => _onSubmit(event, setDisabled, setErrorResponse, fileList, currentUserList, currentUserListSubscribers, userList, navigate)}
        >
          <fieldset disabled={disabled} className="form-group">

            <TitleDoc errorMessage={errorMessage} /> 

            <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

            <FileInput errorMessage={errorMessage}
              setFileList={(file: FileList) => setFileList([...fileList, file])} />

            <TextPane/>

            <>
              <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

              <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => console.log("отмена")}>Отмена</span>
            </>

            </fieldset>
        </form>
      </div>
  
  
  
)}



function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  currentUserList: (string | undefined)[][],
  currentUserListSubscribers: (string | undefined)[][],
  userList: PropsUserList[],
  navigate: NavigateFunction,
  
) {
  event.preventDefault();
  // setDisabled(true);

  const fd = new FormData(event.currentTarget)
  fileList.map(f => fd.append('images', f[0]))


  fetchWrapper(() => fetch(`${serviceHost('mnote')}/api/mnote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      },
      body: fd
    }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        console.log(res)        
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

  

  // fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc?.id || ''}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Authorization': `Bearer ${tokenManager.getAccess()}`
  //   },
  //   body: fd
  // }))
  //   .then(responseNotIsArray)
  //   .then(async response => {
  //     if (response.ok) {
  //       const res = await response.json()
  //       setShowForm(false)

  //       if (addDoc) {
  //         addDoc(res)
  //       }
  //       if (updDoc) {
  //         updDoc(res)
  //         navigate("/docflow")
  //       }
  //       return;
  //     }
  //     else if (response.status === 400) {
  //       const res = await response.json()
  //       setErrorResponse(_getErrorResponse(res.error))
  //       return;
  //     }
  //     throw new Error(`response status: ${response.status}`)
  //   })
  //   .catch(error => console.log(error.message))
  //   .finally(() => setDisabled(false));
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