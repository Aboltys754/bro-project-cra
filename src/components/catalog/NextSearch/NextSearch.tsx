import fetcher from "../fetcher"
import classNames from "classnames";
import { useSelector } from "react-redux";

type Props = {
  hiddenNextSearch: boolean
  setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>
  searchResult: ISearchResult | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
}

export default function NextSearch({ hiddenNextSearch, setHiddenNextSearch, setSearchResult, searchResult }: Props) {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  return searchResult?.positions.length ?
      <button
          hidden={hiddenNextSearch}
          onClick={() => onSubmit(setHiddenNextSearch, searchResult, setSearchResult, searchResult.offset, searchResult.limit)}
          type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}>Загрузить ещё</button>
      : <></>
}

async function onSubmit(
  setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>,
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset: number,
  limit: number) {

  const query = sessionStorage.getItem('lastQuery') || "";
  const lastId = searchResult?.positions[searchResult?.positions.length - 1].id;

  setHiddenNextSearch(true)
  const result = await fetcher(query, offset + limit, limit, lastId)
    .finally(() => setHiddenNextSearch(false));

  if (!result) {
    setHiddenNextSearch(true)
    return;
  }

  if (searchResult) {
    setSearchResult({
      ...result,
      positions: [...searchResult.positions, ...result.positions]
    })
    return;
  }

  setSearchResult(result)
}
