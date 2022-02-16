import { types } from "../types/types";


export const authReducer = ( state = {}, action ) => {

    switch (action.type) {
        case types.login:
            return{
                //Información que recibe
                uid: action.payload.uid,
                name: action.payload.displayName
            }
            break;
        case types.logout:
            return{

            }
        default:
            return state
            break;
    }

}