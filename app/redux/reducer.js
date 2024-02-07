// app\redux\reducer.js
import * as actionTypes from "./actionTypes";

// initial state
const initState = {
    isAuth: false,
    token: null,
    user_email: null,
    name_of_user: null,
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user_email: action.payload.email,
                name_of_user: action.payload.name,
            };

        default:
            return state;
    }
};
