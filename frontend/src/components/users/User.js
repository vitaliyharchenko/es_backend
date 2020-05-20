import React from 'react';
import {connect} from 'react-redux';

import {parseAge, parseHours} from './beautyfiers';
import {getUsers} from "../../actions/users";


export const User = ({user, getUsers}) => {
    if (user) {
        return (
            <div style={{paddingTop: 20}}>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <img className="img-fluid img-thumbnail" alt="Avatar"
                             src="http://easysport.online/media/avatars/avatar14_ncybuFa"/>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <p>{user.get_full_name}</p>
                                <p>{parseAge(user.bdate)}, {user.city.title}</p>
                                <small className="text-muted">В сети {parseHours(user.last_login)}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        getUsers();
        return <p>No user</p>
    }
};


const getUserById = (users, userId) => {
    const usersFiltered = users.filter(obj => {
        return obj.id === userId
    });
    return usersFiltered[0];
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = (state, ownProps) => {
    const userId = parseInt(ownProps.match.params.userId, 10);
    return {
        user: getUserById(state.usersReducer.users, userId)
    }
};

export default connect(mapStateToProps, {getUsers})(User);