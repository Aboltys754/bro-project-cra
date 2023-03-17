import styles from "./styles.module.css"

type Props = {
  email: string
}

export default function UserByRole({email}: Props) {

  return <div className={styles.root}>
    {email}
  </div>
}