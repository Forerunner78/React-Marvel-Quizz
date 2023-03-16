import { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../Progressbar";

class Quiz extends Component {
    render() {
        return ( 
            <div>
                <Levels />
                <ProgressBar />
            </div>
        );
    }
    
}

export default Quiz;