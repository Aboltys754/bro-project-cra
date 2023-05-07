import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

// import Main from "../components/Main/Main"
// import session from "../libs/token.manager"
import catalogRouter from "./catalog.router"
import authRouter from "./auth.router"
import aboutCompanyRouter from "./about.router"
import userRouter from "./user.router"
import settingRouter from "./setting.router"
import docFlowRouter from "./docflow.router"
import userPageRoute from "./userPage.route"

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog'),
    // element: <Main />,
    // loader: () => session.start(),
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingRouter,
  docFlowRouter,
  userPageRoute
])

export default <RouterProvider router={router} />