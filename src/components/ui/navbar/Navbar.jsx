import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import MyButton from "../button/MyButton"
import {AuthContext} from "../../../context/Context"

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
    localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Exit
            </MyButton>
            <div className="navbarLinks">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    )
}

export default Navbar