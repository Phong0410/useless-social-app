import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { gapi } from "gapi-script";

import { CLIENT_ID } from "./utils/apis/gapi";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import PostDetail from "./components/PostDetail";

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
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace={true} />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
