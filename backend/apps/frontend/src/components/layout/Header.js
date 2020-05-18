import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">EasySport</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/games">
                                <a className="nav-item nav-link">Игры <span className="sr-only">(current)</span></a>
                            </Link>
                            <Link to="/courts">
                                <a className="nav-item nav-link">Площадки <span className="sr-only">(current)</span></a>
                            </Link>
                            <Link to="/users">
                                <a className="nav-item nav-link">Игроки <span className="sr-only">(current)</span></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header