import { combineReducers } from "redux";
import games from './games';
import courts from './courts';
import users from './users';

export default combineReducers({
    gamesReducer: games,
    courtsReducer: courts,
    usersReducer: users
});