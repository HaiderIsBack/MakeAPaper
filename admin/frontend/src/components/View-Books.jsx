import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
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
    const [books, setBooks] = useState([]);
    
    const { user } = useContext(UserContext);

    useEffect(()=>{
        const fetchBooks = async () => {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL+"/books",{
                headers: {
                    Authorization: `Authorization ${user.token}`
                }
            });
            if(response.status === 200){
                if(response.data.success){
                    setBooks(response.data.books)
                }else{
                    alert(response.data.success);
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