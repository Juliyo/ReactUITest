import React, { Component } from 'react';

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='container'>                
                <img className='logo'/>
                <h1 className='title'>React Starter</h1>
            </div>
        );
    }
}