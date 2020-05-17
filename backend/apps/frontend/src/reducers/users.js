import { GET_USERS } from '../actions/types.js';

const initialState = {
    users: []
};


// Reducer занимается непосредственным изменением структуры данных в state
// изменения вызываются при помощи объекта, содержащего action
// action - объект {type: 'TYPE', payload: {}}
// payload содержит в себе данные, которые внесутся или повлияют на state
// эти данные могут быть получены по сети, от пользовательского ввода - от чего угодно

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
};