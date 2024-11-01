import "./BooksPanel.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'

const BooksPanel = () => {
    return (
        <>
        <div className="books-panel">
            <h1>Books and Chapters</h1>
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
        </div>
        </>
    );
}

export default BooksPanel;