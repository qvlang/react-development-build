import React, { Component, Fragment } from "react";
import Routes from "../config/router.jsx";

export default class App extends Component {
    render () {
        return (
            <Fragment>
                <div>this iss App</div>
                <Routes />
            </Fragment>
        )
    }
}