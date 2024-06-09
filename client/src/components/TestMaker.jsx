import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faAngleDown,
    faAngleUp,
    faArrowRight,
    faCamera,
    faDownload,
    faFileInvoice,
    faGear,
    faHeading,
    faInfoCircle,
    faSchool,
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
                            {
                                "question": "What is Router?",
                                "options": [
                                    "a device",
                                    "a network",
                                    "an enterprise",
                                    "a server"
                                ]
                            },
                            {
                                "question": "What is Switch?",
                                "options": [
                                    "a device",
                                    "a network",
                                    "an enterprise",
                                    "a server"
                                ]
                            },
                            {
                                "question": "What is Bridge?",
                                "options": [
                                    "a device",
                                    "a network",
                                    "an enterprise",
                                    "a server"
                                ]
                            }
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

    const logoRef = useRef();

    const handleFileUpload = e => {
        const file = e.target.files[0];
        if(file){
            const fileURL = URL.createObjectURL(file);
            logoRef.current.src = fileURL;
        }
    }

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
                        <h5 className='text-left mb-5'><FontAwesomeIcon icon={faGear} className='mr-2' /> Paper Settings</h5>
                        <div className="w-100">
                            <img src="" alt="" ref={logoRef} />
                        </div>
                        <div className="section my-4">
                            <FontAwesomeIcon icon={faCamera} />
                            <input type="file" className='paper-heading-input' accept='.png, .jpeg, .jpg' onChange={handleFileUpload} />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faSchool} />
                            <input type="text" placeholder='Institute Name' className='paper-heading-input' />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faHeading} />
                            <input type="text" placeholder='Paper Heading' className='paper-heading-input' />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faFileInvoice} />
                            <input type="number" placeholder='Total Marks' className='total-marks-input' />
                        </div>
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

    const [mcqsCount, setMcqsCount] = useState(0)
    const [shortCount, setShortCount] = useState(0)
    const [longCount, setLongCount] = useState(0)

    const handleMCQSChange = e => {
        if(e.target.checked){
            setMcqsIndexes(prev => [...prev, e.target.value])
            setMcqsCount(prev => ++prev)
        }else{
            const index = mcqsIndexes.indexOf(e.target.value)
            if(index > -1){
                setMcqsIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
                setMcqsCount(prev => --prev)
            }
        }
    }
 
    const handleShortChange = e => {
        if(e.target.checked){
            setShortIndexes(prev => [...prev, e.target.value])
            setShortCount(prev => ++prev)
        }else{
            const index = shortIndexes.indexOf(e.target.value)
            if(index > -1){
                setShortIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
                setShortCount(prev => --prev)
            }
        }
    }

    const handleLongChange = e => {
        if(e.target.checked){
            setLongIndexes(prev => [...prev, e.target.value])
            setLongCount(prev => ++prev)
        }else{
            const index = longIndexes.indexOf(e.target.value)
            if(index > -1){
                setLongIndexes(prev => {
                    prev.splice(index, 1)
                    return prev;
                })
                setLongCount(prev => --prev)
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
            <div className="alert">
                <strong><FontAwesomeIcon icon={faInfoCircle} /> INFO</strong>
                <p>Questions are selected based on which question you select first.</p>
            </div>
            <h3 className='my-2'>{bookName}</h3>
            <p>{chapterName}</p>

            <h5 className="my-2 mt-5 heading">MCQs (Multiple Choice Questions)</h5>
            <p>Selected MCQs : {mcqsCount} / {questions.mcqs.length}</p>
            {
                questions.mcqs.map((mcqs,index)=>{
                    return (
                        <div key={index} className="question-selection">
                            <label className="custom-checkbox">
                                <input type="checkbox" value={index} onChange={handleMCQSChange} />
                                <span className="checkmark"></span>
                            </label>
                            <h6>{mcqs.question}</h6>
                        </div>
                    );
                })
            }

            <h5 className="my-2 mt-5 heading">Short Questions</h5>
            <p>Selected Short Questions : {shortCount} / {questions.short.length}</p>
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
            <p>Selected Long Questions : {longCount} / {questions.long.length}</p>
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
            {props?.questionList?.mcqs?.length > 0 ? <center><h3><u>OBJECTIVE TYPE</u></h3></center> : null}

            {
                props?.questionList?.mcqs?.length > 0 ? 
                <>
                    <h2 className='my-4'><span><FontAwesomeIcon icon={faArrowRight} className='mr-2' /></span>Encircle the Correct Option.</h2>
                    <ol className='pl-4'>
                        {
                            props?.questionList?.mcqs?.map((mcqs, index) => {
                                return (<li key={index}>
                                        <h4>{mcqs.question}</h4>
                                        <ol className='custom-alphabet'>
                                            {mcqs.options.map((option,ind)=>{
                                                return (<li key={ind}>{option}</li>)
                                            })}
                                        </ol>
                                    </li>);
                            })
                        }
                    </ol>
                </>
                : null
            }
            <br />
            {props?.questionList?.short?.length > 0 || props?.questionList?.long?.length > 0 ? <center><h3><u>SUBJECTIVE TYPE</u></h3></center> : null}

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
