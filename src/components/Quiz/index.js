import { Component } from "react";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../Progressbar";

class Quiz extends Component {
    getLevelNames = () => {
        const quizLevels = Object.keys(QuizMarvel[0].quizz).reduce(
            (acc, key) => {
                acc.push(key);
                return acc;
            },
            []
        );
        return quizLevels;
    };

    loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            const newArray = fetchedArrayQuiz.map(
                ({ answer, ...keepRest }) => keepRest
            );
            this.setState({
                storedQuestions: newArray,
            });
        } else {
            console.log("Pas assez de questions!");
        }
    };

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
            });
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        });
    };

    state = {
        levelNames: this.getLevelNames(),
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
    };

    render() {
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p
                    key={index}
                    onClick={() => this.submitAnswer(option)}
                    className={`answerOptions ${
                        this.state.userAnswer === option ? "selected" : null
                    }`}
                >
                    {option}
                </p>
            );
        });

        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>

                {displayOptions}

                <button disabled={this.state.btnDisabled} className="btnSubmit">
                    Suivant
                </button>
            </div>
        );
    }
}

export default Quiz;
