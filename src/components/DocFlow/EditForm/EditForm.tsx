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
  typeDoc: DocType
  doc?: IDoc
  addDoc?: (row: IDoc) => void
  updDoc?: (row: IDoc) => void
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

export default function EditForm({ setShowForm, doc, addDoc, updDoc, typeDoc }: Props) {
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
  
  

  useEffect(() => {
      fechDataUser()
      .then((res) => {
          setUserList(res)
          const tempListOfUser = [] as Array<string>
          const tempListOfUserSubscribers = [] as Array<string>
          res.map((value: PropsUserList) =>{ 
            tempListOfUser.push(`${value.name} / ${value.roles[0]?.title}`);
            tempListOfUserSubscribers.push(`${value.name} / ${value.roles[0]?.title}`);
        })          
          setUserListFamiliarizer(tempListOfUser)
          setUserListSubscribers(tempListOfUserSubscribers)
      })
      .catch((e) => {console.log(e.message)})
      if (updDoc !== undefined && doc?.acceptor.length !== 0) { 
        const tempDocUserAcceptors = [] as Array<Array<string | undefined>>       
        doc?.acceptor.map((user) => {    
          const tempDocUserAcceptor = [] as Array<string | undefined>      
          tempDocUserAcceptor.push(user.name, user.uid)
          tempDocUserAcceptors.push(tempDocUserAcceptor)
          })
          setCurrentUserList(tempDocUserAcceptors)    
      }
      if (updDoc !== undefined && doc?.recipient.length !== 0) {  
        const tempDocUserRecipients = [] as Array<Array<string | undefined>>      
        doc?.recipient.map((user) => {          
          const tempDocUserRecipient = [] as Array<string | undefined>
          tempDocUserRecipient.push(user.name, user.uid)
          tempDocUserRecipients.push(tempDocUserRecipient)
          })
      setCurrentUserListSubscribers(tempDocUserRecipients)     
      }
      
  }, [])


  return <form className={styles.root}
    onSubmit={event => _onSubmit(event, setDisabled, setShowForm, setErrorResponse, fileList, currentUserList, currentUserListSubscribers, userList, navigate, doc,  addDoc, updDoc)}
  >
    <fieldset disabled={disabled} className="form-group">

      <small>{typeDoc.directing.title} / {typeDoc.task?.title}</small>


      <legend className="mt-3">{addDoc ? "Создание документа" : "Изменение документа"}</legend>

      {/* <SelectPane 
    directingId={doc?.directing.id.toString()}
    taskId={doc?.task.id.toString()}
    errorMessage={errorMessage} 
    mode={addDoc ? "create" : "update"} /> */}

      <TitleDoc errorMessage={errorMessage} title={doc?.title} />

      <FileLinkList docId={doc?.id} files={doc?.files} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <TextPane description={doc?.description} />

      <HiddenInput typeDoc={typeDoc} />

      <div className={styles.formUser}>
        <DisplayUser currentUserList={currentUserList} setCurrentUserList={setCurrentUserList} userList={userListFamiliarizer} setUserList={setUserListFamiliarizer}/>
        <DisplayUser currentUserList={currentUserListSubscribers} setCurrentUserList={setCurrentUserListSubscribers} userList={userListSubscribers} setUserList={setUserListSubscribers}/>
      </div>

      <div className={styles.formUser}>
        <InputUser currentUserList={currentUserList} setCurrentUserList={setCurrentUserList}/>
        <InputUser currentUserList={currentUserListSubscribers} setCurrentUserList={setCurrentUserListSubscribers}/>
      </div>

      <>
        <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

        <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => setShowForm(false)}>Отмена</span>
      </>

      <input type="hidden" name="author" defaultValue={session.getMe()?.uid} />
    </fieldset>
  </form>
}



function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  currentUserList: (string | undefined)[][],
  currentUserListSubscribers: (string | undefined)[][],
  userList: PropsUserList[],
  navigate: NavigateFunction,
  doc?: IDoc,
  addDoc?: (row: IDoc) => void,
  updDoc?: (row: IDoc) => void,
  
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]))
  // перебирает список подписантов и записывет в fd
  console.log(currentUserList)
  if (currentUserList.length !== 0) {
    currentUserList.map((e) => {
      fd.append(`acceptor[${e[1]}]`, '')
    })}
    
  // перебирает список ознокомителей и записывет в fd  
  if (currentUserListSubscribers.length !== 0) {
    currentUserListSubscribers.map((e) => {
      fd.append(`recipient[${e[1]}]`, '')
    })
  }

  // const test = fd.get('author') || ''
  // fd.append(`acceptor[${test}1]`, '')
  // fd.append(`acceptor[${test}2]`, '')
  // fd.append(`recipient[${test}]`, 'on')

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
        setShowForm(false)

        if (addDoc) {
          addDoc(res)
        }
        if (updDoc) {
          updDoc(res)
          navigate("/docflow")
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

const fechDataUser = async () => {
  const response = await fetch(`${serviceHost("informator")}/api/informator/user/search`, {
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
          }
        })
      if (!response.ok) {
          throw new Error(`Что то пошло не так ${response.status}`)
      } else {
          return await response.json()
      }
  }