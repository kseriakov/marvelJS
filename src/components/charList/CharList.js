import React, { Component, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {

    const [charsList, setCharsList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(1550);
    const [charsEnded, setCharsEnded] = useState(false);

    const {error, loading, getAllCharacters} = useMarvelService();

    const addNewChars = (chars) => {
        const charsList = renderItemChars(chars);
        onCharLoaded(charsList);
    };

    let myRefs = useRef([]);

    const onFocusItem = (id) => {
        myRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
        myRefs.current[id].classList.add("char__item_selected");
        myRefs.current[id].focus();
    };

    const onSelectItem = (id) => {
        props.onSelectId(id);
    };

    const renderItemChars = (chars) => {
        return chars.map((char, i) => {
            const styleForNullImage = char.logo.includes("image_not_available")
                ? { objectFit: "unset" }
                : null;
            return (
                <>
                    <li
                        className="char__item"
                        tabIndex={0}
                        key={char.id}
                        onClick={() => {
                            onSelectItem(char.id);
                            onFocusItem(i);
                        }}
                        ref={(elem) => myRefs.current[i] = elem}
                    >
                        <img src={char.logo} alt="abyss" style={styleForNullImage} />
                        <div className="char__name">{char.name}</div>
                    </li>
                </>
            );
        });
    };

    const getCharactersList = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllCharacters(offset).then(addNewChars);
    };

    useEffect(() => {
        getCharactersList(offset, true);
    }, []);

    const onCharLoaded = (newCharsList) => {
        let end;
        if (newCharsList.length < 9) {
            // проверям, что персонажи закончились, чтобы скрыть кнопку загрузки
            end = true;
        }

        setCharsList((charsList) => [...charsList, newCharsList]); // к старым данным добавляем вновь подгруженные
        setNewCharsLoading((newCharsLoading) => false);
        setOffset((offset) => offset + 9);
        setCharsEnded((charsEnded) => end ?? false);
    };

    const loadingElem = loading && !newCharsLoading ? <Spinner /> : null;
    const errorElem = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadingElem}
                {errorElem}
                {charsList}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newCharsLoading}
                onClick={() => getCharactersList(offset)}
                style={{ display: charsEnded ? "none" : null }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onSelectId: PropTypes.func, // устанавливаем, что onSelectId должен быть функцией
};

export default CharList;
