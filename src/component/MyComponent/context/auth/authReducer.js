import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOAD_OTHER_USER_SUCCESS,
    LOAD_OTHER_USER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    PLAY,
    SET_LOADING
  } from '../../../../type'; 
  
  //comment
  export default (state,action)=>{
    const {type,payload}=action
    console.log("Type=",type,",user=",payload)
    switch(type){
      case REGISTER_SUCCESS:
          console.log("Register success",action.payload.data.id)
        localStorage.setItem('id',action.payload.data.id)
      return{
        ...state,
        ...action.payload,
        isAuthenticated:(payload.data.register_type==='facebook' || payload.data.register_type==='google') ? true : null,
        loading:false
      }
      case REGISTER_FAIL:
      localStorage.removeItem('id');
      return{
        ...state,
        token:null,
        isAuthenticated:null,
        user:null,
        error:action.payload.message,
        loading:false
      }
      case LOGIN_SUCCESS:
        localStorage.setItem('id',payload.data.id)
          return{
              ...state,
              login_data:payload.data,
              isAuthenticated:true,
              loading:false           
          }
      case LOGIN_FAIL:
          return{
              ...state,
              login_data:null,
              error:action.payload.error_message,
            loading:false           
          }
          case CLEAR_ERRORS:
            return{
              ...state,
            error:null
            }
            case USER_LOADED_SUCCESS:
            return{
              ...state,
              user:payload,
              loading:false
            }
            case LOAD_OTHER_USER_SUCCESS:
            return{
              ...state,
              otherUser:payload,
              loading:false
            }
            case USER_LOADED_FAIL:
            return{
              ...state,
              user:null,
              loading:false
            }
            case LOAD_OTHER_USER_FAIL:
            return{
              ...state,
              otherUser:null,
              loading:false
            }
            case LOGOUT:
              localStorage.removeItem('id');
              localStorage.removeItem('login_data')
              localStorage.removeItem('start_match_computer')
              return{
                ...state,
                isAuthenticated:false,
                user:null,
                loading:false,
                error:null
              }
              case SET_LOADING:
                return{
                  ...state,
                  loading:true
                }
      default:
      return state;
    }
  }