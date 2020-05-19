import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './layout/Header';
import Games from "./games/Games";
import Courts from "./courts/Courts";
import Court from "./courts/Court";
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
                        <Route exact path="/courts">
                            <Courts />
                        </Route>
                        <Route path="/courts/:courtId" component={Court} />
                        <Route path="/">
                            <p>Index</p>
                        </Route>
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default App;