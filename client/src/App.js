import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";

import { CLIENT_ID } from "./utils/apis/gapi";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";

function App() {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
