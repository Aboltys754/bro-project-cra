import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import tokenManager from "../libs/token.manager";
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import NewsLine from "../components/NewsLine/NewsLine";
import NewsList from "../components/NewsLine/NewsList/NewsList";
import NewsPage from "../components/NewsLine/NewsPage/NewsPage"
import EditForm from "../components/NewsLine/EditForm/EditForm";


export default {
    path: "/newsLine",
    element: <NewsLine />,
    children: [
        {
          index: true,
          element: <NewsList />,
          loader: () => fetchWrapper(_getNews).catch(() => redirect('/auth'))
        },
        {
          path: "/newsLine/editForm",
          element: <EditForm />,
          loader: () => session.start(),
          
        },
        {
          path: "/newsLine/:id",
          element: <NewsPage />,
          loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getOneNews(params.id))
            .then(responseNotIsArray)
            .then(res => {
              if (res.status === 404) {
                return redirect('/docflow')
              }
              return res;
            })
            .catch(() => redirect('/auth'))
        }
    ]
}

function _getNews() {
    return fetch(`${serviceHost("mnote")}/api/mnote/search/note`, {
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      }
    })
  }

function _getOneNews(id?: string) {
  return fetch(`${serviceHost("mnote")}/api/mnote/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}