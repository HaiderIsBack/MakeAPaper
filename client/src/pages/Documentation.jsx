import "./Documentation.css"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faInfoCircle
  } from '@fortawesome/free-solid-svg-icons';

const Documentation = () => {
    const st1Ref = useRef(null)
    const st2Ref = useRef(null)
    const st3Ref = useRef(null)
    const st4Ref = useRef(null)
    const st5Ref = useRef(null)
    const st6Ref = useRef(null)

    const [ t1Ref, t1InView ] = useInView({ threshold: 0 })
    const [ t2Ref, t2InView ] = useInView({ threshold: 0 })
    const [ t3Ref, t3InView ] = useInView({ threshold: 0 })
    const [ t4Ref, t4InView ] = useInView({ threshold: 0 })
    const [ t5Ref, t5InView ] = useInView({ threshold: 0 })
    const [ t6Ref, t6InView ] = useInView({ threshold: 0 })


    useEffect(()=>{
        const statusPoints = [
            st1Ref.current,
            st2Ref.current,
            st3Ref.current,
            st4Ref.current,
            st5Ref.current,
            st6Ref.current
        ]

        // Adds active class when invoked
        const addActives = (index) => {
            for(var j=0;j<index;j++){
                if(j == index - 1){
                    statusPoints[j].classList.add("last-active")
                }
                statusPoints[j].classList.add("active")
            }
        }

        const removeActives = () => {
            for(var j=0;j<6;j++){
                statusPoints[j].classList.contains("last-active") ? statusPoints[j].classList.remove("last-active") : null
                statusPoints[j].classList.remove("active")
            }
        }
        // Removes all active classes
        removeActives()
        
        if(t6InView){
            addActives(6)
        }else if(t5InView){
            addActives(5)
        }else if(t4InView){
            addActives(4)
        }else if(t3InView){
            addActives(3)
        }else if(t2InView){
            addActives(2)
        }else if(t1InView){
            addActives(1)
        }
    },[t1InView, t2InView, t3InView, t4InView, t5InView, t6InView])

    return (<>
        <div className="documentation">
            <div className="row">
                <div className="col-3">
                    <div className="status-tracker">
                        <div className="status" ref={st1Ref}>
                            <div className="status-target first" id="t-0"><span></span></div>
                            <h6 className="mb-0"><a href="#getting-started">Getting started</a></h6>
                        </div>
                        <div className="status" ref={st2Ref}>
                            <div className="status-target" id="t-1"><span></span></div>
                            <h6 className="mb-0"><a href="#pricing">Pricing</a></h6>
                        </div>
                        <div className="status" ref={st3Ref}>
                            <div className="status-target" id="t-2"><span></span></div>
                            <h6 className="mb-0"><a href="#selection-of-document">Selection of document</a></h6>
                        </div>
                        <div className="status" ref={st4Ref}>
                            <div className="status-target" id="t-3"><span></span></div>
                            <h6 className="mb-0"><a href="#paper-settings">Paper settings</a></h6>
                        </div>
                        <div className="status" ref={st5Ref}>
                            <div className="status-target" id="t-4"><span></span></div>
                            <h6 className="mb-0"><a href="#question-selection">Question selection</a></h6>
                        </div>
                        <div className="status" ref={st6Ref}>
                            <div className="status-target last" id="t-5"><span></span></div>
                            <h6 className="mb-0"><a href="#printing-the-document">Printing the document</a></h6>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <section>
                        {/* Getting Started Section */}
                        <h2 ref={t1Ref} id="getting-started" className="my-5">Getting Started</h2>
                        <article>
                            <p>In order to use our services, you need to be <Link to={"/login"}>logged in</Link> then you can click on the [Get Started] button.</p>
                            <center>
                                <img src="/images/getting-started.png" alt="Getting Started" className="w-75 my-3" loading="lazy" />
                            </center>
                            <p>After you are navigated to the user Dashboard, you can create a new Test or Edit and use previously created Tests.</p>
                            <br />
                            <p>If your desired book is not available on this site, you can suggest us the book name, author and publisher name <Link to={"/?id=suggest-book"}>here</Link></p>. The Admin will process your request within a week or so
                            <div className="alert w-75 my-3">
                                <strong><FontAwesomeIcon icon={faInfoCircle} /> Note</strong>
                                <p className="mb-0 mt-2">Subscribtion system is still in development. As soon as it becomes available, Users will then have to subscribe for our services and their previous Saved Tests will be removed (those created within the free trial period)</p>
                            </div>
                            <p>The upcoming subscription system will rely on EasyPaisa and JazzCash making it easier for the user's to make payments.</p>
                        </article>
                        {/* Pricing Section */}
                        <h2 ref={t2Ref} id="pricing" className="my-5">Pricing</h2>
                        <div style={{marginBottom: "100vh"}}></div>
                        <h2 ref={t3Ref} id="selection-of-document">Selection of document</h2>
                        <div style={{marginBottom: "100vh"}}></div>
                        <h2 ref={t4Ref} id="paper-settings">Paper Settings</h2>
                        <div style={{marginBottom: "100vh"}}></div>
                        <h2 ref={t5Ref} id="question-selection">Question Selection</h2>
                        <div style={{marginBottom: "100vh"}}></div>
                        <h2 ref={t6Ref} id="printing-the-document">Printing the document</h2>
                        <div style={{marginTop: "100vh"}}></div>
                    </section>
                </div>
            </div>
        </div>
    </>)
}

export default Documentation