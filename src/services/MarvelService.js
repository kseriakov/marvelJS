import { useHttp } from "../hooks/http.hooks";

const useMarvelService = () => {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/characters";
    const _apiComics = "https://gateway.marvel.com:443/v1/public/comics";
    const _apiKey = "d97ce21e2265c695448a921d9ef3270a";
    const _baseOffset = 210;
    const _limitComics = 8;
    const __baseOffsetComics = 0;

    const { error, loading, request } = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getComics = async (offset = __baseOffsetComics) => {
        const res = await request(
            `${_apiComics}?limit=${_limitComics}&offset=${offset}&apikey=${_apiKey}`
        );
        return res.data.results.map(_transformComic);
    };

    const getOneComic = async (id) => {
        const res = await request(
            `${_apiComics}/${id}?apikey=${_apiKey}`
        );
        return _transformComic(res.data.results[0]);
    };

    const _transformComic = (comic) => {
        return {
            title: comic.title,
            url: comic.urls[0].url,
            price: +comic.prices[0].price > 0 ? `${comic.prices[0].price}$` : "NOT AVALIABLE",
            id: comic.id,
            logo: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            descr: comic.description,
            lang: comic.textObjects.language || "es-us",
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : "Not data about pages"
        };
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            descr: char.description,
            logo: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        };
    };

    return { error, loading, getAllCharacters, getCharacter, getComics, getOneComic };
};

export default useMarvelService;
