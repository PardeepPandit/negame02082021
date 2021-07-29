import React,{useState,useEffect,useContext,useRef} from 'react'
import {useMainConsumer} from '../MyComponent/MainContext'
import AuthContext from './context/auth/authContext'
import MasterContext from './context/master/masterContext'

const CustomHook=React.createContext();
const CustomHookUpdate=React.createContext();


export function useBackgroundMusicConsumer(){
    return useContext(CustomHook)
}
export function useBackgroundMusicUpdate(){
    return useContext(CustomHookUpdate)
}

export const CustomHookProvider=React.memo(({children})=>{
    
  
    const {initialState}=useMainConsumer()
    const {audio}=initialState
    const [keyAudio,setKeyAudio]=useState(()=>false)


    const authContext=useContext(AuthContext)
    const {user,isAuthenticated}=authContext
    const masterContext=useContext(MasterContext)
    const {playing,setPlaying}=masterContext
    //console.log("New chack=",user,",and =",isAuthenticated,",playing",playing)
   

   
    const onClick=()=>{
        setKeyAudio(!keyAudio)
    }

    


     const useAudio = () => {
         console.log("loading customehook")

        
        //console.log("AUDIO=",new Audio(url))

       /*  const [playing, setPlaying] = useState(()=>{
            console.log("Re creating useState")
             return JSON.parse(localStorage.getItem('playing'))});  */
            

        const toggle = () => {
            
            setPlaying(!playing)
            console.log("Toggle chaing =",playing)
        }

          useEffect(()=>{
                        console.log("calling toggle on logout",isAuthenticated)
                        if(!isAuthenticated){
                            console.log('Tggl called')
                            toggle()
                        }
                 },[isAuthenticated])


        /* const toggle = () => setPlaying(!playing); */
      
        useEffect(() => {
           
            //console.log("setting localstorage",playing)
            localStorage.setItem('playing',playing)
             const newPlay=localStorage.getItem('playing')
             console.log("fetching playing=",playing,",",JSON.parse(newPlay))
             //JSON.parse(JSON.parse(localStorage.getItem('playing'))) ? audio.play() : audio.pause(); 
              JSON.parse(newPlay) ? audio.play() : audio.pause(); 
         
          },[playing]);
      
         useEffect(() => {

          audio.addEventListener('ended',function () {
              this.currentTime = 0;
              this.play();
            }, false);
        
           return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
          }; 
        }, []); 
        return [playing, toggle];
    }
    
  
    

    return (
        <CustomHook.Provider value={{keyAudio}}>
            <CustomHookUpdate.Provider value={{useAudio,onClick}}>
               {children} 
            </CustomHookUpdate.Provider>
        </CustomHook.Provider>
    )

})