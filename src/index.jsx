import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { ReactNotifications } from "react-notifications-component"
import 'react-notifications-component/dist/theme.css'
// import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactNotifications />
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>
        <RouterProvider router={ router } />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
