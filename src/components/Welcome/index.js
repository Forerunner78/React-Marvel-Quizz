// Firebase 9
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = () => {
    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);
    const [userPseudo, setUserPseudo] = useState("");

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : navigate("/");
        });

        if (!!userSession) {
            const colRef = user(userSession.uid);

            getDoc(colRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data(); // objet
                        console.log(docData);
                        console.log(snapshot.id);
                        if (docData.pseudo !== null) {
                            setUserPseudo(docData.pseudo);
                        } else {
                            setUserPseudo("");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return listener();
    }, [userSession]);

    return userSession === null ? (
        <Loader
            loadingMsg={"Authentification ..."}
            styling={{ textAlign: "center", color: "#FFFFFF" }}
        />
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz userPseudo={userPseudo} />
            </div>
        </div>
    );
};

export default Welcome;
