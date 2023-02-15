import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import Cabinet from "./Cabinet/Cabinet"

export default function User() {
  const [user, setUser] = useState(useLoaderData() as IUser)
  const [editMode, setEditMode] = useState(false)

  return <>
    <Navigate />

    {editMode ?
      <></>
      // <EditForm about={about} setAbout={setAbout} editMode={editMode} setEditMode={setEditMode} />
      : <>

        <Cabinet user={user} />
      </>}
  </>
}