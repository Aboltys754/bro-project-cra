import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import session from "../libs/token.manager"

import BanerTest from "../components/BanerTest/BanerTest"
import Slider from "../components/BanerTest/Slider/Slider"


export default {
    path: "/sliderTest",
    element: <BanerTest />,    
    children: [
        {
            index: true,
            element: <Slider />,
            loader: () => fetchWrapper(_getSlider)
            .catch(() => [])
            .finally(() => session.start()),
        },
    ]
}


async function _getSlider() {
    return fetch(`${serviceHost("mnote")}/api/mnote/search/note/?isPublic=1` )
  }