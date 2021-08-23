/* eslint-disable import/no-anonymous-default-export */
import{
    GET_RANDOM_WORD_SUCCESS,
  GET_RANDOM_WORD_FAIL,
  GET_HINT,
   SET_LOADING,
  SET_START_MATCH_COMPUTER,
  SET_WORD_DEFINITION,
  REMOVE_LOCAL_DATA,
  SET_HINT_COUNT,
  SET_HINT_USED,
  SET_CONCEDE,
  SET_HUMAN_POSITION,
  SET_TURN,
  SET_NEXT_CHAR,
  SET_SHOW_KEYBOARD,
  SET_PLAY,
  WORD_EXIST,
  SET_CURRENT_WINNER_LOSER_HC,
  RESET_STATE_FOR_ROUND_FINSH_HC,
  SET_FINAL_RESULT_HC,
  RESET_HUMAN_STATE,
  SET_MATCH_ROUND_DETAILS,
  SET_MASTER_HISTORY,
  SET_RANDOM_POSITION,
  SET_TEMP_WORD,
  SINGLE_SHIFT_COUNTER,
  SET_WORD_LENGTH
  } from '../../../../type'; 

export default (state,action)=>{ 

    const {type,payload}=action
    console.log("Human Reducer=",type,",",payload)
    switch(type)
    {
        case GET_RANDOM_WORD_SUCCESS:
            return{
                ...state,
                random_word:payload,
                hint:null,
                loading_HC:false
            }
        case GET_RANDOM_WORD_FAIL:
            return{
                ...state,
                random_word:null,
                hint:null,
                loading_HC:false
            }
        case SET_LOADING:
            return{
                ...state,
                loading_HC:true
            }
         case GET_HINT:
            return{
                ...state,
                hint:payload,
                loading_HC:false
            }
        case SET_WORD_DEFINITION:
                        console.log('SET_WORD_DEFINITION')
                        return{
                            ...state,
                            resultWord:payload
                        }
                    case SET_START_MATCH_COMPUTER:
                        localStorage.setItem('start_match_computer',JSON.stringify(payload))
                        return{
                            ...state,
                            start_match_computer:payload,
                            loading_HC:false
                        }
                        case REMOVE_LOCAL_DATA:
                            localStorage.removeItem('start_match_computer')
                            return{
                                ...state,
                                start_match_computer:null,
                                loading_HC:false
                            }
                            case SET_HINT_COUNT:
                                return{
                                    ...state,
                                    hint_count:payload,
                                    loading_HC:false
                                }
                                case SET_HINT_USED:
                                    return{
                                        ...state,
                                        hint_used:payload,
                                        hint:null,
                                        loading_HC:false
                                    }
                                    case SET_CONCEDE:
                                        return{
                                            ...state,
                                            concede:payload
                                        }
                                    case SET_HUMAN_POSITION:
                                        return{
                                            ...state,
                                            human_position:payload,
                                            single_shift_counter:null
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
                                                        play:payload,
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
                                                    final_result_HC:payload,
                                                    loading_HC:false
                                                }
                                                case SET_MATCH_ROUND_DETAILS:
                                                    return{
                                                        ...state,
                                                        match_round_details:payload
                                                    }
                                                case SET_MASTER_HISTORY:
                                                    return{
                                                        ...state,
                                                        master_history_HC:[...state.master_history_HC,payload]
                                                    }
                                                    case SET_RANDOM_POSITION:
                                                        return{
                                                            ...state,
                                                            computer_position:payload
                                                        }
                                                        case SET_TEMP_WORD:
                                                            return{
                                                                ...state,
                                                                temp_word:payload
                                                            }
                                        case SINGLE_SHIFT_COUNTER:
                                             return{
                                                    ...state,
                                                    single_shift_counter:payload,
                                                    human_position:null
                                                }
                                                case SET_WORD_LENGTH:
                                                    return{
                                                        ...state,
                                                        word_length:payload
                                                    }
                                            case RESET_STATE_FOR_ROUND_FINSH_HC:
                                                return{
                                                    ...state,
                                                    loading_HC:false,
                                                    random_word:null,
                                                    human_position:null,
                                                    turn:'human',
                                                    resultWord:{word:'',definition:''},
                                                    next_char:null,
                                                    word_exist:false,
                                                    current_winner_loser_HC:null,
                                                    show_keyboard:true,
                                                    concede:false,
                                                    play:true,
                                                    round:state.round+1,
                                                    temp_word:null,
                                                    computer_position:null
                                                }
                                                case RESET_HUMAN_STATE:
                                                    return{
                                                        ...state,
                                                        loading_HC:false,
                                                        random_word:null,
                                                        hint:null,
                                                        resultWord:{word:'',definition:''},
                                                        hint_used:false,
                                                        concede:false,
                                                        position:null,
                                                        start_match_computer:null,
                                                        word_length:null,
                                                        turn:'human',
                                                        next_char:null,
                                                        temp_word:null,
                                                        show_keyboard:true,
                                                        round:1,
                                                        play:true,
                                                        word_exist:false,
                                                        current_winner_loser_HC:null,
                                                        winner_counter:0,
                                                        loser_counter:0,
                                                        result_history:[],
                                                        final_result_HC:null,
                                                        match_round_details:null,
                                                        master_history_HC:[]
                                                        }
      default:
      return state;
    }
  }