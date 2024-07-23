import { motion } from "framer-motion"

const Zoop = ({children}) => {
    return (<motion.div className="overflow-hidden position-relative" initial="initial" whileInView="inview"
        >
        <div>
            {children.split("").map((elem, i) => {
                return <motion.span key={i} style={{whiteSpace: "pre"}} className="d-inline-block" 
                variants={{
                    initial: {y:100, opacity: 0},
                    inview: {y:0, opacity: 1}
                }} 
                transition={{
                    duration: 1.1,
                    delay: 0.01 * i,
                    ease: [0.22,1,0.36,1],
                }}>{elem === " " ? "\u00A0" : elem}</motion.span>
            })}
        </div>
    </motion.div>)
}

export default Zoop;