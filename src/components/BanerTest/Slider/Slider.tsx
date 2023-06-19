import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

import Slide from "../Slide/Slide";


type ISlide = {
    createdAt: string,
    files: IStaticFile[] | [],
    id: string,
    isPublic: boolean,
    message: string,
    title: string,
    updatedAt: string,
}

export default function Slider() {    
    const slides = useLoaderData() as ISlide[];
    const [viewScreen, setViewScreen] = useState(document.documentElement.clientWidth);
    useEffect(() => {
        setViewScreen(document.documentElement.clientWidth)
    }, [window.onresize = () =>  setViewScreen(document.documentElement.clientWidth)])
    console.log(viewScreen)

    return (

        !slides.length ? <></> :
    
        <div className={classNames(classOnTheSizeWindow(viewScreen))}>
            <p className={styles.simbol} onClick={() => console.log("+")}>&#60;</p>            
                <div  className={styles.slides}>
                    {slides.map((slide, index) => (    
                        <Slide key={slide.id} {...slide}/>                                        
                    ))}
                </div>
            <p className={styles.simbol} onClick={() => console.log("-")}>&#62;</p>            
        </div>
    )
}

function classOnTheSizeWindow(viewScreen: number) {
    if (viewScreen > 900) {
        return styles.red
    } else if (500 < viewScreen && viewScreen <= 900) {
        return styles.green
    } else if (viewScreen <= 500) {
        return styles.blue
    }
}