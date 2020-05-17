import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from "../../actions/users";
import moment from "moment";


const parseAge = dateString => {
    moment.locale('ru');
    const date = moment.parseZone(dateString);
    const formatDate = date.format("YYYYMMDD");
    return moment().diff(moment(formatDate, 'YYYYMMDD'), 'years');
};

const parseHours = dateString => {
    moment.locale('ru');
    const date = moment.parseZone(dateString);
    console.log(moment(date).fromNow());
    return moment(date).fromNow();
};

export class Users extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getUsers();
    };

    render() {
        return (
            <div style={{ paddingTop: 20 }}>
                <h1 style={styles.header}>Игроки</h1>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="card-columns" style={{ columnCount: 5 }}>
                            {this.props.users.map(user => (
                                <div className="card" key={user.id} style={styles.card}>
                                    <img src="http://easysport.online/media/avatars/IMG_1584.JPG" className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{ user.get_full_name }</h5>
                                        <p className="card-text" style={styles.cardText}>
                                            { parseAge(user.bdate) }, { user.city.title }
                                        </p>
                                        <p className="card-text"><small className="text-muted">В сети { parseHours(user.last_login) }</small></p>
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
        borderRadius: 15,
        overflow: "hidden"
    },
    cardText: {
        marginBottom: 0
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    users: state.usersReducer.users
});

export default connect(mapStateToProps, { getUsers })(Users);