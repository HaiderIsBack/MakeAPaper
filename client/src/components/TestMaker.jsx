import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faDownload
  } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import './TestMaker.css'

function TestMaker() {
    const [questionSelectionType,setQuestionSelectionType] = useState("manual");
    const [currentBook, setCurrentBook] = useState("");
    const [subscriptionStatus, setSubscriptionStatus] = useState(false);

    const docs = [
        {
            "book" : "Network Administration CIT-324",
            "chapters": [
                {
                    "name": "introduction",
                    "questions": [
                        "What is Network?",
                        "Define IPv4."
                    ]
                },
                {
                    "name": "microsoft windows client-end",
                    "questions": [
                        "What is Network?",
                        "Define IPv4."
                    ] 
                }
            ]
        },
        {
            "book" : "Web Develpment with JAVA",
            "chapters": [
                {
                    "name": "introduction",
                    "questions": [
                        "What is Network?",
                        "Define IPv4."
                    ]
                },
                {
                    "name": "HTTP Basics",
                    "questions": [
                        "What is Network?",
                        "Define IPv4."
                    ] 
                }
            ]
        }
    ]

    const paperRef = useRef();
    const bookRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => paperRef.current,
        onBeforePrint: () => {
            paperRef.current.style.width = "100%";
            paperRef.current.style.height = "100vh";
        }
    });

    const handleBookChange = () => {
        setCurrentBook(bookRef.current.value)
    }

    return (
        <>
        <div className="test-maker-container">
            <div className="row w-100">
                <div className="col-8 paper-config d-flex flex-column">
                    {/* <ComponentToPrint ref={paperRef} /> */}
                    <h3 className='my-4 heading'>Question Selection Type</h3>

                    <div className="row">
                        <div className="col-6"><button className={questionSelectionType === "manual" ? "active-selection" : ""} onClick={()=>setQuestionSelectionType("manual")}>Manual</button></div>
                        <div className="col-6"><button className={questionSelectionType === "random" ? "active-selection" : ""} disabled={questionSelectionType === "random" ? false : true} onClick={()=>setQuestionSelectionType("random")}>Random</button></div>
                    </div>
                    <br />
                    <h3 className="my-3 heading">Document Selection</h3>

                    <div className="row my-3">
                        <div className="col-6">
                            <select name="book" ref={bookRef} onChange={handleBookChange} required>
                                <option value="none">-- Select Book</option>
                                {
                                    docs.map(doc => {
                                        return <option key={doc.book} value={doc.book}>{doc.book}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <select name="chapter" id="chapter" required>
                                <option value="none">-- Select Chapter</option>
                                {
                                    docs.map(doc => {
                                        if(currentBook === doc.book){
                                            return doc.chapters.map((chapter,index) => {
                                                if(!subscriptionStatus && index == 0){
                                                    return <option key={chapter.name} value={chapter.name}>{chapter.name}</option>
                                                }
                                                return <option key={chapter.name} value={chapter.name} disabled={!subscriptionStatus ? true : false}>{chapter.name}</option>
                                            })
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>

                </div>
                <div className="col-4">
                    <div className="paper-edit-panel">
                        <button onClick={handlePrint} className='download-paper'>Download <span><FontAwesomeIcon icon={faDownload}/></span></button>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const ComponentToPrint = React.forwardRef((props, ref) => {
    return <>
      <div ref={ref} className='text-dark paper'>
        <div className="paper-content">
            <img style={{width: "50px", height: "50px"}} src="/images/MakePaper.png" alt="" />
            <h4 className='my-2'>Answer the following Short Questions (Any 10)</h4>
            <ol>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
            </ol>
            <h4 className='my-2'>Answer the following Long Questions (Any 10)</h4>
            <ol>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
            </ol>
        </div>
        <br />
        <div className="paper-content">
            <h4 className='my-2'>Answer the following Short Questions (Any 10)</h4>
            <ol>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
            </ol>
            <h4 className='my-2'>Answer the following Long Questions (Any 10)</h4>
            <ol>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
                <li><h6>What is Time?</h6></li>
            </ol>
        </div>
      </div>
    </>;
});

export default TestMaker;
