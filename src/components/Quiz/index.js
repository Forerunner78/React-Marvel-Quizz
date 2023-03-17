import React, { Component } from "react";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../Progressbar";

class Quiz extends Component {
    getLevelNames = () => {
        const quizLevels = Object.keys(QuizMarvel[0].quizz).reduce((acc, key) => {
            acc.push(key);
            return acc;
        }, []);
        return quizLevels;
    };

    storedDataRef = React.createRef();

    loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz;

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
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
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
            });
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        });
    };

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1,
            }));
        }
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
        score: 0,
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

                <button
                    disabled={this.state.btnDisabled}
                    className="btnSubmit"
                    onclick={this.nextQuestion}
                >
                    Suivant
                </button>
            </div>
        );
    }
}

export default Quiz;
