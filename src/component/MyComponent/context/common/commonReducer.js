import{
     SET_INPUT_TEXT,
     SET_ISACTIVE,
     SET_SECONDS,
     SET_GAME_STATUS
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
                            else{
                              return{
                                ...state,
                                human_vs_frined:true
                              }
                            }
                            
        default:
        return state;
      }
    }