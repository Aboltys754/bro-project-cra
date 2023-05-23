import { Link } from "react-router-dom";

import session from "../../../libs/token.manager"
import styles from "./styles.module.css"
import classNames from "classnames";

export default function Greet() {
  session.subscribe('greet')

  return <div className={styles.root}>
    {session.getMe() ? <>

      <Link to="/user" className="nav-link">{session.getMe()?.email}</Link>

      <Link to="/auth/signout" className={classNames(styles.button,"nav-link")}>Sign out</Link>
    </>
      : <Link to="/auth" className={classNames(styles.button,"nav-link")}>Sign in</Link>}
  </div>
}