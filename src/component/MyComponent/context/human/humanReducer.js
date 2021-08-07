import{
    GET_RANDOM_WORD_SUCCESS,
  GET_RANDOM_WORD_FAIL,
  GET_HINT,
   SET_LOADING,
   SET_INPUT_TEXT,
  SET_START_MATCH_COMPUTER,
  SET_WORD_DEFINITION,
  REMOVE_LOCAL_DATA,
  SET_HINT_COUNT,
  SET_HINT_USED,
  SET_HINT_WORDLIST_SUCCESS,
  SET_HINT_WORDLIST_FAIL,
  SET_CONCEDE,
  SET_TIMEOUT,
  SET_LEVEL_TYPE,
  SET_POSITION,
  SET_TURN,
  SET_NEXT_CHAR,
  SET_SHOW_KEYBOARD,
  SET_PLAY,
  WORD_EXIST,
  SET_CURRENT_WINNER_LOSER_HC,
  SET_WINNER_LOSER_COUNTER,
  RESET_STATE_HC,
  RESET_STATE,
  SET_FINAL_RESULT_HC,
  SET_FINAL_RESULT_DATA
  } from '../../../../type'; 
  
  //comment
  export default (state,action)=>{ 
    const {type,payload}=action
    console.log("Human Reducer=",type)
    switch(type){
        case GET_RANDOM_WORD_SUCCESS:
            return{
                ...state,
                random_word:payload,
                hint:null,
                loading:false
            }
            case GET_RANDOM_WORD_FAIL:
                return{
                    ...state,
                    random_word:null,
                    hint:null,
                    loading:false
                }
            case SET_LOADING:
                return{
                    ...state,
                    loading:true
                }
                case GET_HINT:
                    return{
                        ...state,
                        hint:payload
                    }
                    case SET_WORD_DEFINITION:
                        console.log('SET_WORD_DEFINITION')
                        return{
                            ...state,
                            resultWord:payload,
                            loading:false
                        }
                        case SET_START_MATCH_COMPUTER:
                            localStorage.setItem('start_match_computer',JSON.stringify(payload))
                            return{
                                ...state,
                                start_match_computer:payload,
                                loading:false
                            }
                            case REMOVE_LOCAL_DATA:
                                localStorage.removeItem('start_match_computer')
                                return{
                                    ...state,
                                    start_match_computer:null,
                                    loading:false
                                }
                                case SET_HINT_COUNT:
                                    return{
                                        ...state,
                                        hint_count:payload,
                                        loading:false
                                    }
                                    case SET_HINT_USED:
                                        return{
                                            ...state,
                                            hint_used:payload,
                                            hint:null
                                        }
                                        case SET_CONCEDE:
                                            return{
                                                ...state,
                                                concede:payload
                                            }
                                            case SET_TIMEOUT:
                                                return{
                                                    ...state,
                                                    timeout:payload
                                                }
                                                case SET_LEVEL_TYPE:
                                                    return{
                                                        ...state,
                                                        level_type:payload
                                                    }
                                                    case SET_POSITION:
                                                        return{
                                                            ...state,
                                                            position:payload
                                                        }
                                                        case SET_TURN:
                                                            return{
                                                                ...state,
                                                                turn:payload,
                                                                word_exist:false
                                                            }
                                                            case SET_NEXT_CHAR:
                                                                return{
                                                                    ...state,
                                                                    next_char:payload
                                                                }
                                                                case SET_SHOW_KEYBOARD:
                                                                    return{
                                                                        ...state,
                                                                        show_keyboard:payload,
                                                                        next_char:null
                                                                    }
                                                                    case SET_PLAY:
                                                                        return{
                                                                            ...state,
                                                                            play:payload
                                                                        }
                                                                        case WORD_EXIST:
                                                                            return{
                                                                                ...state,
                                                                                word_exist:payload
                                                                            }
                                                                            case SET_CURRENT_WINNER_LOSER_HC:
                                                                                if(payload==='loser'){
                                                                                        return{
                                                                                            ...state,
                                                                                            current_winner_loser_HC:payload,
                                                                                            loser_counter:state.loser_counter+1,
                                                                                            result_history:[...state.result_history,payload]
                                                                                        } 
                                                                                    }
                                                                                    else if(payload==='winner'){
                                                                                        return{
                                                                                            ...state,
                                                                                            current_winner_loser_HC:payload,
                                                                                            winner_counter:state.winner_counter+1,
                                                                                            result_history:[...state.result_history,payload]
                                                                                        } 
                                                                                    }
                                                                                    else{
                                                                                        return{
                                                                                            ...state,
                                                                                            current_winner_loser_HC:payload
                                                                                        }
                                                                                    }
                                                                                    case SET_FINAL_RESULT_HC:
                                                                                        return{
                                                                                            ...state,
                                                                                            final_result_HC:payload
                                                                                        }
                                                                                    case RESET_STATE_HC:
                                                                                        return{
                                                                                            ...state,
                                                                                            random_word:null,
                                                                                            resultWord:{word:'',definition:''},
                                                                                            next_char:null,
                                                                                            word_exist:false,
                                                                                            current_winner_loser_HC:null,
                                                                                            show_keyboard:true,
                                                                                            play:true,
                                                                                            round:state.round+1
                                                                                        }

      default:
      return state;
    }
  }