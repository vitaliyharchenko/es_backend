import axios from 'axios';

import { GET_GAMES } from "./types";

export const getGames = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/games/')
        .then((res) => {
            dispatch({
                type: GET_GAMES,
                payload: res.data.results
            })
        }).catch(err => console.log(err));
};