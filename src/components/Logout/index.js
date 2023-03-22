import { useState, useEffect } from "react";
import { signOut } from "@firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Logout = () => {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (checked) {
            signOut(auth)
                .then(() => {
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                })
                .catch((error) => {
                    console.log("vous êtes toujours connecté");
                });
        }
    }, [checked]);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input onChange={handleChange} type="checkbox" checked={checked} />
                <span
                    className="slider round"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Deconnexion"
                ></span>
            </label>
            <Tooltip id="my-tooltip" place="left" effect="solid" />
        </div>
    );
};

export default Logout;
