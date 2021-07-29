import {SET_LOADING,
    LOAD_LEADERBOARD_RANK_SUCCESS,
    LOAD_LEADERBOARD_RANK_FAIL,
    LOAD_HINTS_SUCCESS,
    LOAD_HINTS_FAIL,
    LOAD_TOP_COUNTRY_SUCCESS,
    LOAD_TOP_COUNTRY_FAIL,
    AGE_30_0_SUCCESS,
  AGE_0_15_SUCCESS,
AGE_15_30_SUCCESS} from '../../../../type'


export default (state,action)=>{

    const {type,payload}=action

    switch(type){
            case LOAD_LEADERBOARD_RANK_SUCCESS:
                return{
                    ...state,
                    rankList:payload,
                    loading:false,
                    error:null
                }
            case LOAD_LEADERBOARD_RANK_FAIL:
                return{
                    ...state,
                    rankList:null,
                    loading:false,
                    error:payload
                }
                case LOAD_HINTS_SUCCESS:
                    return{
                        ...state,
                        hints:payload,
                        loading:false,
                        error:null
                    }
                case LOAD_HINTS_FAIL:
                    return{
                        ...state,
                        hints:null,
                        loading:false,
                        error:payload
                    }
                    case LOAD_TOP_COUNTRY_SUCCESS:
                        return{
                            ...state,
                            top_country:payload,
                            loading:false,
                            error:null
                        }
                        case AGE_30_0_SUCCESS:
                            return{
                                ...state,
                                user_by_age30:payload,
                                loading:false,
                                error:null
                            }
                        case AGE_15_30_SUCCESS:
                            return{
                                ...state,
                                user_by_age15:payload,
                                loading:false,
                                error:null
                            }
                        case AGE_0_15_SUCCESS:
                            return{
                                ...state,
                                user_by_age0:payload,
                                loading:false,
                                error:null
                            }
                case SET_LOADING:
                    return{
                        ...state,
                        loading:true
                    }
        default:
        return state
    }

}