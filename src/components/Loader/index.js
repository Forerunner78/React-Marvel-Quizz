import { React } from "react";

const Loader = ({ loadingMsg, styling }) => {
    return (
        <React.Fragment>
            <div className="loader"></div>
            <p style={{ styling }}>{loadingMsg}</p>
        </React.Fragment>
    );
};

export default Loader;
