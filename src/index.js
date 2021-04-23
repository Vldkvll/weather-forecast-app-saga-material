import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { DataProvider } from "./DataContext/DataContext";
import { store } from "./Redux/store";

ReactDOM.render(
    <Provider store={store}>
        <DataProvider>
            <App />
        </DataProvider>
    </Provider>,
    document.getElementById("root")
);
