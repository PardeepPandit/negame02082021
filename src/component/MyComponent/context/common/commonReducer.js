import{
     SET_INPUT_TEXT,
     SET_INPUT_TEXT2,
     SET_ISACTIVE,
     SET_SECONDS,
     SET_GAME_STATUS,
     SET_BACKUP_INPUT_TEXT,
     SET_GAME_LEVEL,
     RESET_COMMONSTATE
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
                          case SET_GAME_STATUS:
                            if(payload==='human_vs_computer'){
                              return{
                                ...state,
                                human_vs_computer:true,
                              }
                            }
                            else if(payload==='human_vs_online'){
                              return{
                                ...state,
                                human_vs_online:true,
                              }
                            }
                            else if(payload==='human_vs_frined'){
                              return{
                                ...state,
                                human_vs_frined:true
                              }
                            }
                            else{
                              return{
                                ...state,
                                human_vs_frined:false,
                                human_vs_computer:false,
                                human_vs_online:false
                              }
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
                                case RESET_COMMONSTATE:
                                  return{
                                    inputText:null,
                                    inputText2:null,
                                    isActive:false,
                                    seconds:60,
                                    human_vs_computer:false,
                                    human_vs_frined:false,
                                    human_vs_online:false,
                                    game_level:null
                                  }
                            
        default:
        return state;
      }
    }