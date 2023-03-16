import { Component } from "react";

class Quiz extends Component {
    render() {

        const {pseudo} = this.props.userData;
        return ( 
            <div>
                <div>
                    <h2>
                        Pseudo: {pseudo}
                    </h2>
                </div>
            </div>
        );
    }
    
}

export default Quiz;