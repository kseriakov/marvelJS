import { Component, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types"; // для проверки типов пропсов

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { error, loading, getCharacter} =  useMarvelService();


    useEffect(() => {
        getChar();    

    }, [props.selectedId]);

    const setNewChar = (char) => {
        setChar(char);
    };


    const getChar = () => {
        const id = props.selectedId;
        if (!id) {
            return;
        }

        getCharacter(id).then(setNewChar);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const loadingElem = loading ? <Spinner /> : null;
    const errorElem = error ? <ErrorMessage /> : null;
    const contentElem = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {loadingElem}
            {errorElem}
            {contentElem}
        </div>
    );
};

const View = ({ char }) => {
    const { name, descr, logo, wiki, homepage, comics } = char;
    const styleForNullImage = logo.includes("image_not_available")
        ? { objectFit: "contain" }
        : null;
    return (
        <>
            <div className="char__basics">
                <img src={logo} alt="abyss" style={styleForNullImage} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{descr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.lenght > 0 ? null : "No comics"}
                {comics.map((item, i) => {
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    selectedId: PropTypes.number, // устанавливаем, что selectedId должен быть числом
};

export default CharInfo;
