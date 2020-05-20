import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGames } from "../../actions/games";
import GameCard from "./GameCard";


export class Games extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        getGames: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getGames();
    };

    render() {
        return (
            <div style={{ paddingTop: 20 }}>
                <h1 style={styles.header}>Игры</h1>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {this.props.games.map(game => (
                                <div className="col-12 col-md-6 col-xl-4" key={game.id}>
                                    <GameCard game={game} key={game.id}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    header: {
      fontWeight: 'bold'
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    games: state.gamesReducer.games
});

export default connect(mapStateToProps, { getGames })(Games);