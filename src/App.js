import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Todos from "./Todos";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todos />
      </div>
    </Provider>
  );
}

export default App;
