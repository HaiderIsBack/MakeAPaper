import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminPanel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import UserContext from "../context/UserContext";

const AdminPanel2 = () => {
    const location = useLocation();
    return (
        <>
            <div className="admin-panel">
                <menu>
                    <li className={location.pathname === "/" ? "active" : ""}><Link to={"/"}>Dashboard</Link></li>
                    <li className={location.pathname === "/view-books" ? "active" : ""}><Link to={"/view-books"}>View Books</Link></li>
                    <li className={location.pathname === "/add-book" ? "active" : ""}><Link to={"/add-book"}>Insert Book</Link></li>
                    <li className={location.pathname === "/add-chapter" ? "active" : ""}><Link to={"/add-chapter"}>Insert Chapter</Link></li>
                </menu>
                <div className="panel">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

const AdminPanel = () => {
    const { user, logout } = useContext(UserContext);
    return (
        <div className="admin-panel-wrapper">
            <div className="admin-panel-2">
                <div className="row" style={{height: "100%"}}>
                    <div className="col-3 control-panel d-flex flex-column justify-content-between">
                        <menu>
                            <li className="active"><Link>Dashboard</Link></li>
                            <li><Link>Books</Link></li>
                            <li><Link>Accounts</Link></li>
                            <li><Link>Requests</Link></li>
                            <li><Link>News</Link></li>
                        </menu>
                        <div className="logout-btn">
                            <p>Hi, {user.user.username}</p>
                            <button onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
                        </div>
                    </div>
                    <div className="col-9 content-panel">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;