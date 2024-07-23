import React, { useState } from 'react'
import { useEffect, useRef, useContext } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faAngleDown,
    faArrowRight,
    faCamera,
    faDownload,
    faFileInvoice,
    faGear,
    faHeading,
    faInfoCircle,
    faSchool,
    faLock,
    faX
  } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import './TestMaker.css';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Transition from './Transition';

function TestMaker() {
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const [questionSelectionType,setQuestionSelectionType] = useState("manual");
    const [currentBook, setCurrentBook] = useState({});
    const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
    const [subscriptionStatus, setSubscriptionStatus] = useState(true);

    // Toggle Sidebar
    const [sidebarActive, setSidebarActive] = useState(false)

    // Final Questions to print
    const [questions, setQuestions] = useState({});
    const [paperSettings, setPaperSettings] = useState({})

    // Questions from Backend
    const [docs, setDocs] = useState([])
    const [chapters, setChapters] = useState([])
    const [chapterQuestions, setChapterQuestions] = useState([])

    // Toggle Handling
    const [smallScreen, setSmallScreen] = useState(false)

    const chaptersRef = useRef(null)
    const sidebarRef = useRef(null)
    const sidebarBtnRef = useRef(null)

    useEffect(()=>{
        const fetchBooks = () => {
            fetch(import.meta.env.VITE_SERVER_URL+"/books", {
                headers: {
                    Authorization: `Authorization ${user.token}`
                }
            })
            .then((res)=>{
                if(res.status === 200){
                    return res.json()
                }else if(res.status === 401 || res.status === 403){
                    logout();
                    navigate("/login")
                }
            })
            .then(data => {
                if(!data.msg){
                    setDocs(data);
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchBooks()
    }, [])

    useEffect(()=>{
        const fetchChapters = () => {
            if(currentBook.bookName && currentBook.author){
                setChapters([])
                fetch(import.meta.env.VITE_SERVER_URL+`/chapters?bookName=${currentBook.bookName}&author=${currentBook.author}`, {
                    headers: {
                        Authorization: `Authorization ${user.token}`
                    }
                })
                .then((res)=>{
                    if(res.status === 200){
                        return res.json()
                    }else if(res.status === 401 || res.status === 403){
                        logout();
                        navigate("/login")
                    }
                })
                .then(data => {
                    if(!data.msg){
                        setChapters(data);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                setCurrentChapterIndex(-1)
                setChapterQuestions([])
                chaptersRef.current.selectedIndex = 0;
            }
        }
        fetchChapters()
    },[currentBook])

    useEffect(()=>{
        const fetchQuestions = () => {
            if(currentChapterIndex >= 0){
                fetch(import.meta.env.VITE_SERVER_URL+`/chapter?bookName=${currentBook.bookName}&author=${currentBook.author}&chapterIndex=${currentChapterIndex}`, {
                    headers: {
                        Authorization: `Authorization ${user.token}`
                    }
                })
                .then((res)=>{
                    if(res.status === 200){
                        return res.json()
                    }else if(res.status === 401 || res.status === 403){
                        logout();
                        navigate("/login")
                    }
                })
                .then(data => {
                    if(!data.msg){
                        setChapterQuestions(data);
                    }else{
                        alert(data.msg)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
        fetchQuestions()
    },[currentChapterIndex])

    // Toggle Handling
    useEffect(()=>{
        const resize = () => {
            if(window.innerWidth < 860){
                setSmallScreen(true)
            }else{
                setSmallScreen(false)
            }
        }
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    },[])

    const paperRef = useRef();
    const logoRef = useRef();

    // Paper Settings ref
    const instituteLogoRef = useRef()
    const instituteNameRef = useRef()
    const paperHeadingRef = useRef()
    const totalMarksRef = useRef()

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

    const handleBookChange = (e) => {
        setCurrentBook(JSON.parse(e.target.value))
    }

    const handleChapterChange = (e) => {
        setCurrentChapterIndex(e.target.value)
    }

    const getPaperSettings = () => {
        const settings = {
            "logo": logoRef.current.src,
            "name": instituteNameRef.current.value,
            "totalMarks": totalMarksRef.current.value || "0",
            "paperHeading": paperHeadingRef.current.value
        }
        
        setPaperSettings(settings);
    }

    const questionsToPrint = async (questionList) => {
        await setQuestions(questionList)
        await getPaperSettings()
        await handlePrint()
    }

    // Handle Sidebar Toggle
    const handleSidebarToggle = () => {
        sidebarActive ? 
        sidebarBtnRef.current.classList.remove("active") : 
        sidebarBtnRef.current.classList.add("active")

        sidebarActive ? 
        sidebarRef.current.classList.remove("active") : 
        sidebarRef.current.classList.add("active")

        setSidebarActive(prev => !prev)
    }

    return (
        <>
        <div className="test-maker-container">
            <div className="row w-100">
                <div className="col-lg-8 col-12 pl-4 paper-config d-flex flex-column">
                    <ComponentToPrint ref={paperRef} questionList={questions} paperSettings={paperSettings} />
                    <h3 className='my-4 heading'>Question Selection Type</h3>

                    <div className="row">
                        <div className="col-sm-6 col-12 my-sm-0 my-2"><button className={questionSelectionType === "manual" ? "active-selection" : ""} onClick={()=>setQuestionSelectionType("manual")}>Manual</button></div>
                        <div className="col-sm-6 col-12 my-sm-0 my-2"><button className={questionSelectionType === "random" ? "active-selection" : ""} disabled={subscriptionStatus ? false : true} onClick={()=>setQuestionSelectionType("random")}>{!subscriptionStatus ? <FontAwesomeIcon icon={faLock} /> : null} Random</button></div>
                    </div>
                    <br />
                    <h3 className="my-3 heading">Document Selection</h3>

                    <div className="row my-3">
                        <div className="col-sm-6 col-12 my-sm-0 my-2 position-relative">
                            <select name="book" onChange={handleBookChange} required>
                                <option value="none">-- Select Book</option>
                                {
                                    docs.map((doc, index) => {
                                        return <option key={index * 15} value={JSON.stringify(doc)}>{doc.bookName}</option>
                                    })
                                }
                            </select>
                            <span className='caret'><FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                        <div className="col-sm-6 col-12 my-sm-0 my-2 position-relative">
                            <select ref={chaptersRef} name="chapter" id="chapter" onChange={handleChapterChange} required>
                                <option value="none">-- Select Chapter</option>
                                {
                                    chapters.map((chapter, index) => {
                                        if(!subscriptionStatus && index == 0){
                                            return <option key={index * 7} value={index}>{chapter}</option>
                                        }
                                        return <option key={index * 7} value={subscriptionStatus ? index : null} disabled={!subscriptionStatus ? true : false}>{chapter}</option>
                                    })
                                }
                            </select>
                            <span className='caret'><FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                    </div>
                    {
                        questionSelectionType === "manual" &&
                        (Object.keys(currentBook).length !== 0 && currentBook.constructor === Object) && 
                        (Object.keys(chapterQuestions).length !== 0 && chapterQuestions.constructor === Object) ? <ManualQuestionSelection questionsToPrint={questionsToPrint} bookName={currentBook.bookName} chapterName={chapterQuestions.name} questions={chapterQuestions.questions} /> : null

                    }
                    {
                        questionSelectionType === "random" &&
                        (Object.keys(currentBook).length !== 0 && currentBook.constructor === Object) && 
                        (Object.keys(chapterQuestions).length !== 0 && chapterQuestions.constructor === Object) ? <RandomQuestionSelection questionsToPrint={questionsToPrint} bookName={currentBook.bookName} chapterName={chapterQuestions.name} questions={chapterQuestions.questions} /> : null
                    }
                </div>
                {!smallScreen && <div className="col-lg-4 d-lg-block d-none">
                    <div className="paper-edit-panel">
                        <h5 className='text-left mb-5'><FontAwesomeIcon icon={faGear} className='mr-2' /> Paper Settings</h5>
                        <div className="w-100 bg-secondary rounded">
                            <img src="/images/dummy_school_logo.png" alt="" ref={logoRef} />
                        </div>
                        <div className="section my-4">
                            <FontAwesomeIcon icon={faCamera} />
                            <input type="file" className='paper-heading-input' accept='.png, .jpeg, .jpg' ref={instituteLogoRef} onChange={handleFileUpload} />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faSchool} />
                            <input type="text" placeholder='Institute Name' className='paper-heading-input' ref={instituteNameRef} />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faHeading} />
                            <input type="text" placeholder='Paper Heading' className='paper-heading-input' ref={paperHeadingRef} />
                        </div>

                        <div className="section my-4">
                            <FontAwesomeIcon icon={faFileInvoice} />
                            <input type="number" placeholder='Total Marks' className='total-marks-input' ref={totalMarksRef} />
                        </div>
                    </div>
                </div>}
            </div>
            {smallScreen && <div className="side-bar d-lg-none d-block" ref={sidebarRef}>
                <button className="toggle" ref={sidebarBtnRef} onClick={handleSidebarToggle}>{sidebarActive ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faGear} />}</button>
                <div className="paper-edit-panel">
                    <h5 className='text-left mb-5'><FontAwesomeIcon icon={faGear} className='mr-2' /> Paper Settings</h5>
                    <div className="w-100 bg-secondary rounded">
                        <img src="/images/dummy_school_logo.png" alt="" ref={logoRef} />
                    </div>
                    <div className="section my-4">
                        <FontAwesomeIcon icon={faCamera} />
                        <input type="file" className='paper-heading-input' accept='.png, .jpeg, .jpg' ref={instituteLogoRef} onChange={handleFileUpload} />
                    </div>

                    <div className="section my-4">
                        <FontAwesomeIcon icon={faSchool} />
                        <input type="text" placeholder='Institute Name' className='paper-heading-input' ref={instituteNameRef} />
                    </div>

                    <div className="section my-4">
                        <FontAwesomeIcon icon={faHeading} />
                        <input type="text" placeholder='Paper Heading' className='paper-heading-input' ref={paperHeadingRef} />
                    </div>

                    <div className="section my-4">
                        <FontAwesomeIcon icon={faFileInvoice} />
                        <input type="number" placeholder='Total Marks' className='total-marks-input' ref={totalMarksRef} />
                    </div>
                </div>
            </div>}
        </div>
        </>
    )
}

// Manual Question Selection
const ManualQuestionSelection = ({ questionsToPrint, bookName, chapterName, questions }) => {
    
    const [mcqsIndexes, setMcqsIndexes] = useState([])
    const [shortIndexes, setShortIndexes] = useState([])
    const [longIndexes, setLongIndexes] = useState([])

    const [mcqsCount, setMcqsCount] = useState(0)
    const [shortCount, setShortCount] = useState(0)
    const [longCount, setLongCount] = useState(0)

    useEffect(()=>{
        setMcqsIndexes([])
        setShortIndexes([])
        setLongIndexes([])
        setMcqsCount(0)
        setShortCount(0)
        setLongCount(0)
    },[questions])

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

// Random Question Selection
const RandomQuestionSelection = ({ questionsToPrint, bookName, chapterName, questions }) => {
    const [mcqsIndexes, setMcqsIndexes] = useState([])
    const [shortIndexes, setShortIndexes] = useState([])
    const [longIndexes, setLongIndexes] = useState([])

    const [mcqsCount, setMcqsCount] = useState(0)
    const [shortCount, setShortCount] = useState(0)
    const [longCount, setLongCount] = useState(0)

    function getRandomValues(inputArray, numValues) {
        if (!Array.isArray(inputArray)) {
            throw new Error("The first argument must be an array.");
        }
    
        if (typeof numValues !== 'number' || numValues < 0) {
            throw new Error("The second argument must be a non-negative number.");
        }
    
        // Ensure numValues does not exceed the length of the input array
        const maxValues = Math.min(numValues, inputArray.length);
    
        // Create a copy of the input array to avoid modifying the original array
        const arrayCopy = [...inputArray];
    
        // Shuffle the array copy using Fisher-Yates algorithm
        for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }
    
        // Return the first 'maxValues' elements from the shuffled array
        return arrayCopy.slice(0, maxValues);
    }

    const handleMCQSChange = e => {
        if(e.target.value > 0){
            setMcqsCount(Math.min(questions.mcqs.length, e.target.value))
        }
        if(e.target.value <= 0){
            setMcqsCount(0)
        }
    }

    const handleShortChange = e => {
        if(e.target.value > 0){
            setShortCount(Math.min(questions.short.length, e.target.value))
        }
        if(e.target.value <= 0){
            setShortCount(0)
        }
    }

    const handleLongChange = e => {
        if(e.target.value > 0){
            setLongCount(Math.min(questions.long.length, e.target.value))
        }
        if(e.target.value <= 0){
            setLongCount(0)
        }
    }

    const handlePrint = () => {
        const questionList = {
            "mcqs": [],
            "short": [],
            "long": []
        }

        // MCQS Entries
        questionList.mcqs = getRandomValues(questions.mcqs, mcqsCount)

        // Short Entries
        questionList.short = getRandomValues(questions.short, shortCount)

        // Long Entries
        questionList.long = getRandomValues(questions.long, longCount)

        questionsToPrint(questionList)
    }
    return (<>
        <div className="container random-question-selection">
            <h3 className='my-2'>{bookName}</h3>
            <p>{chapterName}</p>

            <h5 className="my-2 mt-5 heading">MCQs (Multiple Choice Questions)</h5>
            <div className="quantity d-flex align-items-baseline">
                <input type="number" placeholder={questions.mcqs.length} value={mcqsCount} onChange={handleMCQSChange} />
                <h5> / {questions.mcqs.length}</h5>
            </div>

            <h5 className="my-2 mt-5 heading">Short Questions</h5>
            <div className="quantity d-flex align-items-baseline">
                <input type="number" placeholder={questions.short.length} value={shortCount} onChange={handleShortChange} />
                <h5> / {questions.short.length}</h5>
            </div>

            <h5 className="my-2 mt-5 heading">Long Questions</h5>
            <div className="quantity d-flex align-items-baseline">
                <input type="number" placeholder={questions.long.length} value={longCount} onChange={handleLongChange} />
                <h5> / {questions.long.length}</h5>
            </div>

            <button onClick={handlePrint} className='download-paper my-4'>Download <span><FontAwesomeIcon icon={faDownload}/></span></button>
        </div>
    </>);
}


// Component to Print
const ComponentToPrint = React.forwardRef((props, ref) => {
    const settings = props?.paperSettings
    return <>
      <div ref={ref} className='text-dark paper'>
        <div className="paper-content">
            <div className="d-flex align-items-center">
                <h5>Roll no </h5>
                <div style={{width: "100px",borderBottom: "2px solid black",marginLeft:"10px"}}></div>
            </div>
            <div className="d-flex align-items-center">
                <h5>Candidate's Signature </h5>
                <div style={{width: "100px",borderBottom: "2px solid black",marginLeft:"10px"}}></div>
            </div>
            { settings.totalMarks > 0 ? <h5>Total Marks : {settings.totalMarks}</h5> : null}
            
            <center><img style={{height: "100px"}} src={settings?.logo} alt="" /></center>
            <center><h3>{settings.name}</h3></center>
            <center><u><h4>{settings.paperHeading}</h4></u></center>
            <br />
        <div className="section no-break">
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
        </div>
        <div className="section">
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
        </div>
        <div className="section">
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
      </div>
    </>;
});

export default Transition(TestMaker);
