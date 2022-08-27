import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = (props) => {

    const [char, setChar] = useState({});

    const {error, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        getChar();
    }, []);

    const setNewChar = (char) => {
        setChar(char);
    };

    const getChar= () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(setNewChar);
    };

    const loadingElem = loading ? <Spinner /> : null;
    const errorElem = error ? <ErrorMessage /> : null;
    const contentElem = !(loading || error) ? <Content char={char} /> : null;

    return (
        <div className="randomchar">
            {loadingElem}
            {errorElem}
            {contentElem}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={getChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

const Content = (char) => {
    const {
        char: { name, descr, logo, wiki, homepage },
    } = char;

    let styleForNullImage;
    
    if (logo) {
    styleForNullImage = logo.includes("image_not_available")
        ? { objectFit: "contain" }
        : null;
    }
    return (
        <div className="randomchar__block">
            <img
                src={logo}
                alt="Random character"
                className="randomchar__img"
                style={styleForNullImage}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
