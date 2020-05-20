import React from 'react';
import {connect} from 'react-redux';

import { parseDate, parseDuration, parseInterval } from "./beautyfiers";
import {getGames} from "../../actions/games";


export const Game = ({game, getGames}) => {
    if (game) {
        return (
            <div style={{paddingTop: 20}}>
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card" style={styles.card}>
                            {/*<img src="http://easysport.online/media/courts/18.jpg" alt="" className="card-img-top"/>*/}
                            <div className="card-body" style={styles.cardBody}>
                                <p style={styles.sportType}>
                                    <span role="img"
                                          aria-label="ball">🏀</span>&nbsp;{game.game_type.sport_type.title.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;{game.game_type.title.toUpperCase()}
                                </p>
                                <div style={styles.badgePane}>
                                    <span style={styles.duration} className="badge">{parseDuration(game.duration)}</span>
                                    <span style={styles.price} className="badge">{game.cost} RUB</span>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={styles.court}>{game.court.title}</p>
                                        <p>{game.court.place.address}</p>
                                    </div>
                                    <div className="col" style={{ textAlign: "right", paddingTop: 10 }}>
                                        <p style={styles.datetime}>
                                            <span role="img" aria-label="calendar">🗓️</span> {parseDate(game.datetime).date}
                                        </p>
                                        <p>
                                            {parseInterval(game.datetime, game.duration).start} – {parseInterval(game.datetime, game.duration).finish}
                                        </p>
                                    </div>
                                </div>
                                <div className="progress" style={styles.progress}>
                                    <div className="progress-bar"
                                         style={Object.assign({}, styles.progressBar, {width: `${Math.floor(game.subscribers_count / game.capacity * 100)}%`})}>
                                        {game.subscribers_count}/{game.capacity}
                                    </div>
                                </div>
                                {(game.user_status === 1)
                                    ? <button className="btn btn-success btn-block" style={styles.button.success}>ВЫ
                                        ЗАПИСАНЫ</button>
                                    : <button className="btn btn-primary btn-block"
                                              style={styles.button.regular}>ЗАПИСАТЬСЯ</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        getGames();
        return <p>No game</p>
    }
};

const styles = {
    card: {
        marginBottom: 20,
        borderRadius: 15,
        textDecoration: "none",
        color: "inherit"
    },
    cardBody: {
        position: 'relative'
    },
    sportType: {
        fontSize: 14,
        fontWeight: 500,
        color: "#5b5b5b",
        paddingTop: 3
    },
    badgePane: {
        position: 'absolute',
        top: 15,
        right: 20,
    },
    duration: {
        fontSize: 14,
        fontWeight: 500,
        padding: 10,
        backgroundColor: '#E9F1FB',
        color: '#5993DC',
        marginRight: 10
    },
    price: {
        fontSize: 14,
        fontWeight: 500,
        padding: 10,
        backgroundColor: '#E9F1FB',
        color: '#5993DC'
    },
    court: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 0
    },
    datetime: {
        marginBottom: 5
    },
    progress: {
        marginBottom: 10,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E9F1FB'
    },
    progressBar: {
        backgroundColor: '#5993DC'
    },
    button: {
        regular: {
            height: 40,
            borderRadius: 20,
            backgroundColor: '#5993DC',
            borderWidth: 0
        },
        success: {
            height: 40,
            borderRadius: 20,
            backgroundColor: '#4DB56A',
            borderWidth: 0
        }
    }
};

const getGameById = (games, gameId) => {
    const gamesFiltered = games.filter(obj => {
        return obj.id === gameId
    });
    return gamesFiltered[0];
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = (state, ownProps) => {
    const gameId = parseInt(ownProps.match.params.gameId, 10);
    return {
        game: getGameById(state.gamesReducer.games, gameId)
    }
};

export default connect(mapStateToProps, {getGames})(Game);