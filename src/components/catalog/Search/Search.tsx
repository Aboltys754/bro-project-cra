import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import SearchPane from "../SearchPane/SearchPane"
import NextSearch from "../NextSearch/NextSearch"
import styles from "./styles.module.css"

export default function Search() {
  const [searchResult, setSearchResult] = useState<ISearchResult>()
  const [hiddenNextSearch, setHiddenNextSearch] = useState(false)

  return <div className={styles.root}>
    <h3>Поиск позиций</h3>

    <SearchForm
      offset={0}
      limit={25}
      setSearchResult={setSearchResult} 
      setHiddenNextSearch={setHiddenNextSearch} />

    <SearchPane products={searchResult?.positions} />

    <NextSearch
      hiddenNextSearch={hiddenNextSearch}
      setHiddenNextSearch={setHiddenNextSearch}
      searchResult={searchResult}
      setSearchResult={setSearchResult} />
  </div>
}
