import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  image: string | undefined
  title: string
  message: string
}

export default function Slider({ image, title, message }: Props) {
  return <div className={classNames(styles.root)}>
    <div>{title}</div>
    {image ? <img src={`${serviceHost('mnote')}/api/mnote/static/images/${image}`} />: <></>}
    <div>{message}</div>
  </div>
}