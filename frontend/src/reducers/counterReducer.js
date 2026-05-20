const initialState = {
    count:0
}

const ACTIONS={
    INCREMENT:"INCREMENT",
    DECREMENT:"DECREMENT"
}

export const incrementActionCreator=(payload)=>{
    return {type:ACTIONS.INCREMENT,payload}
}
export const decrementActionCreator=(payload)=>{
    return {type:ACTIONS.DECREMENT,payload}
}

export const counterReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return {...state,count:state.count+action.payload}
            
        case ACTIONS.DECREMENT:
            return {...state,count:state.count-action.payload}
            
    
        default:
            return state;
    }
}