import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"

export default function Slider() {

    const slides = useLoaderData() as ISlider[];

    console.log(slides)
        if(!slides.length) {
            return <></>
        }

    return (
        <div className={styles.root}>
            <p className={styles.simbol} onClick={() => console.log("+")}>&#60;</p>            
                <div  className={styles.slides}>
                    {slides.map((slide, index) => (                
                        <img src={`${serviceHost("mnote")}/api/mnote/static/images/${slide.files[0].fileName}`} alt="Слайд"  key={index}/>                
                    ))}
                </div>
            <p className={styles.simbol} onClick={() => console.log("-")}>&#62;</p>            
        </div>
    )
}