import React, { Component, Fragment } from "react";
import { QuizMarvel } from "../quizMarvel";
import { toast, ToastContainer } from "react-toastify";
import { FaChevronRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../Progressbar";
import QuizOver from "../QuizOver";

const initialState = {
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false,
    percent: null,
};

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.storedDataRef = React.createRef();
    }

    getLevelNames = () => {
        const quizLevels = Object.keys(QuizMarvel[0].quizz).reduce((acc, key) => {
            acc.push(key);
            return acc;
        }, []);
        return quizLevels;
    };

    loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz;

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({
                storedQuestions: newArray,
            });
        }
    };

    componentDidMount() {
        this.loadQuestions(this.getLevelNames()[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        const { maxQuestions, storedQuestions, idQuestion, score, quizEnd } = this.state;

        if (storedQuestions !== prevState.storedQuestions && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
            });
        }

        if (idQuestion !== prevState.idQuestion && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }

        if (quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercentage(maxQuestions, score);
            this.gameOver(gradePercent);
        }

        if (this.props.userPseudo !== prevProps.userPseudo) {
            this.showToastMsg(this.props.userPseudo);
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        });
    };

    getPercentage = (maxQuestions, ourScore) => (ourScore / maxQuestions) * 100;

    gameOver = (percent) => {
        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent,
            });
        } else {
            this.setState({
                percent,
            });
        }
    };

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.setState({ quizEnd: true });
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

            toast.success("Bravo, bonne réponse +1", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error("Mauvaise réponse 0", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    showToastMsg = (pseudo) => {
        console.log("pseudo quiz");
        console.log(pseudo);
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true,
            });

            toast.info(`Bienvenu ${pseudo} et bonne chance`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    loadLevelQuestions = (param) => {
        this.setState({ ...initialState, quizLevel: param });
        this.loadQuestions(this.getLevelNames()[param]);
    };

    render() {
        const {
            quizLevel,
            maxQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent,
        } = this.state;

        const displayOptions = options.map((option, index) => {
            return (
                <p
                    key={index}
                    onClick={() => this.submitAnswer(option)}
                    className={`answerOptions ${userAnswer === option ? "selected" : null}`}
                >
                    <FaChevronRight />
                    {option}
                </p>
            );
        });

        return quizEnd ? (
            <QuizOver
                ref={this.storedDataRef}
                levelNames={this.getLevelNames()}
                score={score}
                maxQuestions={maxQuestions}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (
            <Fragment>
                <ToastContainer />
                <Levels levelNames={this.getLevelNames()} quizLevel={quizLevel} />
                <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
                <h2>{question}</h2>

                {displayOptions}

                <button disabled={btnDisabled} className="btnSubmit" onClick={this.nextQuestion}>
                    {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </Fragment>
        );
    }
}

export default Quiz;
