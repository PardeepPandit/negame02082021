import{
     SET_INPUT_TEXT,
     SET_ISACTIVE,
     SET_SECONDS
    } from '../../../../type'; 
    
    //comment
    export default (state,action)=>{ 
      const {type,payload}=action
      //console.log("Common Reducer=",type)
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
        default:
        return state;
      }
    }