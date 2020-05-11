import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGames } from "../../actions/games";

export class Games extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        getGames: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getGames();
    }

    render() {
        return (
            <Fragment>
                <h2>Games</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>datetime</th>
                            <th>creator</th>
                            <th>capacity</th>
                            <th>cost</th>
                            <th>duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.games.map(game => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.datetime}</td>
                                <td>{game.creator}</td>
                                <td>{game.capacity}</td>
                                <td>{game.cost}</td>
                                <td>{game.duration}</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    games: state.gamesReducer.games
});

export default connect(mapStateToProps, { getGames })(Games);