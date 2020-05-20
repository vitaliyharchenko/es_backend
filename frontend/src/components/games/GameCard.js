import React from 'react'
import {Link} from "react-router-dom";
import { parseDate, parseDuration } from "./beautyfiers";


const GameCard = ({ game }) => {
    if (game) {
        return (
            <Link to={`/games/${game.id}`} className="card" style={styles.card}>
                {/*<img src="http://easysport.online/media/courts/18.jpg" alt="" className="card-img-top"/>*/}
                <div className="card-body" style={styles.cardBody}>
                    <p style={styles.sportType}>
                        <span role="img" aria-label="ball">🏀</span>&nbsp;{game.game_type.sport_type.title.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;{game.game_type.title.toUpperCase()}
                    </p>
                    <div style={styles.badgePane}>
                        <span style={styles.price} className="badge">{game.cost} RUB</span>
                    </div>
                    <p style={styles.court}>{game.court.title}</p>
                    <p>
                        <span style={styles.datetime}><span role="img" aria-label="calendar">🗓️</span> {parseDate(game.datetime).date_short}</span>
                        <span><span role="img" aria-label="clock">🕑</span> {parseDate(game.datetime).time} ({parseDuration(game.duration)})</span>
                    </p>
                    <div className="progress" style={styles.progress}>
                        <div className="progress-bar"
                             style={Object.assign({}, styles.progressBar, {width: `${ Math.floor(game.subscribers_count / game.capacity * 100) }%`})}>
                            {game.subscribers_count}/{game.capacity}
                        </div>
                    </div>
                    {(game.user_status === 1)
                        ? <button className="btn btn-success btn-block" style={styles.button.success}>ВЫ ЗАПИСАНЫ</button>
                        : <button className="btn btn-primary btn-block" style={styles.button.regular}>ЗАПИСАТЬСЯ</button>

                    }
                </div>
            </Link>
        )
    } else {
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
        marginBottom: 5
    },
    datetime: {
        marginRight: 20
    },
    progress: {
        marginBottom: 15,
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

export default GameCard;