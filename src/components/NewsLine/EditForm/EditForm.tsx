import { useState } from "react";
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
import FileLinkList from "./FileLinkList/FileLinkList";
import IsPublic from "./IsPublic/IsPublic";


export default function EditForm() {
  session.subscribe('NewsLine-EditList');
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  const [fileList, setFileList] = useState<FileList[]>([])
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const navigate = useNavigate();
  const stateNews = useLocation().state.news as INews;

  console.log(stateNews)

    return (
      <div className={styles.root}>
        <form 
          onSubmit={event => _onSubmit(event, setErrorResponse, fileList, stateNews, navigate)}
        >
          <fieldset className="form-group">

            <TitleDoc errorMessage={errorMessage} title={stateNews?.title}/> 

            <FileLinkList docId={stateNews?.id} files={stateNews?.files} />

            <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

            <FileInput errorMessage={errorMessage}
              setFileList={(file: FileList) => setFileList([...fileList, file])} />

            <TextPane description={stateNews?.message}/>

            <IsPublic isPublic={stateNews?.isPublic}/>            

            <>
              <input type="submit" 
                className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} 
                value="Записать" />

              <span 
                className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} 
                onClick={() => navigate("/newsLine")}>Отмена</span>
            </>
            </fieldset>
        </form>
      </div>  
    )}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  stateNews: INews,
  navigate: NavigateFunction
) {
  event.preventDefault();

  const fd = new FormData(event.currentTarget)
  fileList.map(f => fd.append('images', f[0]))

  // если пользователь пришел не по нажатию кнопки редактировать, тогда stateNews будет undefined 
  fetchWrapper(() => fetch(`${serviceHost('mnote')}${stateNews ? `/api/mnote/${stateNews?.id}` : `/api/mnote`}`, {
      method: `${stateNews ? 'PATCH' : 'POST'}`,
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