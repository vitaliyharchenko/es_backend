import server from "../api/server";

import { GET_GAMES } from "./types";

export const getGames = () => (dispatch) => {
    server.get('/api/games/')
        .then((res) => {
            dispatch({
                type: GET_GAMES,
                payload: res.data.results
            })
        }).catch(err => console.log(err));
};