import {PLAY,
    COUNTRY_LIST,
    STATE_LIST,
    CITY_LIST,
    SET_LOADING,
    PLAN_DETAILS,
    POPUP} from '../../../../type'

export default (state,action)=>{


    const {type,payload}=action

    switch(type){
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }
        case PLAY:
            return{
              ...state,
              playing:payload,
              loading:false
            }
            case COUNTRY_LIST:
                return{
                    ...state,
                    countryList:payload,
                    loading:false
                }
            case STATE_LIST:
                return{
                    ...state,
                    stateList:payload,
                    loading:false
                }
            case CITY_LIST:
                return{
                    ...state,
                    cityList:payload,
                    loading:false
                }
                case PLAN_DETAILS:
                    return{
                        ...state,
                        planDetails:payload,
                        loading:false
                    }
                    case POPUP:
                        return{
                            ...state,
                            showPopup:!state.showPopup
                        }
                default:
                    return state
    }
}