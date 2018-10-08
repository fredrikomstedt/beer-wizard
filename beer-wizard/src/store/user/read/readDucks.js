import api from '../../../api';

// Actions
const loadUser = () => ({
    type: 'UPDATE_USER'
})

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})

// reducer
const defaultState = {
    name: ''
    user: {
        data: {name: 'test'},
        status: 'OK'
    }
}

var reducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                status: 'UPDATING',
            }
        case 'SET_USER':
            return {
                status: 'OK',
                data: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;

// Thunks
export const register = (name, password) => dispatch => {
    dispatch(loadUser())
    const payload = {
        name: name,
        password: password,
    }
    api.get('register_player', payload).then(response => {
        if (api.isOK(response)) {
            dispatch(getUser(response.data));
        }
    })
}

export const login = (name, password) => dispatch => {
    dispatch(loadUser())
    const payload = {
        name: name,
        password: password,
    }
    api.get('login_player', payload).then(response => {
        if (api.isOK(response)) {
            dispatch(getUser(response.data));
        }
    })
}

export const getUser = (name) => dispatch => {
    dispatch(loadUser())
    const payload = {
        name: name
    }
    api.get('get_player', payload).then(response => {
        if (api.isOK(response)) {
            dispatch(setUser(response.data));
        }
    })
}