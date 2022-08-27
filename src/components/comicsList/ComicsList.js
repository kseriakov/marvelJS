import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
    const { getComics, error, loading } = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        getNewComics(offset);
    }, []);

    const getNewComics = (offset) => {
        getComics(offset).then(addComicsList);
    };

    const uploadNewComics = () => {
        getNewComics(offset);
    };

    const addComicsList = (comics) => {
        if (comics.length < 8) {
            // проверям, что персонажи закончились, чтобы скрыть кнопку загрузки
            setEnd(true);
        }

        const newCommicsElem = renderComicsList(comics);

        setComicsList((comicsList) => [...comicsList, ...newCommicsElem]);

        setOffset((offset) => offset + 8);
    };

    const renderComicsList = (comics) => {
        return comics.map((item, i) => {
            return (
                <Link to={`./${item.id}`} key={item.id * Math.round(Math.random() * 1000)}>
                    <li className="comics__item" key={item.id * Math.round(Math.random() * 1000)}>
                        <a href={item.url}>
                            <img src={item.logo} alt="ultimate war" className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </a>
                    </li>
                </Link>
            );
        });
    };

    const spinner = loading && !error ? <Spinner /> : null;
    const errorMessage = error && !loading ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">{comicsList}</ul>
            <button
                className="button button__main button__long"
                onClick={uploadNewComics}
                disabled={loading}
                style={{ display: end ? "none" : null }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
