import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import Test from "../components/catalog/Test/Test"
import Test2 from "../components/catalog/Test/Test2"
import serviceHost from "../libs/service.host"

export default {
  path: "/catalog",
  element: <Catalog />,
  children: [
    {
      index: true,
      element: <Search />,
    },
    {
      path: "/catalog/edit/brands",
      element: <SimpleList typeList="brands" />,
      loader: () => fetch(`${serviceHost("bridge")}/api/bridge/brands`)
        .catch(error => {
          console.log(error.message);
          return [];
        })
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => fetch(`${serviceHost("bridge")}/api/bridge/providers`)
        .catch(error => {
          console.log(error.message);
          return [];
        })
    },
    {
      path: "/catalog/edit/upload",
      element: <UploadPrice />,
      loader: async () => Promise.all([
        _query(`${serviceHost("bridge")}/api/bridge/brands`),
        _query(`${serviceHost("bridge")}/api/bridge/providers`)
      ])
        .catch(error => [[], []])
    },
    {
      path: "/catalog/edit/test",
      element: <Test />
    },
    {
      path: "/catalog/edit/test2",
      element: <Test2 />
    },
  ]
}

function _query(url: string) {
  return fetch(url)
    .then(async res => {
      if (res.ok) {
        return res.json()
      }

      throw new Error()
    })
}