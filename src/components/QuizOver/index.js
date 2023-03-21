import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";

const QuizOver = React.forwardRef((props, ref) => {
    const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions } = props;
    const [asked, setAsked] = useState([]);

    useEffect(() => {
        setAsked(ref.current);
    }, [ref]);

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel);
        }, 3000);
    }

    const decision =
        score >= averageGrade ? (
            <React.Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelNames.length ? (
                        <React.Fragment>
                            <p className="successMsg">Bravo, passez au niveau suivant</p>
                            <button
                                className="btnResult success"
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau suivant
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p className="successMsg">
                                <GiTrophyCup size="50px" />
                                Bravo, vous êtes un expert
                            </p>
                            <button
                                className="btnResult gameOver"
                                onClick={() => loadLevelQuestions(0)}
                            >
                                Acceuil
                            </button>
                        </React.Fragment>
                    )}
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <div className="stepsBtnContainer">
                    <p className="successMsg">Vous avez échoué !</p>
                    <button className="btnResult success">Niveau suivant</button>
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>
            </React.Fragment>
        );

    const questionAnswer =
        score >= averageGrade ? (
            asked.map((question) => {
                return (
                    <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>
                            <button className="btnInfo">Infos</button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">
                    <Loader
                        loadingMsg={"Pas de réponses"}
                        styling={{ textAlign: "center", color: "red" }}
                    />
                </td>
            </tr>
        );

    return (
        <React.Fragment>
            {decision}
            <hr />
            <p>Les réponses aux questions posées</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>{questionAnswer}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
});

export default React.memo(QuizOver);
