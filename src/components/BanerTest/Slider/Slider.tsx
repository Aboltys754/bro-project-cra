import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"

export default function Slider() {

    const slides = useLoaderData() as ISlider[];

    console.log(slides)
        if(!slides.length) {
            return <></>
        }

    return (
        <div>
            1
        </div>
    )
}