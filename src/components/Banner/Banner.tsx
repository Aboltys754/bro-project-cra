import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"
// import classNames from "classnames";
import Slide from "./Slide/Slide"

export default function Banner() {
  const slides = useLoaderData() as ISlider[];
  if(!slides.length) {
    return <></>
  }

  const [active, setActive] = useState(0)

  return <div className={styles.root}>
    <div className={styles.slider}>

      <div className={styles.slidesWrapper} style={{ left: `${active * -180}px` }}>
        {slides.map((e, i) => (
          <Slide
            key={i}
            image={e.files[0]?.fileName}
            title={e.title}
            message={e.message}
          />
        ))}
      </div>

    </div>

    <div>
      <p onClick={() => setActive(active === 0 ? slides.length - 1 : active - 1)}>back</p>
      <p onClick={() => setActive(active === slides.length - 1 ? 0 : active + 1)}>forward</p>
    </div>
  </div>

}
