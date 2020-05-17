import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGames } from "../../actions/games";
import moment from 'moment';

const parseDate = dateString => {
    moment.locale('ru');
    const date = moment.parseZone(dateString);
    return {
        date: date.format("D MMM, dd"),
        time: date.format("HH:mm")
    };
};

const parseDuration = durationString => {
    const duration = moment.duration(durationString);
    if (duration.asMinutes() % 60 === 0) {
        return duration.locale('ru').humanize();
    } else {
        return `${duration.asMinutes()} мин`;
    }
};

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
                                    <div className="card" style={styles.card}>
                                        {/*<img src="http://easysport.online/media/courts/18.jpg" alt="" className="card-img-top"/>*/}
                                        <div className="card-body" style={styles.cardBody}>
                                            <p style={styles.sportType}>
                                                🏀 &nbsp;{game.game_type.sport_type.title.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;{game.game_type.title.toUpperCase()}
                                            </p>
                                            <span style={styles.price} className="badge">{game.cost} RUB</span>
                                            <p style={styles.court}>{game.court.title}</p>
                                            <p>
                                                <span style={styles.datetime}>🗓️ {parseDate(game.datetime).date}</span>
                                                <span>🕑 {parseDate(game.datetime).time} ({parseDuration(game.duration)})</span>
                                            </p>
                                            <div className="progress" style={styles.progress}>
                                                <div className="progress-bar"
                                                     style={Object.assign({}, styles.progressBar, {width: '30%'})}>
                                                    4/{game.capacity}
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-block"
                                                    style={styles.button}>ЗАПИСАТЬСЯ
                                            </button>
                                        </div>
                                    </div>
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
    },
    card: {
        marginBottom: 20,
        borderRadius: 15
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
    price: {
        position: 'absolute',
        top: 15,
        right: 20,
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
        height: 40,
        borderRadius: 20,
        backgroundColor: '#5993DC',
        borderWidth: 0
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    games: state.gamesReducer.games
});

export default connect(mapStateToProps, { getGames })(Games);