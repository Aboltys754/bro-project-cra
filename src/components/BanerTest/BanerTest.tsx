import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css"

import Navigate from "../navigate/Navigate";

export default function BanerTest() {
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>Тест Слайдер</h1>
            <hr />
            <Outlet />
        </div>
    </>
}