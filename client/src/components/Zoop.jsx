import { motion } from "framer-motion"

const Zoop = ({children}) => {
    return (<motion.div className="overflow-hidden position-relative" initial="initial" whileHover="hover"
        >
        <div>
            {children.split("").map((elem, i) => {
                return <motion.span key={i} style={{whiteSpace: "pre"}} className="d-inline-block"
                    variants={{
                        initial: {y:0},
                        hover: {y:-100}
                    }}
                    transition={{
                        delay: 0.05 * i,
                        ease: "easeInOut"
                    }}>{elem === " " ? "\u00A0" : elem}</motion.span>
            })}
        </div>
        <div style={{position: "absolute", inset: '0'}}>
            {children.split("").map((elem, i) => {
                return <motion.span key={i} style={{whiteSpace: "pre"}} className="d-inline-block" 
                variants={{
                    initial: {y:100},
                    hover: {y:0}
                }} 
                transition={{
                    delay: 0.05 * i,
                    ease: "easeInOut"
                }}>{elem === " " ? "\u00A0" : elem}</motion.span>
            })}
        </div>
    </motion.div>)
}

export default Zoop;