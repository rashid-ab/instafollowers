const initialState = {
    coins:0,
    requests:[],
    url :'https://my-castings.com/staging/api/',
    profile:'',
    likes:'',
    review:'',
}
export default rootreducer = (state=initialState,action)=>{
    switch(action.type){
        case 'GETCOINS' :
            return {
                ...state,
                coins:action.payload
            }
        case 'GETREQUESTS' :
            return {
                ...state,
                requests:action.payload
            }
        case 'URL' :
            return {
                ...state,
                requests:action.payload
            }
        case 'PROFILE' :
            return {
                ...state,
                profile:action.payload
            }
        case 'LIKES' :
            return {
                ...state,
                likes:action.payload
            }
        case 'REVIEW' :
            return {
                ...state,
                review:action.payload
            }
        default : return state

    }
}