import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import userContext from "./context/userContext.jsx";
import TasksContext from "./context/TasksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <userContext>
        <TasksContext>
          <App />
        </TasksContext>
      </userContext>
    </BrowserRouter>
  </StrictMode>
);
