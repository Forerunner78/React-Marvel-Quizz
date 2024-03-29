import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
    const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions } = props;
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
    const hash = process.env.REACT_APP_MARVEL_API_HASH;

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAsked(ref.current);

        if (localStorage.getItem("marvelStorageDate")) {
            const date = localStorage.getItem("marvelStorageDate");
            checkDataAge(date);
        }
    }, [ref]);

    const checkDataAge = (date) => {
        var today = Date.now();
        const timeDifference = today - date;

        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 15) {
            localStorage.clear();
            localStorage.setItem("marvelStorageDate", Date.now());
        }
    };

    const showModal = (id) => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {
            setCharacterInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);
        } else {
            axios
                .get(
                    `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
                )
                .then((response) => {
                    setCharacterInfos(response.data);
                    setLoading(false);

                    localStorage.setItem(id, JSON.stringify(response.data));
                    if (!localStorage.setItem("marvelStorageDate")) {
                        localStorage.setItem("marvelStorageDate", Date.now());
                    }
                })
                .catch((err) => {});
        }
    };

    const hideModal = () => {
        setOpenModal(false);
        setLoading(true);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel);
        }, 6000);
    }

    const ResumeMsg =
        score <= averageGrade ? "" : <p>Récapitulatif de vos réponses aux questions posées</p>;

    const decision =
        score >= averageGrade ? (
            <React.Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelNames.length ? (
                        <React.Fragment>
                            <p className="successMsg">Bravo! Passez au niveau suivant</p>
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
                                Bravo! Vous êtes un expert
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
                    <p className="failureMsg">Vous avez échoué !</p>
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
                            <button className="btnInfo" onClick={() => showModal(question.heroId)}>
                                Infos
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">
                    <Loader
                        loadingMsg={
                            "Vous allez être redirigé au début du Quiz pour retenter votre chance"
                        }
                        styling={{ textAlign: "center", color: "red" }}
                    />
                </td>
            </tr>
        );

    const resultInModal = !loading ? (
        <>
            <div className="modalHeader">
                <h2>{characterInfos.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img
                        src={
                            characterInfos.data.results[0].thumbnail.path +
                            "." +
                            characterInfos.data.results[0].thumbnail.extension
                        }
                        alt={characterInfos.data.results[0].name}
                    />
                    <p>{characterInfos.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {characterInfos.data.results[0].description ? (
                        <p>{characterInfos.data.results[0].description}</p>
                    ) : (
                        <p>Description indisponible</p>
                    )}

                    <h3>Plus d'infos</h3>
                    {characterInfos.data.results[0].urls &&
                        characterInfos.data.results[0].urls.map((url, index) => {
                            return (
                                <a
                                    key={index}
                                    href={url.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {capitalizeFirstLetter(url.type)}
                                </a>
                            );
                        })}
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={hideModal}>
                    Fermer
                </button>
            </div>
        </>
    ) : (
        <>
            <div className="modalHeader">
                <h2>Réponse de Marvel ...</h2>
            </div>
            <div className="modalBody">
                <Loader />
            </div>
        </>
    );

    return (
        <React.Fragment>
            {decision}
            <hr />
            {ResumeMsg}
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
            <Modal showModal={openModal} hideModal={hideModal}>
                {resultInModal}
            </Modal>
        </React.Fragment>
    );
});

export default React.memo(QuizOver);
