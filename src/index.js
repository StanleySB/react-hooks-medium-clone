import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import TopBar from "./components/topBar";
import CurrentUserChecker from "./components/currentUserChecker";

import Routes from "./routes";
import { CurrentUserProvider } from "./contexts/currentUser";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
