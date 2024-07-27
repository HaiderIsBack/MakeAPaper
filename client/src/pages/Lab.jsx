import "./Lab.css"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext } from "react"
import UserContext from "../UserContext"

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
            <div className="panel-content col-md-9 col-12 p-0">
                <Outlet />
            </div>
        </div>
    </>)
}

export const Dashboard = () => {
    return (<>
        <div className="dashboard-analytics">
            <div className="column bg-success p-0">

            </div>
            <div className="column bg-primary p-0">

            </div>
            <div className="column bg-secondary p-0">

            </div>
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