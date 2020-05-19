import server from "../api/server";

import { GET_USERS } from "./types";

export const getUsers = () => (dispatch) => {
    server.get('/api/users/')
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data.results
            })
        }).catch(err => console.log(err));
};