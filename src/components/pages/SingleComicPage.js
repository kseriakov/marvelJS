import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import xMen from "../../resources/img/x-men.png";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const id = useParams().comicId; // получили значение из url пути

    const [comic, setComic] = useState(null);

    const { error, loading, getOneComic } = useMarvelService();

    useEffect(() => {
        getComic();
    }, [id]);

    const setNewComic = (comic) => {
        setComic(comic);
    };

    const getComic = () => {
        if (!id) {
            return;
        }

        getOneComic(id).then(setNewComic);
    };

    const loadingElem = loading ? <Spinner /> : null;
    const errorElem = error ? <ErrorMessage /> : null;
    const contentElem = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {loadingElem}
            {errorElem}
            {contentElem}
        </>
    );
};

const View = ({comic}) => { 
    const { title, descr, pageCount, lang, price, logo } = comic;
    return (
        <div className="single-comic">
            <img src={logo} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{lang}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
