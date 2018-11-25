import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "mobx-react";
import App from "./views/app.jsx";
import appState from "./store/app-store.js";

const root = document.getElementById("root");
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider appState={appState}>
                <HashRouter>
                    <Component />
                </HashRouter>
            </Provider>
        </AppContainer>,
        root
    )
};
render(App);

if(module.hot) {
    module.hot.accept("./views/app.jsx", ()=>{
        const NextApp = require("./views/app.jsx").default;
        render(NextApp);
    })
}