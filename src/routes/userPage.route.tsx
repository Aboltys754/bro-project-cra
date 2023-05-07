import tokenManager from "../libs/token.manager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import UserPage from "../components/UserPage/UserPage"
import { redirect, LoaderFunctionArgs } from "react-router-dom"
import TasksPage from "../components/UserPage/TasksPage/TasksPage"
import ListTasks from "../components/UserPage/ListTasks/ListTasks"
import DocPage from "../components/DocFlow/DocPage/DocPage";
import { responseNotIsArray } from "../middleware/response.validator";

export default {
    path: "/userPage",
    element: <UserPage />,
    children: [
      {
        index: true,
        element: <TasksPage/>,
        loader: () => fetchWrapper(_getDocs).catch(() => redirect('/auth')),        
      },
      {
        path: "/userPage/listMeTasks",
        element: <ListTasks/> 
      },
      {
        path: "/userPage/listOtherTasks",
        element: <ListTasks/>
      },
      {
        path: "/userPage/listMeTasks/:id",
        element: <DocPage />,
        loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
          .then(responseNotIsArray)
          .then(res => {
            if (res.status === 404) {
              return redirect('/userPage')
            }
            return res;
          })
          .catch(() => redirect('/auth'))
      },
      {
        path: "/userPage/listOtherTasks/:id",
        element: <DocPage />,
        loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
          .then(responseNotIsArray)
          .then(res => {
            if (res.status === 404) {
              return redirect('/userPage')
            }
            return res;
          })
          .catch(() => redirect('/auth'))
      }
    ]
}

function _getDocs() {
  return fetch(`${serviceHost("informator")}/api/informator/docflow`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDoc(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}