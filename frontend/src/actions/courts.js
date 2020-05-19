import server from "../api/server";

import { GET_COURTS } from "./types";

export const getCourts = () => (dispatch) => {
    server.get('/api/courts/')
        .then((res) => {
            dispatch({
                type: GET_COURTS,
                payload: res.data.results
            })
        }).catch(err => console.log(err));
};