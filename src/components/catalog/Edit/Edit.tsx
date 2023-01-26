import {
  Link,
  useLoaderData,
} from "react-router-dom";
import EditForm from "../EditForm/EditForm"
import styles from "./styles.module.css"

type Row = {
  id: number;
  title: string;
}

export default function Edit({type}: {[index: string]: string}) {
  const rows = useLoaderData();
  const {title, name, placeholder} = _makeData(type)

  return <>
    <h3>{title}</h3>
    <button type="button" className="btn btn-outline-primary" onClick={()=>{}}>Новая запись</button>
    <EditForm name={name} placeholder={placeholder} />
    {_makeRows(rows as Row[])}
  </>
}

function _makeRows(rows: Row[]){
  return rows.map((v, i) => {
    return <li key={i}>{v.title}</li>
  })
}

function _makeData(type: string){
  switch(type){
    case "brands": return {
      title: "Редактирование брендов",
      name: "title",
      placeholder: "Бренд",
    }
    case "providers": return {
      title: "Редактирование поставщиков",
      name: "title",
      placeholder: "Поставщик",
    }
    default: return {
      title: "Редактирование списка",
      name: "title",
      placeholder: "Название",
    }
  }
}
