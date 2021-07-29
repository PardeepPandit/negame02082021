import{
  GET_WORDLIST_SUCCESS,
  GET_WORDLIST_FAIL,
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
  SET_POSITION
  } from '../../../../type'; 
  
  //comment
  export default (state,action)=>{ 
    const {type,payload}=action
    console.log("Human Reducer=",type)
    switch(type){
        case GET_WORDLIST_SUCCESS:
            return{
                ...state,
                wordList:payload,
                hint:null,
                loading:false
            }
            case GET_WORDLIST_FAIL:
                return{
                    ...state,
                    wordList:[],
                    inputText:'',
                    hint:null,
                    loading:false
                }
                case SET_HINT_WORDLIST_SUCCESS:
                    return{
                        ...state,
                        hint_wordlist:payload,
                        loading:false
                    }
                    case SET_HINT_WORDLIST_FAIL:
                        return{
                            ...state,
                            hint_wordlist:[],
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
      default:
      return state;
    }
  }