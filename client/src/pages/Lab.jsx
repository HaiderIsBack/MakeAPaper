import "./Lab.css"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext } from "react"
import UserContext from "../UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const navItems = [
    {href: "/lab", itemName: "Dashboard"},
    {href: "/lab/tests", itemName: "My Tests"},
    {href: "/lab/account", itemName: "Account"},
    {href: "/lab/news", itemName: "News"},
]

const Lab = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)
    
    return (<>
        <header>
            <h6>Hi, {user?.user.username}</h6>
            <motion.button onClick={logout} initial={{scale:1}} whileTap={{scale:0.8}} whileHover={{scale:1.1}} transition={{ease: "backOut"}}>Logout</motion.button>
        </header>
        <div className="lab-container row">
            <div className="panel col-md-3 d-md-block d-none p-0">
                <menu>
                    {
                        navItems.map((navItem, i) => {
                            return <li key={i} className={location.pathname == navItem.href ? "active" : ""} onClick={()=>navigate(navItem.href)} >{navItem.itemName}</li>
                        })
                    }
                </menu>
            </div>
            <div className="panel-content col-md-9 col-12">
                <Outlet />
            </div>
        </div>
    </>)
}

export const Dashboard = () => {
    return (<>
        <div className="dashboard">
            <h3>Create new test</h3>
            <button className="create-test">Create new <FontAwesomeIcon icon={faPlus} /></button>
        </div>
    </>)
}

export const UserTests = () => {
    return (<>
        User Tests
    </>)
}

export const Account = () => {
    return (<>
        Account
    </>)
}

export const News = () => {
    return (<>
        News
    </>)
}

export default Lab