import { GET_GAMES } from '../actions/types.js';

const initialState = {
    games: []
};


// Reducer занимается непосредственным изменением структуры данных в state
// изменения вызываются при помощи объекта, содержащего action
// action - объект {type: 'TYPE', payload: {}}
// payload содержит в себе данные, которые внесутся или повлияют на state
// эти данные могут быть получены по сети, от пользовательского ввода - от чего угодно

export default function games(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
            };
        default:
            return state;
    }
};