import "./BooksPanel.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpenReader, faCheck, faPencil, faPlus, faSearch, faTrash, faEye, faCloudArrowUp, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

import UserContext from "../context/UserContext";

const BooksPanel = () => {
    return (
        <>
        <div className="books-panel">
            <h1>Books and Chapters</h1>
            <CreateBook />
            <CreateChapter />
        </div>
        </>
    );
}

const CreateBook = () => {
    const { user } = useContext(UserContext)
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const handleBookCreation = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if(!formData.get("bookName").trim() || !formData.get("author").trim() || !formData.get("publisher").trim()){
            setError("Please fill out the required fields.");
            setTimeout(()=>setError(""),8000);
            return;
        }
        const payload = {
            "bookData": {
                "name": formData.get("bookName").trim(),
                "author": formData.get("author").trim(),
                "publisher": formData.get("publisher").trim()
            }
        }

        const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/book", payload, {
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        })
        if(response.data.success){
            setSuccess("New book created")
            setTimeout(()=>setSuccess(""),8000);

            e.target.reset();
        }else{
            setError(response.data.msg)
            setTimeout(()=>setError(""),5000)
            return;
        }
    }

    return (
        <div className="mini-panel">
            <h6><FontAwesomeIcon icon={faBookOpenReader} /> Create Book</h6>
            {
            success ? (<div className="success-alert">
                <FontAwesomeIcon icon={faCheck} className="check" />
                <p>Success: {success}</p>
            </div>) : 
            null}
            {
            error ? (<div className="error-alert">
                <FontAwesomeIcon icon={faCheck} className="check" />
                <p>Error: {error}</p>
            </div>) :
            null}
            <form onSubmit={handleBookCreation}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6">
                        <input type="text" placeholder="Name" name="bookName" required />
                    </div>
                    <div className="col-span-6">
                        <input type="text" placeholder="Author" name="author" required />
                    </div>
                </div>
                <input type="text" placeholder="Publisher" name="publisher" required />
                <button type="submit" className="create-btn">Create</button>
            </form>
        </div>
    );
}

const CreateChapter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const { user } = useContext(UserContext);

    const handleSearch = async () => {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+`/books?query=${searchQuery}`, {
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        });

        if(response.status === 200){
            if(response.data.msg){
                alert(response.data.msg)
            }else{
                if(!searchQuery){
                    setBooks([])
                }else{
                    setBooks(response.data.books)
                }
            }
        }
    }

    const fetchBooks = async () => {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+"/books",{
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        });
        if(response.status === 200){
            if(response.data.success){
                setBooks(response.data.books.slice(0, 10));
            }else{
                alert(response.data.success);
            }
        }
    }

    useEffect(()=>{
        fetchBooks();
    },[]);

    const handleQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleBookSelection = (book) => {
        setSelectedBook(book);
    }

    const remove = (data) => {
        if(data.success){
            setSuccess(data.msg);
            setTimeout(()=>setSuccess(""), 8000);
        }else{
            setError(data.msg);
            setTimeout(()=>setError(""), 8000);
        }
        setSelectedBook(null);
    }

    return (
        <div className="mini-panel">
            <h6><FontAwesomeIcon icon={faBookOpenReader} /> Add Chapters</h6>
            {success ? (<div className="success-alert">
                <FontAwesomeIcon icon={faCheck} className="check" />
                <p>Success: {success}</p>
            </div>) : 
            null}
            {
            error ? (<div className="error-alert">
                <FontAwesomeIcon icon={faCheck} className="check" />
                <p>Error: {error}</p>
            </div>) :
            null}
            {
            selectedBook ?
            <BookDetails userSelectedBook={selectedBook} remove={remove} /> :
            null}
            <hr className="my-2" />
            <h6>Library</h6>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-9">
                    <input type="text" placeholder="Search" value={searchQuery} onChange={handleQueryChange} />
                </div>
                <div className="col-span-2">
                    <button className="create-btn" style={{margin: "5px 0"}} onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="col-span-1">
                    <button className="create-btn" style={{margin: "5px 0"}} onClick={fetchBooks}><FontAwesomeIcon icon={faRefresh} /></button>
                </div>
            </div>
            <div className="search-results">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.length > 0 ?
                            books.map((book, i) => {
                                return (
                                    <tr key={i} onClick={() => handleBookSelection(book)}>
                                        <td>{book.bookName}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publisher}</td>
                                        <td>{book.modified}</td>
                                    </tr>
                                )
                            }) :
                            null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const BookDetails = ({ userSelectedBook, remove }) => {
    const { user } = useContext(UserContext);
    
    const [selectedBook, setSelectedBook] = useState({});
    const [selectedChapter, setSelectedChapter] = useState({});

    const [chapters, setChapters] = useState([]);

    const [chapterName, setChapterName] = useState("");
    const [mcqs, setMcqs] = useState([]);
    const [short, setShort] = useState([]);
    const [long, setLong] = useState([]);

    const fetchChapters = async () => {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+`/chapters?bookName=${userSelectedBook.bookName}&author=${userSelectedBook.author}`,{
            headers: {
                Authorization: `Authorization ${user.token}`
            }
        });
        if(response.status === 200){
            if(response.data.success){
                setChapters(response.data.chapters);
            }else{
                setChapters([]);
            }
        }
    }

    useEffect(()=>{
        fetchChapters();
    },[userSelectedBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!chapterName && !userSelectedBook){
            alert("Please enter chapter name first");
            return;
        }
        const payload = {
            "bookName": userSelectedBook.bookName,
            "author": userSelectedBook.author,
            "publisher": userSelectedBook.publisher,
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
            if(response.data.success){
                alert("Success");
                setMcqs([]);
                setShort([]);
                setLong([]);
                setChapterName("");
                fetchChapters();
            }else{
                alert("Failed " + response.data.msg);
            }
        }
    }

    const handleChapterSelection = (chapter) => {
        setSelectedChapter(chapter);
    }

    const handleDeleteBook = async () => {
        const payload = {
            bookName: userSelectedBook.bookName,
            author: userSelectedBook.author
        }
        fetch(import.meta.env.VITE_SERVER_URL+"/book",{
            body: JSON.stringify(payload),
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Authorization ${user.token}`
            }
        }).then((res => res.json()))
        .then(data => {
            if(data.success){
                remove(data);
            }else{
                alert(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
    <>
        <div className="book-details">
            <div className="left flex gap-3">
                <FontAwesomeIcon icon={faBook} />
                <div className="details">
                    <h5>{userSelectedBook.bookName}</h5>
                    <p><span>Author</span>: {userSelectedBook.author || "N/A"}</p>
                    <p><span>Publisher</span>: {userSelectedBook.publisher || "N/A"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button className="bg-green-600 hover:bg-green-700 duration-300 text-sm text-white py-1 px-3 rounded-md"><FontAwesomeIcon icon={faPencil} /> Edit</button>
                <button className="bg-red-600 hover:bg-red-700 duration-300 text-sm text-white py-1 px-3 rounded-md"><FontAwesomeIcon icon={faTrash} onClick={handleDeleteBook} /> Delete</button>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9">
                <input type="text" placeholder="Chapter Name" value={chapterName} onChange={(e)=>setChapterName(e.target.value)} />
            </div>
            <div className="col-span-3">
                <button className="create-btn" style={{margin: "5px 0"}} onClick={handleSubmit}><FontAwesomeIcon icon={faCloudArrowUp} /> Add Chapter</button>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-3">
            <div className="col-span-4">
                <AddMCQS updateQuestions={setMcqs} />
            </div>
            <div className="col-span-4">
                <AddShort updateQuestions={setShort} />
            </div>
            <div className="col-span-4">
                <AddLong updateQuestions={setLong} />
            </div>
        </div>
        <div className="search-results">
            <table>
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>Chapter Name</th>
                        <th style={{width: "300px"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chapters.length > 0 ?
                        chapters.map((chapter, i) => {
                            return (
                                <tr key={i} onClick={() => handleChapterSelection(chapter)}>
                                    <td className="text-center">{i + 1}</td>
                                    <td>{chapter}</td>
                                    <td>
                                        <div className="flex gap-2 justify-end pr-3">
                                            <button className="bg-blue-600 hover:bg-blue-700 duration-300 text-sm text-white py-1 px-3 rounded-md"><FontAwesomeIcon icon={faEye} /> View</button>
                                            <button className="bg-green-600 hover:bg-green-700 duration-300 text-sm text-white py-1 px-3 rounded-md"><FontAwesomeIcon icon={faPencil} /> Edit</button>
                                            <button className="bg-red-600 hover:bg-red-700 duration-300 text-sm text-white py-1 px-3 rounded-md"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) :
                        null
                    }
                </tbody>
            </table>
        </div>
    </>
    );
}

const AddMCQS = ({ updateQuestions }) => {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [questions, setQuestions] = useState([]);

    const questionRef = useRef(null);
    const opt1Ref = useRef(null);
    const opt2Ref = useRef(null);
    const opt3Ref = useRef(null);
    const opt4Ref = useRef(null);

    useEffect(()=>{
        if(questions.length > 0){
            updateQuestions(questions);
        }
    },[questions]);

    const handleSubmit = () => {
        if(!questionRef.current.value || !opt1Ref.current.value || !opt2Ref.current.value || !opt3Ref.current.value || !opt4Ref.current.value){
            return;
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
        {questions.length > 0 ? 
        (<ol className="my-2 list-decimal ml-5">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question.question}</h6>
                    <ol type="a" className="list-[lower-alpha] ml-5">
                        {question.options.map((option, i)=>{
                            return <li key={i}>{option}</li>
                        })}
                    </ol>
                </li>
            })}
        </ol>)
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <label htmlFor="mcq">MCQs Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="mcq" placeholder="Enter Question" required autoSave="false" />
            </div>
            {/* Options for MCQS */}
            <div className="flex items-center gap-2">
                <h6>a). </h6>
                <input type="text" ref={opt1Ref} placeholder="Option 1" />
            </div>
            <div className="flex items-center gap-2">
                <h6>b). </h6>
                <input type="text" ref={opt2Ref} placeholder="Option 2" />
            </div>
            <div className="flex items-center gap-2">
                <h6>c). </h6>
                <input type="text" ref={opt3Ref} placeholder="Option 3" />
            </div>
            <div className="flex items-center gap-2">
                <h6>d). </h6>
                <input type="text" ref={opt4Ref} placeholder="Option 4" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="cols-span-1">
                    <button className="bg-red-600 hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={()=>setIsAddingQuestion(false)}>Cancel</button>
                </div>
                <div className="cols-span-1">
                    <button className="bg-black hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section> : 
        (<button className="w-full bg-gray-100 py-2 text-black hover:bg-black hover:text-white border-2 border-black border-dashed duration-300 rounded-md" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> MCQ</button>
        )}
    </>)
}

const AddShort = ({ updateQuestions }) => {
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
        {questions.length > 0 ? 
        (<ol className="my-2 list-decimal ml-5">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question}</h6>
                </li>
            })}
        </ol>)
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <input type="text" ref={questionRef} id="short" placeholder="Enter Question" required autoSave="false" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="cols-span-1">
                    <button className="bg-red-600 hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={()=>setIsAddingQuestion(false)}>Cancel</button>
                </div>
                <div className="cols-span-1">
                    <button className="bg-black hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section> : (<button className="w-full bg-gray-100 py-2 text-black hover:bg-black hover:text-white border-2 border-black border-dashed duration-300 rounded-md" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> Short</button>
        )}
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
        {questions.length > 0 ? 
        (<ol className="my-2 list-decimal ml-5">
            {questions.map((question, index)=>{
                return <li key={index} className="my-3">
                    <h6>{question}</h6>
                </li>
            })}
        </ol>)
        : null }

        {/* Add Question Section */}
        {isAddingQuestion ? 
        <section>
            <div className="input-group">
                <label htmlFor="long">Long Question <sup>*</sup></label>
                <input type="text" ref={questionRef} id="long" placeholder="Enter Question" required autoSave="false" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="cols-span-1">
                    <button className="bg-red-600 hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={()=>setIsAddingQuestion(false)}>Cancel</button>
                </div>
                <div className="cols-span-1">
                    <button className="bg-black hover:bg-gray-900 duration-300 w-full py-3 text-white rounded-md mt-2" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section> : (<button className="w-full bg-gray-100 py-2 text-black hover:bg-black hover:text-white border-2 border-black border-dashed duration-300 rounded-md" onClick={()=>setIsAddingQuestion(true)}><FontAwesomeIcon icon={faPlus} /> Long</button>
        )}
    </>)
}

export default BooksPanel;