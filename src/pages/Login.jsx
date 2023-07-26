import React, {useContext} from 'react'
import MyInput from "../components/ui/input/MyInput"
import MyButton from "../components/ui/button/MyButton"
import {AuthContext} from "../context/Context"

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = (event) => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput type={"text"} placeholder='Login'/>
                <MyInput type={"password"} placeholder='Password'/>
                <MyButton>Down</MyButton>
            </form>
        </div>
    )
}

export default Login