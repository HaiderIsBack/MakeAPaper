import "./BooksPanel.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpenReader, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext, useEffect } from "react";
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
        console.log(e.target)
        const formData = new FormData(e.target);
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
            {success}
            {error}
            <form onSubmit={handleBookCreation}>
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder="Name" name="bookName" required />
                    </div>
                    <div className="col-6">
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

    useEffect(()=>{
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
        fetchBooks();
    },[]);

    const handleQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleBookSelection = (book) => {
        setSelectedBook(book);
    }

    return (
        <div className="mini-panel" style={{height: "500px"}}>
            <h6><FontAwesomeIcon icon={faBookOpenReader} /> Add Chapters</h6>
            {
            selectedBook ?
            (<div className="book-details">
                <FontAwesomeIcon icon={faBook} />
                <div className="details">
                    <h5>{selectedBook.bookName}</h5>
                    <p><span>Author</span>: {selectedBook.author || "N/A"}</p>
                    <p><span>Publisher</span>: {selectedBook.publisher || "N/A"}</p>
                </div>
            </div>) :
            null}
            <div className="row">
                <div className="col-9">
                    <input type="text" placeholder="Search" value={searchQuery} onChange={handleQueryChange} />
                </div>
                <div className="col-3">
                    <button className="create-btn" style={{margin: "5px 0"}} onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
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

export default BooksPanel;