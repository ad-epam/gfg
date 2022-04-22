import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { MainPage } from "./pages/mainPage/MainPage";
import { ProfilePage } from "./pages/profilePage/ProfilePage";
import "./main.scss";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: "Bearer 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",
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path=":userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
