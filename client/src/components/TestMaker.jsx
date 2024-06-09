import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faAngleDown,
    faAngleUp,
    faArrowRight,
    faDownload,
    faStar
  } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import './TestMaker.css'

function TestMaker() {
    const [questionSelectionType,setQuestionSelectionType] = useState("manual");
    const [currentBook, setCurrentBook] = useState("none");
    const [currentChapter, setCurrentChapter] = useState("none");
    const [subscriptionStatus, setSubscriptionStatus] = useState(false);

    // Final Questions to print
    const [questions, setQuestions] = useState({});

    const docs = [
        {
            "book" : "Network Administration CIT-324",
            "chapters": [
                {
                    "name": "introduction",
                    "questions": {
                        "mcqs" : [
                            "What is a router",
                            "What is a switch",
                            "What is a Network Interface Card (NIC)"
                        ],
                        "short" : [
                            "What is Network?",
                            "Define IPv4.",
                            "What is peer-to-peer network?",
                            "Define Task Scheduling."
                        ],
                        "long" : [
                            "Explain the basic network components and also describe each component?",
                            "Write a client end basic settings?",
                            "Write a short note on Hub, Switch and Router?"
                        ]
                    }
                },
                {
                    "name": "microsoft windows client-end",
                    "questions": {
                        "mcqs" : [],
                        "short" : [
                            "What is Network?",
                            "Define IPv4."
                        ],
                        "long" : []
                    }
                }
            ]
        },
        {
            "book" : "Web Develpment with JAVA",
            "chapters": [
                {
                    "name": "introduction",
                    "questions": {
                        "mcqs" : [],
                        "short" : [
                            "What is Web Application?",
                            "Define HTTP."
                        ],
                        "long" : []
                    }
                },
                {
                    "name": "HTTP Basics",
                    "questions": {
                        "mcqs" : [],
                        "short" : [
                            "What is HTTP GET method?",
                            "Define HTTP POST method."
                        ],
                        "long" : []
                    }
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
        var questions = {
            "mcqs": [],
            "short": [],
            "long": []
        };

        docs.forEach(doc => {
            if(doc.book === book){
                doc.chapters.forEach(chapter => {
                    if(chapter.name === chapterName){
                        questions.mcqs = chapter.questions.mcqs
                        questions.short = chapter.questions.short
                        questions.long = chapter.questions.long
                    }
                })
            }
        });

        return questions
    }

    const questionsToPrint = async (questionList) => {
        await setQuestions(questionList)
        await handlePrint()
    }

    return (
        <>
        <div className="test-maker-container">
            <div className="row w-100">
                <div className="col-md-8 col-12 paper-config d-flex flex-column">
                    <ComponentToPrint ref={paperRef} questionList={questions} />
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
                        currentChapter !== "none" ? <QuestionSelection questionsToPrint={questionsToPrint} bookName={currentBook} chapterName={currentChapter} questions={getChapterObject(currentBook, currentChapter)} /> : null

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

const QuestionSelection = ({ questionsToPrint, bookName, chapterName, questions }) => {
    const [mcqsIndexes, setMcqsIndexes] = useState([])
    const [shortIndexes, setShortIndexes] = useState([])
    const [longIndexes, setLongIndexes] = useState([])

    const handleMCQSChange = e => {
        if(e.target.checked){
            setMcqsIndexes(prev => [...prev, e.target.value])
        }else{
            const index = mcqsIndexes.indexOf(e.target.value)
            if(index > -1){
                setMcqsIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
            }
        }
    }
 
    const handleShortChange = e => {
        if(e.target.checked){
            setShortIndexes(prev => [...prev, e.target.value])
        }else{
            const index = shortIndexes.indexOf(e.target.value)
            if(index > -1){
                setShortIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
            }
        }
    }

    const handleLongChange = e => {
        if(e.target.checked){
            setLongIndexes(prev => [...prev, e.target.value])
        }else{
            const index = longIndexes.indexOf(e.target.value)
            if(index > -1){
                setLongIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
            }
        }
    }

    const handlePrint = () => {
        const questionList = {
            "mcqs": [],
            "short": [],
            "long": []
        }

        // MCQS Entries
        mcqsIndexes.forEach(mcqsIndex => {
            questionList.mcqs = [...questionList.mcqs, questions.mcqs[mcqsIndex]]
        })

        // Short Entries
        shortIndexes.forEach(shortIndex => {
            questionList.short = [...questionList.short, questions.short[shortIndex]]
        })

        // Long Entries
        longIndexes.forEach(longIndex => {
            questionList.long = [...questionList.long, questions.long[longIndex]]
        })

        questionsToPrint(questionList)
    }
    
    return (<>
        <div className="container manual-question-selection">
            <h3 className='my-2'>{bookName}</h3>
            <p>{chapterName}</p>

            <h5 className="my-2 mt-5 heading">MCQs (Multiple Choice Questions)</h5>
            <p>Selected MCQs : {mcqsIndexes.length} / {questions.mcqs.length}</p>
            {
                questions.mcqs.map((question,index)=>{
                    return (
                        <div key={index} className="question-selection">
                            <label className="custom-checkbox">
                                <input type="checkbox" value={index} onChange={handleMCQSChange} />
                                <span className="checkmark"></span>
                            </label>
                            <h6>{question}</h6>
                        </div>
                    );
                })
            }

            <h5 className="my-2 mt-5 heading">Short Questions</h5>
            <p>Selected Short Questions : {shortIndexes.length} / {questions.short.length}</p>
            {
                questions.short.map((question,index)=>{
                    return (
                        <div key={index} className="question-selection">
                            <label className="custom-checkbox">
                                <input type="checkbox" value={index} onChange={handleShortChange} />
                                <span className="checkmark"></span>
                            </label>
                            <h6>{question}</h6>
                        </div>
                    );
                })
            }

            <h5 className="my-2 mt-5 heading">Long Questions</h5>
            <p>Selected Long Questions : {longIndexes.length} / {questions.long.length}</p>
            {
                questions.long.map((question,index)=>{
                    return (
                        <div key={index} className="question-selection">
                            <label className="custom-checkbox">
                                <input type="checkbox" value={index} onChange={handleLongChange} />
                                <span className="checkmark"></span>
                            </label>
                            <h6>{question}</h6>
                        </div>
                    );
                })
            }

            <button onClick={handlePrint} className='download-paper my-4'>Download <span><FontAwesomeIcon icon={faDownload}/></span></button>
        </div>
    </>);
}

const ComponentToPrint = React.forwardRef((props, ref) => {
    return <>
      <div ref={ref} className='text-dark paper'>
        <div className="paper-content">
            <img style={{width: "50px", height: "50px"}} src="/images/MakePaper.png" alt="" />
            <br />
            {
                props?.questionList?.mcqs?.length > 0 ? 
                <>
                    <h2 className='my-4'><span><FontAwesomeIcon icon={faArrowRight} className='mr-2' /></span>Encircle the Correct Option.</h2>
                    <ol className='pl-4'>
                        {
                            props?.questionList?.mcqs?.map((mcqs, index) => {
                                return (<li key={index}><h4>{mcqs}</h4></li>);
                            })
                        }
                    </ol>
                </>
                : null
            }
            <br />
            {
                props?.questionList?.short?.length > 0 ? 
                <>
                    <h2 className='my-4'><span><FontAwesomeIcon icon={faArrowRight} className='mr-2' /></span>Answer the following Short Questions</h2>
                    <ol className='pl-4'>
                        {
                            props?.questionList?.short?.map((short, index) => {
                                return (<li key={index}><h4>{short}</h4></li>);
                            })
                        }
                    </ol>
                </>
                : null
            }
            <br />
            {
                props?.questionList?.long?.length > 0 ? 
                <>
                    <h2 className='my-4'><span><FontAwesomeIcon icon={faArrowRight} className='mr-2' /></span>Answer the following Long Questions</h2>
                    <ol className='pl-4'>
                        {
                            props?.questionList?.long?.map((long, index) => {
                                return (<li key={index}><h4>{long}</h4></li>);
                            })
                        }
                    </ol>
                </>
                : null
            }
        </div>
      </div>
    </>;
});

export default TestMaker;
