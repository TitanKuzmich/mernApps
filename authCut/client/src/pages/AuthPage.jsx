import React, {useContext, useEffect, useState} from 'react'

import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:"",
        password:""
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async() => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch(e) {

        }
    }

    const loginHandler = async() => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch(e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="input--yellow white-text darken-1"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className="white-text">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="input--yellow white-text darken-1"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password" className="white-text">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn btn-primary darken-4"
                            onClick={loginHandler}
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-3 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}