import React, { Component, Fragment } from 'react';

import Header from './layout/Header';
import Games from "./games/Games";
import Courts from "./courts/Courts";
import Users from "./users/Users";


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <Games />
                    <Courts />
                    <Users />
                </div>
            </Fragment>
        )
    }
}

export default App