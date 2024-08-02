import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Transition.css'
import { motion } from "framer-motion"

const Transition = (ChildComponent) => {
    return () => (
        <>
            <ChildComponent />
            <Curve />
        </>
    )
}

const routes = {
    "/": "Home",
    "/plans": "Plans & Pricings",
    "/login": "Login",
    "/signup": "SignUp",
    "/documentation": "Documentation",
    "/about": "About",
    "/paper": "Test Maker",
    "/lab": "Lab"
}

const anim = (variants) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants
    }
}

function Curve() {
    const location = useLocation()
    const [dimensions, setDimensions] = useState({width:0,height:0})

    useEffect(()=>{
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    },[])

    const text = {
        initial: {
            opacity: 1
        },
        enter: {
            opacity: 0,
            top: -100,
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.22,1,0.36,1]
            },
            transitionEnd: {
                top: "57.5%",
                display: "none"
            }
        },
        exit:{
            display: "block",
            opacity: 1,
            top: "50%",
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.22,1,0.36,1]
            },
        }
    }

    return (
    <>
      <div className='curve'>
        <motion.p {...anim(text)} className='routes'>{routes[location.pathname]}</motion.p>
        <div className='background' style={{background: "linear-gradient(45deg,#4A00E0,#8E2DE2)",opacity: dimensions.width > 0 ? '0' : '1'}}></div>
        {dimensions.width > 0 && <SVG {...dimensions} />}
      </div>
    </>)
}

const SVG = ({width, height}) => {
    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 300
    `;

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 300
    `;

    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.22,1,0.36,1]
            }
        },
        exit: {
            d: initialPath,
            transition: {
                duration: 0.75,
                ease: [0.22,1,0.36,1]
            }
        }
    }

    const slide = {
        initial: {
            top: "-300px"
        },
        enter: {
            top: "-100vh",
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.22,1,0.36,1]
            },
            transitionEnd: {
                top: "100vh"
            }
        },
        exit: {
            top: "-300px",
            transition: {
                duration: 0.75,
                ease: [0.22,1,0.36,1]
            },
        }
    }

    return (
        <motion.svg {...anim(slide)}>
            <defs>
                <linearGradient id="myGradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#8E2DE2" />
                <stop offset="100%" stopColor="#4A00E0" />
                </linearGradient>
            </defs>
            <motion.path {...anim(curve)} fill={"url(#myGradient)"}></motion.path>
        </motion.svg>
    )
}

export default Transition
