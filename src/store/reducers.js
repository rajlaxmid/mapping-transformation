import {THE_USER} from './actions';
import { GET_TOKEN} from './actions';
import { combineReducers } from 'redux';

const setUserReducer = (state={user:{}}, action) => {
    switch(action.type){
        case THE_USER: 
            return { user: action.user}
        default: 
            return state;
    }
}
const postTokenReducer = (state={}, action) => {
    switch(action.type){
        
        case GET_TOKEN: 
            return {  userId: action.userId}
        default: 
            return state;
    }
}

const allReducers = combineReducers({
    user:setUserReducer,
    postTokenReducer

    
});

export default allReducers;