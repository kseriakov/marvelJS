import { useState, useCallback, useEffect, useMemo } from "react";

const Parent = () => {
    const [counter, setCounter] = useState(0);
    const [flag, setFlag] = useState(false);

    useMemo(() => {
        setFlag(flag => !flag);
    }, [counter]);

    const onClickCounter = () => {
        setCounter((counter) => ++counter);
        console.log("Counter plus one on click", counter);
    };

    const renderElem = useCallback(() => {
        console.log(counter, "renderElem");
        return (
            <>
                <h2>Count is {counter}!</h2>
            </>
        );
    }, [flag]);

    return (
        <>
            <button onClick={onClickCounter}>Clickk</button>
            <Childern renderElem={renderElem} />
        </>
    );
};

const Childern = (props) => {
    const [b, setB] = useState(false);
    const [elem, setElem] = useState(null);
    useEffect(() => {
        setElem((elem) => props.renderElem());
    }, [props.renderElem]);
    return (
        <>
            {elem}
            <button onClick={() => setB((b) => !b)}>flag {b ? "true" : "false"}</button>
        </>
    );
};

export default Parent;
