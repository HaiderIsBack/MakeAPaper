import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faAngleDown,
    faAngleUp,
    faDownload
  } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import './TestMaker.css'

function TestMaker() {
    const [questionSelectionType,setQuestionSelectionType] = useState("manual");
    const [currentBook, setCurrentBook] = useState("none");
    const [currentChapter, setCurrentChapter] = useState("none");
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
    const chapterRef = useRef();

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

    const handleChapterChange = () => {
        setCurrentChapter(chapterRef.current.value)
    }

    const getChapterObject = (book, chapterName) => {
        var questions;

        docs.forEach(doc => {
            if(doc.book === book){
                doc.chapters.forEach(chapter => {
                    if(chapter.name === chapterName){
                        questions = chapter.questions
                    }
                })
            }
        })

        return questions
    }

    return (
        <>
        <div className="test-maker-container">
            <div className="row w-100">
                <div className="col-md-8 col-12 paper-config d-flex flex-column">
                    {/* <ComponentToPrint ref={paperRef} /> */}
                    <h3 className='my-4 heading'>Question Selection Type</h3>

                    <div className="row">
                        <div className="col-sm-6 col-12 my-sm-0 my-2"><button className={questionSelectionType === "manual" ? "active-selection" : ""} onClick={()=>setQuestionSelectionType("manual")}>Manual</button></div>
                        <div className="col-sm-6 col-12 my-sm-0 my-2"><button className={questionSelectionType === "random" ? "active-selection" : ""} disabled={questionSelectionType === "random" ? false : true} onClick={()=>setQuestionSelectionType("random")}>Random</button></div>
                    </div>
                    <br />
                    <h3 className="my-3 heading">Document Selection</h3>

                    <div className="row my-3">
                        <div className="col-sm-6 col-12 my-sm-0 my-2 position-relative">
                            <select name="book" ref={bookRef} onChange={handleBookChange} required>
                                <option value="none">-- Select Book</option>
                                {
                                    docs.map(doc => {
                                        return <option key={doc.book} value={doc.book}>{doc.book}</option>
                                    })
                                }
                            </select>
                            <span className='caret'><FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                        <div className="col-sm-6 col-12 my-sm-0 my-2 position-relative">
                            <select name="chapter" id="chapter" ref={chapterRef} onChange={handleChapterChange} required>
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
                            <span className='caret'><FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                    </div>
                    {
                        questionSelectionType === "manual" &&
                        currentBook !== "none" && 
                        currentChapter !== "none" ? <QuestionSelection bookName={currentBook} chapterName={currentChapter} questions={getChapterObject(currentBook, currentChapter)} /> : null

                    }
                </div>
                <div className="col-md-4 d-md-block d-none">
                    <div className="paper-edit-panel">
                        <button onClick={handlePrint} className='download-paper'>Download <span><FontAwesomeIcon icon={faDownload}/></span></button>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const QuestionSelection = ({ bookName, chapterName, questions }) => {
    
    return (<>
        <div className="container manual-question-selection">
            <h3 className='my-2'>{bookName}</h3>
            <p>{chapterName}</p>
            {
                questions.map((question,index)=>{
                    return <>
                        <div className="question-selection">
                        <label class="custom-checkbox">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                            <h5 key={index}>{question}</h5>
                        </div>
                    </>
                })
            }
        </div>
    </>);
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
