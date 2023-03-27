import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate"
import styles from "./styles.module.css"

export default function Catalog() {
  return <>
    <Navigate />
    <div className={styles.root}>
      <h1>Каталог</h1>
      <hr />
      <Outlet />
    </div>
  </>
}