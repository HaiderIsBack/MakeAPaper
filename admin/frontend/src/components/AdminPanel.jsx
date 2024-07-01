import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminPanel.css"

const AdminPanel = () => {
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

export default AdminPanel;