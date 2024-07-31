import { useRef } from "react"
import "./ZoomTransition.css"
import { motion, useScroll, useTransform } from "framer-motion"

const ZoomTransition = () => {
    const container = useRef(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

    const pictures = [
        {
            src: "/images/hero/flag.jpg",
            scale: scale4
        },
        {
            src: "/images/hero/boy1.jpg",
            scale: scale6
        },
        {
            src: "/images/hero/girl.jpg",
            scale: scale8
        },
        {
            src: "/images/hero/computer.jpg",
            scale: scale5
        },
        {
            src: "/images/hero/boy2.jpg",
            scale: scale9
        },
    ]

    return <div className="zoom-transition-container" ref={container}>
        <div className="sticky-box">
            {
                pictures.map((picture, i)=>{
                    return <motion.div className="el" style={{scale: picture.scale}} key={i}>
                    <div className="image-container">
                        <img src={picture.src} alt="Pakistani Flag" loading="lazy" />
                    </div>
                </motion.div>
                })
            }
        </div>
    </div>
}

export default ZoomTransition