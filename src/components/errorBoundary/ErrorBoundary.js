// Предохранитель, отлавливает ошибки компонентов, чтобы не падало все приложение

import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";


class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;