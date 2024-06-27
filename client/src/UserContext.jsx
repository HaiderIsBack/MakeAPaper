import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(()=>{
        const isLoggedIn = JSON.parse(localStorage.getItem("user:details")) && localStorage.getItem("user:token")

        if(isLoggedIn){
            return {
                user: JSON.parse(localStorage.getItem("user:details")),
                token: localStorage.getItem("user:token")
            }
        }else{
            return null
        }
    });

    useEffect(()=>{
        if(user){
            localStorage.setItem("user:details", JSON.stringify(user.user))
            localStorage.setItem("user:token", user.token)
        }
    }, [user])

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user:details")
        localStorage.removeItem("user:token")
    }
    return (
        <UserContext.Provider value={{user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;