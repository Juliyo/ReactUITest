import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js"
import CommandManager from "./CommandManager.js"

var SCREEN_SALEOPTION 		= "SCREEN_001_SALEOPTION";


var command = new CommandManager();


ReactDOM.render(<App />, document.getElementById("index"));