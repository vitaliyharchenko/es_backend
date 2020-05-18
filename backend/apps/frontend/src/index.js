import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import Root from "./components/Root";

ReactDOM.render(<Root store={store} />, document.getElementById('app'));