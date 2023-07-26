import React, {useContext} from 'react'
import {Route, Routes} from "react-router-dom"
import {privatRoutes, publicRoutes} from "../router/Routers"
import {AuthContext} from "../context/Context"
import Loader from "./ui/loader/Loader"

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privatRoutes.map(route =>
                    <Route
                        exact={route.exact}
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        exact={route.exact}
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                )}
            </Routes>

    )
}

export default AppRouter