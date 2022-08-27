import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

const MainPage = (props) => {
    const [selectedCharId, setChar] = useState(null);

    const onSelectId = (id) => {
        setChar(id);
    };

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectId={onSelectId} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedId={selectedCharId} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
