import React, { setState, useState, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/" element={<MainPage />} />
                        <Route path="*" element={<Page404 />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                    </Routes>
                </main>
                {/* <Elem cls={"myclass"}>  передаем пустые компоненты, которые в дальнейшем модифицируем */}
                {/* <p>tttrrt</p>
                    <p>sssr</p>
                </Elem> */}
                {/* <Counter render={counter => {  паттерн
                    return <Message counter={counter} />;
                }} /> */}
            </div>
        </Router>
    );
};

const Elem = (props) => {
    // модифицируем переданные дочерние компоненты
    return (
        <div className={props.cls}>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, { style: { fontSize: 40 } });
            })}
        </div>
    );
};

// далее ниже паттерн render-props
const Message = (props) => {
    return (
        <>
            <p style={{ fontSize: 30 }}>Props = {props.counter}</p>
        </>
    );
};

class Counter extends Component {
    state = {
        counter: 0,
    };

    onChangeCounter = () => {
        this.setState(({ counter }) => ({ counter: ++counter }));
    };

    render() {
        return (
            <>
                <button onClick={this.onChangeCounter}>click me</button>
                {this.props.render(this.state.counter)}
            </>
        );
    }
}
//

export default App;
