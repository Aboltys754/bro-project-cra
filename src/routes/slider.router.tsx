import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import tokenManager from "../libs/token.manager";
import session from "../libs/token.manager";

import Slider from "../components/Slider/Slider";
import DocList from "../components/Slider/DocList/DocList";


export default {
    path: "/slider",
    element: <Slider />,
    children: [
        {
            index: true,
            element: <DocList />,
            loader: () => fetchWrapper(_getSlides).catch(() => redirect('/auth'))
          },
    ]
}

function _getSlides() {
    return fetch(`${serviceHost("informator")}/api/informator/docflow`, {
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      }
    })
  }