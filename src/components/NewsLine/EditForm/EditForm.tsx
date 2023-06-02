import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavigateFunction, useLocation } from "react-router-dom"
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
import FileNameList from "./FileNameList/FileNameList"


export default function EditForm() {
  session.subscribe('NewsLine-EditList');
  const [news, setNews] = useState();
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  const [fileList, setFileList] = useState<FileList[]>([])
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const navigate = useNavigate();
  const stateFunction = useLocation().state.stateFunction;
  const newsId = useLocation().state.newsId;

  if (stateFunction === "creature") {
    return (
      <div className={styles.root}>
        <form 
          onSubmit={event => _onSubmit(event, setDisabled, setErrorResponse, fileList, navigate)}
        >
          <fieldset disabled={disabled} className="form-group">

            <TitleDoc errorMessage={errorMessage} /> 

            <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

            <FileInput errorMessage={errorMessage}
              setFileList={(file: FileList) => setFileList([...fileList, file])} />

            <TextPane/>
            <div className={styles.isPablick}>              
              <input type="checkbox" id="isPablick" value="true" name="isPublic"/>
              <label htmlFor="isPablick">Опубликовать</label>
            </div> 
            

            <>
              <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

              <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => navigate("/newsLine")}>Отмена</span>
            </>
            </fieldset>
        </form>
      </div>  
    )
  } else {

    useEffect(() => {
      fechDataNewsr(newsId)
      .then((res) => setNews(res))

    }, [])
    console.log(news)
    return (
    <div className={styles.root}>
      <form 
        onSubmit={event => _onSubmit(event, setDisabled, setErrorResponse, fileList, navigate)}
      >
        <fieldset disabled={disabled} className="form-group">

          <TitleDoc errorMessage={errorMessage} /> 

          <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

          <FileInput errorMessage={errorMessage}
            setFileList={(file: FileList) => setFileList([...fileList, file])} />

          <TextPane/>
          <div className={styles.isPablick}>              
            <input type="checkbox" id="isPablick" value="true" name="isPublic"/>
            <label htmlFor="isPablick">Опубликовать</label>
          </div> 
          

          <>
            <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

            <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => navigate("/newsLine")}>Отмена</span>
          </>
          </fieldset>
      </form>
    </div>  
)
  }

  }

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  navigate: NavigateFunction
) {
  event.preventDefault();

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
    .finally(() => navigate("/newsLine")); 
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

const fechDataNewsr = async (newsId: string) => {
  const response = await fetch(`${serviceHost("mnote")}/api/mnote/${newsId}`, {
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