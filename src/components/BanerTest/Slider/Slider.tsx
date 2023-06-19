import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"

import Slide from "../Slide/Slide";

export default function Slider() {

    type ISlide = {
        createdAt: string,
        files: IStaticFile[] | [],
        id: string,
        isPublic: boolean,
        message: string,
        title: string,
        updatedAt: string,
    }

    const slides = useLoaderData() as ISlide[];


    // window.onresize = function() {
    //     console.log(document.documentElement.clientWidth)
    // }
    
    
    console.log(slides)
        if(!slides.length) {
            return <></>
        }

    return (
        <div className={styles.root}>
            <p className={styles.simbol} onClick={() => console.log("+")}>&#60;</p>            
                <div  className={styles.slides}>
                    {slides.map((slide, index) => (    
                        <Slide key={index} {...slide}/>            
                        // <img src={`${serviceHost("mnote")}/api/mnote/static/images/${slide.files[0].fileName}`} alt="Слайд"  key={index}/>                
                    ))}
                </div>
            <p className={styles.simbol} onClick={() => console.log("-")}>&#62;</p>            
        </div>
    )
}