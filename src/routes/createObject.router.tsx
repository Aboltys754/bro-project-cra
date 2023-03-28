import { redirect } from "react-router-dom";
import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";
import fetchWrapper from "../libs/fetch.wrapper";

import CreateObject from "../components/CreateObject/CreateObject";
import ListOldObject from "../components/CreateObject/ListOldObject/ListOldObject";
import CreateNewObject from "../components/CreateObject/CreateNewObject/CreateNewObject";


export default {
    path: "/createObject",
    element: <CreateObject />,
    children: [
      {
        index: true,
        elment: <></>,
        loader: () => redirect('/createObject/OldList'), 
      },
      {
        path: "/createObject/OldList",
        element: <ListOldObject />,
        loader: () => fetchWrapper(_getAccessSettings).catch(() => redirect('/auth'))
        .catch(() => redirect('/auth')),       
      },
      {
        path: "/createObject/new",
        element: <CreateNewObject />,
        loader: () => fetchWrapper(_getAccessSettings).catch(() => redirect('/auth'))
        .catch(() => redirect('/auth')),
      },
    ]
}

function _getAccessSettings() {
  return fetch(`${serviceHost("informator")}/api/informator/setting/access`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}