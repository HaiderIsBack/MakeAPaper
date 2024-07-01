import "./AddBook.css";

const AddBook = () => {
    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="add-book">
                <h3 className="my-4">New Book</h3>
                <div className="input-group">
                    <label htmlFor="bookName">Book Name <sup>*</sup></label>
                    <input type="text" id="bookName" placeholder="Enter Book Name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="author">Author <sup>*</sup></label>
                    <input type="text" id="author" placeholder="Enter Author" required />
                </div>
                <div className="input-group">
                    <label htmlFor="publisher">Publisher <sup>*</sup></label>
                    <input type="text" id="publisher" placeholder="Enter Publisher" required />
                </div>

                <button type="submit">Create Book</button>
            </form>
        </>
    )
}

export default AddBook;