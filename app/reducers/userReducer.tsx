export default function userReducer(state = "", action) {
    switch (action.type){
        case 'SET_NAME':
            return {...state, name: action.name};
        case 'REMOVE_NAME':
            return {...state, name: ''};
        default:
            return state;
    }
}