import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">EasySport</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/games" className="nav-item nav-link">
                                Игры
                            </Link>
                            <Link to="/courts" className="nav-item nav-link">
                                Площадки
                            </Link>
                            <Link to="/users" className="nav-item nav-link">
                                Игроки
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header