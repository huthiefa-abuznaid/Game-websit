import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EduGames24Home from "./EduGames24Home.jsx";
import AuthPage from "./AuthPage.jsx";
import GameDetailPage from "./GameDetailPage.jsx";

const path = window.location.pathname;
const mode = path.endsWith("/register.html") ? "register" : path.endsWith("/login.html") ? "login" : null;
const isGamePage = path.endsWith("/game.html");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isGamePage ? <GameDetailPage /> : mode ? <AuthPage mode={mode} /> : <EduGames24Home />}
  </StrictMode>
);
