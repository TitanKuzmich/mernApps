import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";

import 'materialize-css'

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
            <Router>
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
