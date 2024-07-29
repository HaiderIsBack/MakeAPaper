import "./Documentation.css"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faInfoCircle
  } from '@fortawesome/free-solid-svg-icons';
import Zoop from "../components/Zoop";
import Transition from "../components/Transition";
import useLenis from "../components/useLenis"

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

    const [lastTrackedItem, setLastTrackedItem] = useState(1)

    useEffect(()=>{
        if(t6InView){ setLastTrackedItem(6)}
        else if(t5InView){ setLastTrackedItem(5) }
        else if(t4InView){ setLastTrackedItem(4) }
        else if(t3InView){ setLastTrackedItem(3) }
        else if(t2InView){ setLastTrackedItem(2) }
        else if(t1InView){ setLastTrackedItem(1) }
    },[t1InView, t2InView, t3InView, t4InView, t5InView, t6InView])

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
    
        // Removes all active classes
        const removeActives = () => {
            for(var j=0;j<statusPoints.length;j++){
                statusPoints[j].classList.contains("last-active") ? statusPoints[j].classList.remove("last-active") : null
                statusPoints[j].classList.remove("active")
            }
        }

        removeActives()
        addActives(lastTrackedItem)
    },[lastTrackedItem])

    return (<>
        <div className="documentation">
            <div className="row">
                <div className="col-lg-3 d-lg-block d-none">
                    <div className="status-tracker" style={{position: "sticky",top:"0"}}>
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
                <div className="col-lg-9 col-12">
                    <section>
                        {/* Getting Started Section */}
                        <h2 ref={t1Ref} id="getting-started" className="my-5 highlighted-heading"><Zoop>Getting Started</Zoop></h2>
                        <article>
                            <p>In order to use our services, you need to be <Link to={"/login"}>logged in</Link> then you can click on the [Get Started] button.</p>
                            <center>
                                <img src="/images/getting-started.png" alt="Getting Started" className="w-75 my-3 rounded" loading="lazy" />
                            </center>
                            <p>After you are navigated to the user Dashboard, you can create a new Test or Edit and use previously created Tests.</p>
                            <br />
                            <p>If your desired book is not available on this site, you can suggest us the book name, author and publisher name <Link to={"/?id=suggest-book"}>here</Link>.</p> 
                            <br />
                            <p>The Admin will process your request within a week or so.</p>
                            <div className="alert w-75 my-3">
                                <strong><FontAwesomeIcon icon={faInfoCircle} /> Note</strong>
                                <p className="mb-0 mt-2">Subscribtion system is still in development. As soon as it becomes available, Users will then have to subscribe for our services and their previous Saved Tests will be removed (those created within the free trial period)</p>
                            </div>
                            <p>The upcoming subscription system will rely on EasyPaisa and JazzCash making it easier for the user's to make payments.</p>
                        </article>
                        {/* Pricing Section */}
                        <h2 ref={t2Ref} id="pricing" className="my-5 highlighted-heading"><Zoop>Pricing</Zoop></h2>
                        <p className="d-inline p-2 px-3 rounded" style={{background: "var(--accent-gradient)"}}>Basic Plan</p>
                        <p className="my-3">Price: PKR 500/month</p>
                        <h6 className="my-4">Features:</h6>
                        <ul className="pl-3">
                            <li>Create up to 5 tests per month</li>
                            <li>100 test takers per month</li>
                            <li>Basic test templates</li>
                            <li>Standard reporting and analytics</li>
                            <li>Email support</li>
                        </ul>
                        <p className="my-4 mb-5">The Basic Plan is perfect for individuals or small educational setups looking to create and manage a limited number of tests with essential features.</p>

                        <p className="d-inline p-2 px-3 rounded" style={{background: "var(--accent-gradient)"}}>Economic Plan</p>
                        <p className="my-3">Price: PKR 1500/month</p>
                        <h6 className="my-4">Features:</h6>
                        <ul className="pl-3">
                            <li>Create up to 20 tests per month</li>
                            <li>500 test takers per month</li>
                            <li>Advanced test templates</li>
                            <li>Detailed reporting and analytics</li>
                            <li>Priority email support</li>
                            <li>Custom branding for tests</li>
                        </ul>
                        <p className="my-4 mb-5">The Economic Plan is ideal for medium-sized educational institutions or organizations that require more comprehensive testing capabilities and enhanced support.</p>

                        <p className="d-inline p-2 px-3 rounded" style={{background: "var(--accent-gradient)"}}>Business Plan</p>
                        <p className="my-3">Price: PKR 3000/month</p>
                        <h6 className="my-4">Features:</h6>
                        <ul className="pl-3">
                            <li>Unlimited test creation</li>
                            <li>Unlimited test takers</li>
                            <li>Custom test templates</li>
                            <li>Advanced reporting and analytics with in-depth insights</li>
                            <li>Priority email and phone support</li>
                            <li>Custom branding and white-labeling options</li>
                        </ul>
                        <p className="my-4 mb-5">The Business Plan is designed for large institutions, corporations, and professional educators who need extensive features, customization, and top-tier support.</p>

                        <center className="mt-5 mb-4">
                            <h3>Pricings Comparison</h3>
                        </center>

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Basic Plan (PKR 500)</th>
                                        <th>Economic Plan (PKR 1,500)</th>
                                        <th>Business Plan (PKR 3,000)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Test Creation Limit</td>
                                        <td>5/month</td>
                                        <td>20/month</td>
                                        <td>Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td>Test Takers Limit</td>
                                        <td>100/month</td>
                                        <td>500/month</td>
                                        <td>Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td>Test Templates</td>
                                        <td>Basic</td>
                                        <td>Advanced</td>
                                        <td>Custom</td>
                                    </tr>
                                    <tr>
                                        <td>Reporting & Analytics</td>
                                        <td>Standard</td>
                                        <td>Detailed</td>
                                        <td>Advanced</td>
                                    </tr>
                                    <tr>
                                        <td>Support	Email</td>
                                        <td>Email</td>
                                        <td>Priority Email</td>
                                        <td>Priority Email & Phone</td>
                                    </tr>
                                    <tr>
                                        <td>Custom Branding</td>
                                        <td>No</td>
                                        <td>Yes</td>
                                        <td>Yes, with White-labeling</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 ref={t3Ref} id="selection-of-document" className="my-5 highlighted-heading"><Zoop>Selection of document</Zoop></h2>
                        <center>
                            <img src="/images/document-selection.png" alt="Document Selection" className="w-75 my-3 rounded" loading="lazy" />
                        </center>
                        <p className="my-3">You can select a Book as shown below. Once you select a book the Chapter wil be available corresponding to the book.</p>
                        <center>
                            <img src="/images/document-selection-book.png" alt="Document Selection Book" className="w-75 my-3 rounded" loading="lazy" />
                        </center>
                        <p className="my-3">After selecting the book you can now choose the chapter you want to print. </p>
                        <center>
                            <img src="/images/document-selection-chapter.png" alt="Document Selection Chapter" className="w-75 my-3 rounded" loading="lazy" />
                        </center>
                        <h5>Troubleshooting</h5>
                        <p className="my-4">If you encounter issues during the document selection process, try the following:</p>
                        <ul className="ml-3">
                            <li className="my-2">Refresh the Page: Sometimes refreshing the page can resolve minor glitches.</li>
                            <li className="my-2">Login Issue: If the problem still persists re-login and try again.</li>
                            <li className="my-2">Contact Support: If the problem persists, contact customer support for assistance.</li>
                        </ul>

                        <h2 ref={t4Ref} id="paper-settings" className="my-5 highlighted-heading"><Zoop>Paper Settings</Zoop></h2>
                        <p>Configure simple paper settings and adjust the test features.</p>
                        <center>
                            <img src="/images/paper-settings.png" alt="Paper Settings" className="h-50 w-25 my-3" loading="lazy" />
                        </center>
                        <p>Default settings are applied when the user doesn't changes any settings. </p>
        
                        <h2 ref={t5Ref} id="question-selection" className="my-5 highlighted-heading"><Zoop>Question Selection</Zoop></h2>
                        <p className="mb-3">One of the core features of this Test Builder site are the Question Selection Options: Manual and Random(Automatic).</p>
                        <center>
                            <img src="/images/question-selection.png" alt="Question Selection" className="w-75 my-3 mb-4 rounded" loading="lazy" />
                        </center>
                        <p className="d-inline p-2 px-3 rounded" style={{background: "var(--accent-gradient)"}}>Manual Question Selection</p>
                        <p className="mt-4">In manual question selection, you can select the questions by any order and those questions will be printed according to that specific order.</p>
                        <center>
                            <img src="/images/manual-question-selection.png" alt="Manual Question Selection" className="w-75 my-3 mb-4 rounded" loading="lazy" />
                        </center>
                        <p className="d-inline p-2 px-3 rounded" style={{background: "var(--accent-gradient)"}}>Random Question Selection</p>
                        <p className="mt-4">In random question selection, you can select the questions by simply inputting number of questions and the rest is handled by the system.</p>
                        <center>
                            <img src="/images/random-question-selection.png" alt="Random Question Selection" className="w-75 my-3 mb-4 rounded" loading="lazy" />
                        </center>

                        <h2 ref={t6Ref} id="printing-the-document" className="my-5 highlighted-heading"><Zoop>Printing the document</Zoop></h2>
                        <p>Printing the test is very simple just click on the [Download] button and then your document will be ready to get Saved or Printed.</p>
                        <center>
                            <img src="/images/printing-the-document.png" alt="Printing The Document" className="h-50 w-50 my-3 mb-4 rounded" loading="lazy" />
                        </center>
                    </section>
                </div>
            </div>
        </div>
    </>)
}

export default Transition(Documentation)