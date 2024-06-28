import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./lib/store.ts";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryProvider>
      <AuthProvider>
        <React.StrictMode>
          <BrowserRouter>
            <ToastContainer position="bottom-right" />
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </AuthProvider>
    </QueryProvider>
  </Provider>
);
