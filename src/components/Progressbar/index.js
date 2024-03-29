import React from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
    const actualQuestion = idQuestion + 1;

    const getWidth = (totalQuestions, questionID) => {
        return (100 / totalQuestions) * questionID;
    };

    const progressPercent = getWidth(maxQuestions, actualQuestion);
    return (
        <>
            <div className="percentage">
                <div className="progressPercent">{`Question: ${actualQuestion}/${maxQuestions}`}</div>
                <div className="progressPercent">{`Progression: ${progressPercent}%`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </>
    );
};

export default React.memo(ProgressBar);
