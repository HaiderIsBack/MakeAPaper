import "./AddChapter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react";

const AddChapter = () => {
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <>
            <div className="row w-100 add-chapter">
                <div className="col-md-6 col-12">
                    <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="chapterName">Chapter Name <sup>*</sup></label>
                        <input type="text" id="chapterName" placeholder="Enter Chapter Name" required autoComplete="false" />
                    </div>
                    {/* MCQS */}
                    <AddMCQS />

                    {/* Short */}
                    <AddShort />

                    {/* Long */}
                    <AddLong />

                    <button type="submit">Insert Chapter</button>
                    </form>
                </div>
                <div className="col-md-6 col-12">
                    <div className="searchbox">
                        <div className="input-group">
                            <input type="text" placeholder="Search Book" />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className="search-results">
                            <center><h6 style={{color: "var(--site-text-secondary)"}}>No results</h6></center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AddMCQS = () => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([{
        question: "What is Network?",
        options: [
            "data",
            "data",
            "data",
            "data"
        ]
    }])

    const questionRef = useRef(null)
    const opt1Ref = useRef(null)
    const opt2Ref = useRef(null)
    const opt3Ref = useRef(null)
    const opt4Ref = useRef(null)

    const addQuestion = () => {
        setIsAddingQuestion(true)
    }

    const handleSubmit = () => {
        const payload = {
            question: questionRef.current.value,
            options: [
                opt1Ref.current.value,
                opt2Ref.current.value,
                opt3Ref.current.value,
                opt4Ref.current.value
            ]
        }

        setQuestions(prev => [...prev, payload])
        setIsAddingQuestion(false)
    }
    return (<>
        <h5><FontAwesomeIcon icon={faArrowRight} style={{marginRight: "10px"}} /> MCQs</h5>
        {questions.length > 0 ? 
        <ol className="my-2">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question.question}</h6>
                    <ol type="a">
                        {question.options.map((option, i)=>{
                            return <li key={i}>{option}</li>
                        })}
                    </ol>
                </li>
            })}
        </ol>
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <label htmlFor="mcq">Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="mcq" placeholder="Enter Question" required autoSave="false" />
            </div>
            {/* Options for MCQS */}
            <div className="option-input-group input-group">
                <h6>a). </h6>
                <input type="text" ref={opt1Ref} placeholder="Option 1" />
            </div>
            <div className="option-input-group input-group">
                <h6>b). </h6>
                <input type="text" ref={opt2Ref} placeholder="Option 2" />
            </div>
            <div className="option-input-group input-group">
                <h6>c). </h6>
                <input type="text" ref={opt3Ref} placeholder="Option 3" />
            </div>
            <div className="option-input-group input-group">
                <h6>d). </h6>
                <input type="text" ref={opt4Ref} placeholder="Option 4" />
            </div>

            <button onClick={handleSubmit}>Submit Question</button>
        </section> : <button className="add-more" onClick={addQuestion}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

const AddShort = () => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([])

    const questionRef = useRef(null)

    const addQuestion = () => {
        setIsAddingQuestion(true)
    }

    const handleSubmit = () => {
        setQuestions(prev => [...prev, questionRef.current.value])
        setIsAddingQuestion(false)
    }
    return (<>
        <h5><FontAwesomeIcon icon={faArrowRight} style={{marginRight: "10px"}} /> Short Questions</h5>
        {questions.length > 0 ? 
        <ol className="my-2">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question}</h6>
                </li>
            })}
        </ol>
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <label htmlFor="mcq">Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="mcq" placeholder="Enter Question" required autoSave="false" />
            </div>

            <button onClick={handleSubmit}>Submit Question</button>
        </section> : <button className="add-more" onClick={addQuestion}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

const AddLong = () => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([])

    const questionRef = useRef(null)

    const addQuestion = () => {
        setIsAddingQuestion(true)
    }

    const handleSubmit = () => {
        setQuestions(prev => [...prev, questionRef.current.value])
        setIsAddingQuestion(false)
    }
    return (<>
        <h5><FontAwesomeIcon icon={faArrowRight} style={{marginRight: "10px"}} /> Long Questions</h5>
        {questions.length > 0 ? 
        <ol className="my-2">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question}</h6>
                </li>
            })}
        </ol>
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <label htmlFor="mcq">Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="mcq" placeholder="Enter Question" required autoSave="false" />
            </div>

            <button onClick={handleSubmit}>Submit Question</button>
        </section> : <button className="add-more" onClick={addQuestion}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

export default AddChapter;