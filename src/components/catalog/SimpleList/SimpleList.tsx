import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import EditForm from "../EditForm/EditForm"

const dataList: {
  [index: string]: { 
    [index: string]: string
  }
} = {
  brands: {
    title: "Редактирование брендов",
    placeholder: "Бренд",
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholder: "Поставщик",
  },
}

export default function SimpleList({ typeList }: { [index: string]: keyof typeof dataList }){
  const [idActiveRow, setIdActiveRow] = useState(-1)

  return <>
    <h3>{dataList[typeList].title}</h3>

    <button type="button" className="btn btn-outline-primary" onClick={() => setIdActiveRow(0)}>Новая запись</button>

    {idActiveRow === 0 ? <EditForm setIdActiveRow={setIdActiveRow} /> : ""}

    {_makeList(useLoaderData(), idActiveRow, setIdActiveRow)}
  </>
}


function _makeList(rows: unknown, idActiveRow: number, setIdActiveRow: React.Dispatch<React.SetStateAction<number>>) {
  if (Array.isArray(rows)) {
    return rows.map((value, index) => <Row
      key={index}
      id={index + 1}
      title={value.title}
      idActiveRow={idActiveRow}
      setIdActiveRow={setIdActiveRow} />)
  }
}

function Row({ id, title, idActiveRow, setIdActiveRow }: { id: number, title: string, idActiveRow: number, setIdActiveRow: React.Dispatch<React.SetStateAction<number>> }) {
  const [showOptionalButton, setShowOptionalButton] = useState(false);


  return idActiveRow === id ?
    <EditForm setIdActiveRow={setIdActiveRow} title={title}/> :
    <li
      style={{ padding: "10px" }}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {showOptionalButton ? <>
        {title} <span
          onClick={() => {
            setIdActiveRow(id)
          }}
        >
          Изменить
        </span> /
        <span>Удалить</span>
      </> : title}
    </li>;
}
