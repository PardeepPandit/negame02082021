import{
     SET_INPUT_TEXT,
     SET_INPUT_TEXT2,
     SET_ISACTIVE,
     SET_SECONDS,
     SET_GAME_TYPE,
     SET_BACKUP_INPUT_TEXT,
     SET_GAME_LEVEL,
     RESET_COMMONSTATE,
     LOAD_LEVEL
    } from '../../../../type'; 
    
    //comment
    export default (state,action)=>{ 
      const {type,payload}=action
     // console.log("Common Reducer=",type)
      switch(type){
                  case SET_INPUT_TEXT:
                      return{
                          ...state,
                          inputText:payload,
                      }
                  case SET_INPUT_TEXT2:
                      return{
                          ...state,
                          inputText2:payload,
                      }
                      case SET_ISACTIVE:
                        return{
                          ...state,
                          isActive:payload
                        }
                        case SET_SECONDS:
                          return{
                            ...state,
                            seconds:payload
                          }
                          case SET_GAME_TYPE:
                              return{
                                ...state,
                                game_type:payload,
                              }
                            case SET_BACKUP_INPUT_TEXT:
                              return{
                                  ...state,
                                  backup_input_text:payload
                              }
                              case SET_GAME_LEVEL:
                                return{
                                  ...state,
                                  game_level:payload
                                }
                                case LOAD_LEVEL:
                                  return{
                                    ...state,
                                    load_game_level:payload
                                  }
                                case RESET_COMMONSTATE:
                                  return{
                                    ...state,
                                    inputText:null,
                                    inputText2:null,
                                    isActive:false,
                                    load_game_level:null,
                                    seconds:60,
                                    game_type:null,
                                    game_level:null
                                  }
                            
        default:
        return state;
      }
    }