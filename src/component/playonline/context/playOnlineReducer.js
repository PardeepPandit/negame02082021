import{
  SEARCH_ONLINE,
  SET_LOADING,
  SAVE_WORD,
  SET_INPUT_TEXT,
  GET_WORD,
  GET_WORD_FAIL,
  TURN_CHANGE,
  SET_WORD_DEFINITION,
  SET_RESULT,
  RESET_STATE,
  SET_GAME_TYPE,
  SET_ROUND_COMPLETE,
  SET_POPUP,
  API_HIT,
  SET_ROUND_RESULT,
  SET_SHOW_KEYBOARD,
  STOP_OLD_INSTANCE,
  SET_INTERVAL_ID,
  SET_CURRENT_STATUS
  } from '../../../type'; 
  
  //comment
  export default (state,action)=>{
    const {type,payload}=action
    //console.log("payload=",action)
    switch(type){
    case SEARCH_ONLINE:
        return{
            ...state,
            onlineUser:payload,
            loading:false,
            winner_loser:null,
            reset_state:false
        }
        case SAVE_WORD:
          return{
            ...state,
            save_word:payload,
            loading:false,
            reset_state:false
           // result:null
          }
          case SET_INPUT_TEXT:
            return{
              ...state,
              inputText:payload,
              reset_state:false
              //result:null
            }
            case GET_WORD:
              return{
                ...state,
                get_word:payload,
                loading:false,
                reset_state:false
               // result:null
              }
            case GET_WORD_FAIL:
              return{
                ...state,
                get_word:payload,
                loading:false,
                reset_state:false
              //  result:null
              }
        case SET_LOADING:
            return{
                ...state,
                loading:true,
               // result:null
            }
        case TURN_CHANGE:
            return{
                ...state,
                turn_change:payload,
                loading:false,
                reset_state:false
                //result:null
            }
            case SET_WORD_DEFINITION:
              return{
                ...state,
                word_definition:payload,
                reset_state:false
                //result:null
              }
              case SET_RESULT:
                return{
                  ...state,
                  winner_loser:payload,
                  reset_state:false
                }
                case SET_GAME_TYPE:
                  return{
                    ...state,
                    game_type:payload,
                    reset_state:false
                  }
                  case SET_ROUND_COMPLETE:
                    return{
                      ...state,
                      round_complete:payload,
                      reset_state:false
                    }
                    case SET_POPUP:
                      return{
                        ...state,
                        popdisabled:payload,
                        reset_state:false
                      }
                      case API_HIT:
                        return{
                          ...state,
                          getwordapihit:payload,
                          reset_state:false
                        }
                        case SET_ROUND_RESULT:
                          return{
                            ...state,
                            round_result:[...state.round_result,payload],
                            reset_state:false
                          }
                          case SET_SHOW_KEYBOARD:
                            return{
                              ...state,
                              showKeyboard:payload,
                              reset_state:false
                            }
                            case STOP_OLD_INSTANCE:
                              return{
                                ...state,
                                stop_old_instance:payload,
                                reset_state:false
                              }
                              case SET_INTERVAL_ID:
                                return{
                                  ...state,
                                  interval_id:[...state.interval_id,payload]
                                }
                                case SET_CURRENT_STATUS:
                                  localStorage.setItem('currnet_status',payload)
                                  return{
                                    ...state,
                                    currnet_status:payload
                                  }
                case RESET_STATE:
                  return{
                    ...state,
                    reset_state:payload,
                    loading:false,
                    save_word:null,
                    get_word:null,
                    inputText:'',
                    turn_change:null,
                    word_definition:{word:"",definition:""},
                    winner_loser:null,
                    round_online:state.round_online+1,
                    round_complete:false,
                    interval_id:[]
                    //showKeyboard:false
                  }
              
      default:
      return state;
    }
  }