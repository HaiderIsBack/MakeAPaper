import "./View-Books.css";

const GenerateEntry = ({book, index}) => {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{book.bookName}</td>
            <td>{book.author}</td>
            <td>{book.modified}</td>
        </tr>
    )
}

const ViewBooks = () => {
    const books = [
        {
            bookName: "Network Administrator CIT-352",
            author: "Akhtar Malik",
            modified: "12-aug-2008"
        },
        {
            bookName: "Web Development CIT-344",
            author: "Akhtar Malik",
            modified: "13-jan-2004"
        },
        {
            bookName: "PC Repairing CIT-333",
            author: "Akhtar Malik",
            modified: "29-jul-2002"
        },
        {
            bookName: "Operating System CIT-334",
            author: "Akhtar Malik",
            modified: "08-jul-2018"
        },
        {
            bookName: "Technical Report Writing CIT-325",
            author: "Akhtar Malik",
            modified: "16-feb-2010"
        }
    ]
    return (
        <>
            <table className="view-books">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Modified Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        return <GenerateEntry book={book} index={index} />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ViewBooks;