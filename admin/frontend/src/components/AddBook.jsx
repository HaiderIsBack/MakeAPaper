import { useState } from "react";
import "./AddBook.css";
import axios from "axios"

const AddBook = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            "bookData": {
                "name": e.target.bookName.value.trim(),
                "author": e.target.author.value.trim(),
                "publisher": e.target.publisher.value.trim()
            }
        }

        const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/book", payload)
        if(response.status === 200){
            if(response.data.msg){
                setError(response.data.msg)
                setTimeout(()=>setError(""),5000)
                return
            }else{
                setSuccess("New book created")
                setTimeout(()=>setSuccess(""),8000)
            }
            e.target.reset()
        }
    }

    return (
        <div className="add-book-container">
            <form onSubmit={handleSubmit} className="add-book">
                <h3 className="my-4">New Book</h3>
                <div className="input-group">
                    <label htmlFor="bookName">Book Name <sup>*</sup></label>
                    <input type="text" id="bookName" name="bookName" placeholder="Enter Book Name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="author">Author <sup>*</sup></label>
                    <input type="text" id="author" name="author" placeholder="Enter Author" required />
                </div>
                <div className="input-group">
                    <label htmlFor="publisher">Publisher <sup>*</sup></label>
                    <input type="text" id="publisher" name="publisher" placeholder="Enter Publisher" required />
                </div>
                { error ? 
                <div className="alert">
                    <strong>Error</strong>
                    {error}
                </div> : null}
                { success && !error ? 
                <div className="alert alert-success">
                    <strong>Success</strong>
                    {success}
                </div> : null}

                <button type="submit">Create Book</button>
            </form>
        </div>
    )
}

export default AddBook;