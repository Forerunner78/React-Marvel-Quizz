import "../../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IconContext } from "react-icons";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";

function App() {
    return (
        <Router>
            <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
                <Header />

                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>

                <Footer />
            </IconContext.Provider>
        </Router>
    );
}

export default App;
