import { useState } from "react";

import config from "../../../config"
import styles from "./styles.module.css"

type Props = {
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>,
  placeholderSearch?: string,
}

export default function SearchForm({ api, setIdActiveRow, setRows, placeholderSearch }: Props) {
  const [disabled, setDisabled] = useState(false)

  return <form
    className={styles.root}
    onSubmit={(event) => _searchRow(event, api, setIdActiveRow, setRows, setDisabled)}>

    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control mt-4" placeholder={placeholderSearch || ""} />
    </fieldset>
  </form>
}

function _searchRow(
  event: React.FormEvent<HTMLFormElement>,
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>) {

  event.preventDefault()
  setDisabled(true)

  const fd = new FormData(event.target as HTMLFormElement)

  fetch(`${config.catalog.back.host || ''}${config.catalog.back.port ? ':' : ''}${config.catalog.back.port || ''}${api}/?title=${fd.get('query')}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setIdActiveRow(-1)
        setRows(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}