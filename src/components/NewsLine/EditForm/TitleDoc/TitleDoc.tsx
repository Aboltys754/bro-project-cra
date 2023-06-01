import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  errorMessage: IErrorMessage | undefined
}

export default function TitleDoc({errorMessage }: Props) {
  return <>
    <div className={styles.root}>
      <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
      <input 
        type="text" 
        id="titleInput"
        name="title" 
        className="form-control" 
        placeholder="Введите название документа" />
    </div>
    {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}