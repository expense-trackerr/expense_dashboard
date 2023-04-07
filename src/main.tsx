import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import Signup from "./components/Signup";
import "./config/firebase-config";
import "bootstrap/dist/css/bootstrap-grid.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Signup />
  </React.StrictMode>
);
