import Navigate from "../navigate/Navigate"
import styles from "./styles.module.css"
// import logo from "../navigate/image/logo.svg"
import Banner from "../Banner/Banner"

export default function Main() {
    return <>
        <Navigate />
        <div className={styles.root}>
          <Banner />
            {/* <img src={logo} loading="lazy" />
            <h3>Поиск позиций</h3> */}
        </div>
    </>
}