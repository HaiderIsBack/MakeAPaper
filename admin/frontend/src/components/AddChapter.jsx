import "./AddChapter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios"

const AddChapter = () => {
    const { user } = useContext(UserContext);

    const [selectedBook, setSelectedBook] = useState({});
    const [chapterName, setChapterName] = useState("");
    const [mcqs, setMcqs] = useState([])
    const [short, setShort] = useState([])
    const [long, setLong] = useState([])
    const [ready, setReady] = useState(false);

    useEffect(()=>{
        if(mcqs.length > 0 && short.length > 0 && long.length > 0 && selectedBook && chapterName){
            setReady(true)
        }else{
            setReady(false)
        }
    },[mcqs,short,long,selectedBook])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            "bookName": selectedBook.bookName,
            "author": selectedBook.author,
            "publisher": selectedBook.publisher,
            "chapter": {
                "name": chapterName,
                "questions": {
                    "mcqs" : mcqs,
                    "short" : short,
                    "long" : long
                }
            }
        }
        const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/chapter",payload,{
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        })
        if(response.status === 200){
            alert("success")
        }
    }
    return (
        <>
            <div className="row w-100 add-chapter">
                <div className="col-md-6 col-12">
                    { Object.keys(selectedBook).length > 0 ? <div className="selected-book-details">
                        <h3>{selectedBook.bookName}</h3>
                        <p className="text-light mb-0"><b>Author <FontAwesomeIcon icon={faArrowRight} /></b> {selectedBook.author}</p>
                        <p className="text-light"><b>Publisher <FontAwesomeIcon icon={faArrowRight} /></b> {selectedBook.publisher}</p>
                    </div> : null}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <label htmlFor="chapterName">Chapter Name <sup>*</sup></label>
                            <input type="text" id="chapterName" onChange={e => setChapterName(e.target.value)} value={chapterName} placeholder="Enter Chapter Name" required autoComplete="false" />
                        </div>
                        {/* MCQS */}
                        <AddMCQS updateQuestions={setMcqs} />

                        {/* Short */}
                        <AddShort updateQuestions={setShort} />

                        {/* Long */}
                        <AddLong updateQuestions={setLong} />

                        <button type="submit" disabled={!ready}>Insert Chapter</button>
                    </form>
                </div>
                <div className="col-md-6 col-12">
                    <SearchBox bookIsSelected={setSelectedBook} />
                </div>
            </div>
        </>
    )
}

const AddMCQS = ({updateQuestions}) => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([])

    const questionRef = useRef(null)
    const opt1Ref = useRef(null)
    const opt2Ref = useRef(null)
    const opt3Ref = useRef(null)
    const opt4Ref = useRef(null)

    useEffect(()=>{
        if(questions.length > 0){
            updateQuestions(questions)
        }
    },[questions])

    const handleSubmit = () => {
        if(!questionRef.current.value || !opt1Ref.current.value || !opt2Ref.current.value || !opt3Ref.current.value || !opt4Ref.current.value){
            return
        }

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
        </section> : <button className="add-more" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

const AddShort = ({updateQuestions}) => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([])

    const questionRef = useRef(null)

    useEffect(()=>{
        if(questions.length > 0){
            updateQuestions(questions)
        }
    },[questions])

    const handleSubmit = () => {
        if(!questionRef.current.value){return}
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
                <label htmlFor="short">Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="short" placeholder="Enter Question" required autoSave="false" />
            </div>

            <button onClick={handleSubmit}>Submit Question</button>
        </section> : <button className="add-more" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

const AddLong = ({updateQuestions}) => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([])

    const questionRef = useRef(null)

    useEffect(()=>{
        if(questions.length > 0){
            updateQuestions(questions)
        }
    },[questions])

    const handleSubmit = () => {
        if(!questionRef.current.value){return}
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
                <label htmlFor="long">Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="long" placeholder="Enter Question" required autoSave="false" />
            </div>

            <button onClick={handleSubmit}>Submit Question</button>
        </section> : <button className="add-more" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> Add more</button>}
    </>)
}

const SearchBox = ({bookIsSelected}) => {
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([])

    const handleSearch = async (e) => {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+`/books?query=${e.target.value}`, {
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        });

        if(response.status === 200){
            if(response.data.msg){
                alert(response.data.msg)
            }else{
                if(!e.target.value){
                    setBooks([])
                }else{
                    setBooks(response.data.books)
                }
            }
        }
    }

    const handleBookSelection = (e) => {
        e.preventDefault();
        const currCard = e.target;
        const payload = {
            bookName: currCard.bookName.value,
            author: currCard.author.value,
            publisher: currCard.publisher.value
        }
        bookIsSelected(payload)
    }
    return (<>
        <div className="searchbox">
            <div className="input-group">
                <input type="text" placeholder="Search Book" onKeyUp={handleSearch} />
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="search-results">
                {
                    books.length > 0
                    ? books.map((book, index)=>{
                        return <form className="search-card" onClick={()=>document.getElementById(index.toString()).click()} onSubmit={handleBookSelection} key={book.bookName}>
                            <h6>{book.bookName}</h6>
                            <p><strong className="d-inline">Author: </strong>{book.author}</p>
                            <p><strong className="d-inline">Publisher: </strong>{book.publisher}</p>
                            <input type="text" name="bookName" defaultValue={book.bookName} hidden />
                            <input type="text" name="author" defaultValue={book.author} hidden />
                            <input type="text" name="publisher" defaultValue={book.publisher} hidden />
                            <button type="submit" id={index.toString()} hidden></button>
                        </form>
                    })
                    : <center><h6 style={{color: "var(--site-text-secondary)",padding: "1rem 0"}}>No results</h6></center>
                }
                
            </div>
        </div>
    </>)
}

export default AddChapter;