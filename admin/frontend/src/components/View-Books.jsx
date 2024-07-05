import { useEffect, useState } from "react";
import axios from "axios";
import "./View-Books.css";

const GenerateEntry = ({book, index}) => {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{book.bookName}</td>
            <td>{book.author}</td>
            <td>{book?.publisher}</td>
            <td>{book?.modified}</td>
        </tr>
    )
}

const ViewBooks = () => {
    const [books, setBooks] = useState([])

    useEffect(()=>{
        const fetchBooks = async () => {
            const response = await axios.get("/api/v1/books");
            if(response.status === 200){
                if(response.data.msg){
                    alert(response.data.msg)
                }else{
                    setBooks(response.data)
                }
            }
        }
        fetchBooks()
    },[])

    return (
        <>
            <table className="view-books">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Modified Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        return <GenerateEntry book={book} index={index} key={index} />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ViewBooks;