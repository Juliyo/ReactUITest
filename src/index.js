import React from "react";
import ReactDOM from "react-dom";
import CommandManager from "./CommandManager.js"
import App from "./components/App.js"
import ReactDynamicImport from "react-dynamic-import";

var command = new CommandManager();

ReactDOM.render(<App />, document.getElementById("index"));