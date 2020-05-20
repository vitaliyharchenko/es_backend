import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from "../../actions/users";
import {Link} from "react-router-dom";
import { parseAge, parseHours } from './beautyfiers';


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
                <div className="row row-cols-3 row-cols-md-5">
                    {this.props.users.map(user => (
                        <div className="col mb-4" key={user.id}>
                            <Link to={`/users/${user.id}`} className="card" style={styles.card}>
                                <img src="http://easysport.online/media/avatars/IMG_1584.JPG" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{ user.get_full_name }</h5>
                                    <p className="card-text" style={styles.cardText}>
                                        { parseAge(user.bdate) }, { user.city.title }
                                    </p>
                                    <p className="card-text"><small className="text-muted">В сети { parseHours(user.last_login) }</small></p>
                                </div>
                            </Link>
                        </div>
                    ))}
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
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit"
    },
    cardText: {
        marginBottom: 0
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = (state) => ({
    users: state.usersReducer.users
});

export default connect(mapStateToProps, { getUsers })(Users);