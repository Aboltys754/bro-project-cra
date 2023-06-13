import { redirect, LoaderFunctionArgs } from "react-router-dom";

import tokenManager from "../libs/token.manager";
import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import session from "../libs/token.manager";
import { responseNotIsArray } from "../middleware/response.validator";

import DocPage from "../components/DocFlow/DocPage/DocPage";
import ListTasks from "../components/UserPage/ListTasks/ListTasks";
import TasksPage from "../components/UserPage/TasksPage/TasksPage";
import UserPage from "../components/UserPage/UserPage";
import DocSelectType from "../components/UserPage/DocSelectType/DocSelectType";

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
        path: "/userPage/createTasks",
        element: <DocSelectType />,
        loader: () => fetchWrapper([_getUsers, _getRoles])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth')),
      },
      {
        path: "/userPage/listMeTasks",
        element: <ListTasks/>,
        loader: () => session.start(),
      },
      {
        path: "/userPage/listOtherTasks",
        element: <ListTasks/>,
        loader: () => session.start(),
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

function _getUsers() {
  return fetch(`${serviceHost("informator")}/api/informator/user/all`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getRoles() {
  return fetch(`${serviceHost("informator")}/api/informator/role`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}