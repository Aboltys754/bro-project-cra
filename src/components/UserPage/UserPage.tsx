import React from "react";
import { Outlet } from "react-router-dom";
import Navigate from "../navigate/Navigate"


export default function UserPage() {    
    return (
        <>
            <Navigate />
            <h1>Настройки</h1>
            <hr />
            <Outlet />
        </>
)}