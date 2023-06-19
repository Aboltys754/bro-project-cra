import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"


type ISlide = {
    key: string
    createdAt: string,
    files: IStaticFile[] | [],
    id: string,
    isPublic: boolean,
    message: string,
    title: string,
    updatedAt: string,
}

export default function Slide(slide: ISlide) {
    return (
        <>
        <img src={`${serviceHost("mnote")}/api/mnote/static/images/${slide.files[0].fileName}`} alt="Слайд"/>
        </>
    )
}