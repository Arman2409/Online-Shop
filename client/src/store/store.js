import {createStore} from 'redux';

const store = createStore(function(state,action){
    if(action.type === "setSmartphones"){
        state.smartphones = action.payload
        return{
            ...state
        }
    }

    if(action.type === "authencticate"){
        state.authenticated = true
        return{
            ...state
        }
    }

    if(action.type == "signOut") {
        state.authenticated = false;
        return{
            ...state
        }
    }

    return state;
},{
    smartphones:{},
    authenticated:false,
})

export default store