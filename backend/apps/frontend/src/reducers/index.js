import { combineReducers } from "redux";
import games from './games';
import courts from './courts';

export default combineReducers({
    gamesReducer: games,
    courtsReducer: courts,
});