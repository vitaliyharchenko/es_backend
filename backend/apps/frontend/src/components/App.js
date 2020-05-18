import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

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
                    <Switch>
                        <Route path="/games">
                            <Games />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/courts">
                            <Courts />
                        </Route>
                        <Route path="/courts/:id" children={<Courts/>}>
                        </Route>
                        <Route path="/">
                            <Games />
                            <Courts />
                            <Users />
                        </Route>
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default App