import { useLoaderData } from "react-router-dom";

import UserByRole from "../UserByRole/UserByRole";
import styles from "./styles.module.css"

export default function BundleRole() {

  const [users, roles] = useLoaderData() as [IUser[], IRow[]];

  users.map(user => console.log(user))

  return <div className={styles.root}>
    <h3>Привязка ролей пользователей</h3>

    {users.map(user => {
      return <UserByRole key={user.email} email={user.email}/>
    })}
  </div>
}