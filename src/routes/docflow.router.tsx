import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager";

import { responseNotIsArray } from "../middleware/response.validator";
import DocFlow from "../components/DocFlow/DocFlow"
import DocList from "../components/DocFlow/DocList/DocList"
import DocPage from "../components/DocFlow/DocPage/DocPage";
import ListTasks from "../components/DocFlow/ListTasks/ListTasks";

export default {
  path: "/docflow",
  element: <DocFlow />,
  children: [
    {
      index: true,
      element: <DocList />,
      loader: () => fetchWrapper(_getDocs).catch(() => redirect('/auth'))
    },    
    {
      path: "/docflow/listMeTasks",
      element: <ListTasks/>,
      loader: () => session.start(),
    },
    {
      path: "/docflow/listOtherTasks",
      element: <ListTasks/>,
      loader: () => session.start(),
    },    
    {
      path: "/docflow/:id",
      element: <DocPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
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

function _getDoc(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDocs() {
  return fetch(`${serviceHost("informator")}/api/informator/docflow`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}