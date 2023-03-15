// Firebase versions 7, 8 et "9" en POO
import { useState, Fragment, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout'
import Quiz from '../Quiz'

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/')
        })
        return listener;
    }, [])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p className="loaderText">Loading ...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
    )
}

export default Welcome
