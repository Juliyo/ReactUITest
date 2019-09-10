import React from "react";
import ReactDOM from "react-dom";

class SceneManager
{
    constructor()
    {
        this.currentScene = undefined;

        this.map = new Map();
    }

    put_scene(Component, SceneVariablesJson)
    {
        ReactDOM.render(<Component />, document.getElementById("index"));
    }
}

export default (new SceneManager);