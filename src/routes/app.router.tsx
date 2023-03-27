import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import catalogRouter from './catalog.router'
import authRouter from './auth.router'
import aboutCompanyRouter from './about.router'
import userRouter from './user.router'
import settingRouter from './setting.router'
import docsRouter from "./docs.router";
import createObjectRouter from "./createObject.router";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog'),
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingRouter,
  docsRouter,
  createObjectRouter
])

export default <RouterProvider router={router} />