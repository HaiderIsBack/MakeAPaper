import "./BooksPanel.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpenReader, faSearch } from '@fortawesome/free-solid-svg-icons'

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
    return (
        <div className="mini-panel">
            <h6><FontAwesomeIcon icon={faBookOpenReader} /> Create Book</h6>
            <div className="row">
                <div className="col-6">
                    <input type="text" placeholder="Name" />
                </div>
                <div className="col-6">
                    <input type="text" placeholder="Author" />
                </div>
            </div>
            <input type="text" placeholder="Publisher" />
            <button className="create-btn">Create</button>
        </div>
    );
}

const CreateChapter = () => {
    return (
        <div className="mini-panel" style={{height: "500px"}}>
            <h6><FontAwesomeIcon icon={faBookOpenReader} /> Add Chapters</h6>
            <div className="book-details">
                <FontAwesomeIcon icon={faBook} />
                <div className="details">
                    <h5>Network Administration CIT-323</h5>
                    <p><span>Author</span>: Akhtar Mushtaq</p>
                    <p><span>Publisher</span>: Awais Tariq</p>
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="col-3">
                    <button className="create-btn" style={{margin: "5px 0"}}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>
            <div className="search-results">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Network Administration CIT-323</td>
                            <td>Akhar Maqsood</td>
                            <td>Muhammad Bilal</td>
                        </tr>
                        <tr>
                            <td>Operating System CIT-333</td>
                            <td>Jalil ur Rahman</td>
                            <td>Pasha Noor</td>
                        </tr>
                        <tr>
                            <td>Web Development CIT-325</td>
                            <td>Mehmood</td>
                            <td>Kamal u deen</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BooksPanel;