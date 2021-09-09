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
  RESET_STATE_R,
  SET_GAME_TYPE,
  SET_ROUND_COMPLETE,
  SET_POPUP,
  API_HIT,
  SET_ROUND_RESULT,
  SET_SHOW_KEYBOARD,
  STOP_OLD_INSTANCE,
  SET_INTERVAL_ID,
  SET_CURRENT_STATUS,
  CLEAR_INTERVAL,
  NEXT_ROUND_BUTTON,
  SHOW_NEXT_ROUND_BUTTON,
  USER_OPPONENT_AGREE,
  FINAL_RESULT_COUNTER,
  SET_FINAL_RESULT_DATA,
  MATCH_FINISH,
  START_GAME,
  NEXT_ROUND,
  RESET_STATE_FOR_ROUND,
  RESET_STATE_FOR_MATCH,
  SET_HINT_USED,
  SET_HINT_COUNT,
  GET_HINT
  } from '../../../type'; 
  
  //comment
  export default (state,action)=>{
    const {type,payload}=action
    //console.log("payload=",action)
    switch(type){
    case SEARCH_ONLINE:
      if(payload===null){
        localStorage.removeItem('start_match_online')
        return{
          ...state,
            onlineUser:payload,
            loading:false,
            winner_loser:null,
            reset_state:false
        }
      }
      else{
        return{
            ...state,
            onlineUser:payload,
            loading:false,
            winner_loser:null,
            reset_state:false
        }
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
                        challenge_popup_on:payload,
                        reset_state:false
                      }
                      case API_HIT:
                        return{
                          ...state,
                          getwordapihit:payload,
                          reset_state:false
                        }
                        case SET_HINT_USED:
                          return{
                              ...state,
                              hint_used:payload,
                              hint:null
                          }
                          case GET_HINT:
                            return{
                                ...state,
                                hint:payload,
                                loading_HC:false
                            }
                          case SET_HINT_COUNT:
                                return{
                                    ...state,
                                    hint_count:payload,
                                    loading_HC:false
                                }
                        case SET_ROUND_RESULT:
                          return{
                            ...state,
                            round_result:payload ===null ? [] : [...state.round_result,payload],
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
                              case NEXT_ROUND:
                              return{
                                ...state,
                                online_round_counter:state.online_round_counter+1
                              }
                              case SET_INTERVAL_ID:
                                return{
                                  ...state,
                                  interval_id:[...state.interval_id,payload]
                                }
                              case CLEAR_INTERVAL:
                                state.interval_id.forEach(clearInterval)
                                return{
                                  ...state,
                                  interval_id:[]
                                }
                                case SET_CURRENT_STATUS:
                                  localStorage.setItem('currnet_status',payload)
                                  return{
                                    ...state,
                                    currnet_status:payload
                                  }
                                  case NEXT_ROUND_BUTTON:
                                    if(payload==='user')
                                    {
                                      localStorage.setItem('user_click_NRB',true)
                                      return{
                                        ...state,
                                        user_click_next_round_button:payload==='user' ?  true : false,
                                      }
                                  }
                                  else if(payload==='opponent'){
                                    localStorage.setItem('opponent_click_NRB',true)
                                    return{
                                      ...state,
                                      opponent_click_next_round_button:payload==='opponent' ? true : false
                                    }
                                  }
                                  case SHOW_NEXT_ROUND_BUTTON:
                                    return{
                                      ...state,
                                      showNextRoundButton:payload
                                    }
                                    case USER_OPPONENT_AGREE:
                                      return{
                                        ...state,
                                        user_opponent_agree:payload
                                      }
                                      case FINAL_RESULT_COUNTER:
                                       if(payload==='winner'){
                                       return{
                                         ...state,
                                        final_result_winner_counter:state.final_result_winner_counter+1
                                       }
                                       }
                                       else if(payload==='loser'){
                                       return{
                                         ...state,
                                        final_result_loser_counter:state.final_result_loser_counter+1
                                       }
                                       }
                                       else{
                                         return{
                                           ...state,
                                           final_result_winner_counter:0,
                                           final_result_loser_counter:0
                                         }
                                       }
                                       case SET_FINAL_RESULT_DATA:
                                         localStorage.setItem('final_result_data',JSON.stringify(payload))
                                         return{
                                           ...state,
                                           final_result_data:payload
                                         }
                                         case MATCH_FINISH:
                                           return{
                                             ...state,
                                             online_match_finish:payload
                                           }
                                           case START_GAME:
                                             return{
                                               ...state,
                                               start_game:payload
                                             }

                case RESET_STATE_FOR_ROUND:
                  localStorage.setItem('user_click_NRB',false)
                  localStorage.setItem('opponent_click_NRB',false)
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
                    round_complete:false,
                    next_round_button_click:null,
                    opponent_click_next_round_button:false,
                    user_click_next_round_button:false,
                    showNextRoundButton:false
                    //interval_id:[]
                    //showKeyboard:false
                  }
                  case RESET_STATE_FOR_MATCH:
                    localStorage.removeItem('start_match_online')
                    localStorage.removeItem('user_click_NRB')
                    localStorage.removeItem('opponet_click_NRB')
                    localStorage.removeItem('current_status')
                    localStorage.removeItem('final_result_data')
                    localStorage.removeItem('match_finish')
                    return{
                      ...state,
                      onlineUser:null,
                      save_word:null,
                      get_word:null,
                      loading:false,
                      turn_change:null,
                      word_definition:{word:"",definition:""},
                      winner_loser:null,
                      online_round_counter:1,
                      info:[],
                      game_type:null,
                      send_match_round:null,
                      round_complete:false,
                      challenge_popup_on:false,
                      getwordapihit:60,
                      round_result:[],
                      showKeyboard:false,
                      stop_old_instance:false,
                      reset_state:false,
                      interval_id:[],
                      user_click_next_round_button:null,
                      opponent_click_next_round_button:null,
                      current_status:null,
                      showNextRoundButton:false,
                      user_opponent_agree:false,
                      final_result_winner_counter:0,
                      final_result_loser_counter:0,
                      final_result_data:null,
                      online_match_finish:false,
                      start_game:false
                    }
              
      default:
      return state;
    }
  }